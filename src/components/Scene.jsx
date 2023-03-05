import React, { useEffect, useState, useRef, forwardRef, useMemo } from "react";
import { Shadow, Brick } from ".";
import { Vector3 } from "three";
import { uID, getMeasurementsFromDimensions, base } from "../utils";
import { useControls } from "leva";

const BrickCursor = forwardRef(
  (
    {
      intersect = {
        point: new Vector3(),
        face: { normal: { x: 0, y: 0, z: 1 } },
      },
      dimensions = { x: 1, z: 1 },
      rotation = 0,
      translation = 0,
    },
    ref
  ) => {
    const { height, width, depth } = getMeasurementsFromDimensions(dimensions);

    const position = useMemo(() => {
      const evenWidth =
        rotation === 0 ? dimensions.x % 2 === 0 : dimensions.z % 2 === 0;
      const evenDepth =
        rotation === 0 ? dimensions.z % 2 === 0 : dimensions.x % 2 === 0;

      return new Vector3()
        .copy(intersect.point)
        .add(intersect.face.normal)
        .divide(new Vector3(base, height, base))
        .floor()
        .multiply(new Vector3(base, height, base))
        .add(
          new Vector3(
            evenWidth ? base : base / 2,
            height / 2,
            evenDepth ? base : base / 2
          )
        );
    }, [intersect, dimensions.x, dimensions.z, height, rotation]);

    return (
      <>
        <mesh
          ref={ref}
          position={[position.x, Math.abs(position.y), position.z]}
          rotation={[0, rotation, 0]}
          castShadow={true}
          receiveShadow={true}
        >
          <boxGeometry args={[width, height, depth]} />
          <meshBasicMaterial color={"black"} transparent={true} opacity={0.3} />
        </mesh>
      </>
    );
  }
);

let t;

export const Scene = () => {
  const [bricks, setBricks] = useState([]);

  const bricksBoundBox = useRef([]);

  const brickCursorRef = useRef();

  const { width, length, rotate } = useControls({
    width: {
      value: 1,
      min: 1,
      max: 5,
      step: 1,
    },
    length: {
      value: 1,
      min: 1,
      max: 5,
      step: 1,
    },
    rotate: false,
  });

  const addBrick = (e) => {
    e.stopPropagation();

    if (!isDrag.current) {
      const brickData = {
        intersect: { point: e.point, face: e.face },
        uID: uID(),
        dimensions: { x: width, z: length },
        rotation: rotate ? Math.PI / 2 : 0,
      };

      setBricks((prevState) => [...prevState, brickData]);
    } else {
      isDrag.current = false;
    }
  };

  const mouseMove = (e) => {
    e.stopPropagation();
    if (!brickCursorRef.current) return;

    const { height } = getMeasurementsFromDimensions({
      x: width,
      z: length,
    });

    const evenWidth = rotate === 0 ? width % 2 === 0 : length % 2 === 0;
    const evenDepth = rotate === 0 ? length % 2 === 0 : width % 2 === 0;

    console.log(e.face.normal, e.point);

    brickCursorRef.current.position
      .copy(new Vector3(e.point.x, Math.abs(e.point.y), e.point.z))
      .add(
        new Vector3(
          e.face.normal.x,
          e.face.normal.y === -0 ? 0 : e.face.normal.y,
          e.face.normal.z
        )
      )
      .divide(new Vector3(base, height, base))
      .floor()
      .multiply(new Vector3(base, height, base))
      .add(
        new Vector3(
          evenWidth ? base : base / 2,
          height / 2,
          evenDepth ? base : base / 2
        )
      );
  };

  const isDrag = useRef(false);

  useEffect(() => {
    const down = () => {
      t && clearTimeout(t);
      t = setTimeout(() => {
        isDrag.current = true;
      }, 100);
    };

    const up = () => {
      t && clearTimeout(t);
    };

    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      {bricks.map((b, i) => {
        return (
          <Brick
            key={b.uID}
            dimensions={b.dimensions}
            intersect={b.intersect}
            addBrick={addBrick}
            rotation={b.rotation}
            bricksBoundBox={bricksBoundBox}
            uID={b.uID}
            mouseMove={mouseMove}
          />
        );
      })}
      <Shadow />
      <spotLight
        position={[-1000, 1500, -500]}
        intensity={0.9}
        castShadow={true}
        shadowBias={-0.0000022}
        penumbra={0.5}
        decay={2}
        shadowMapHeight={4096}
        shadowMapWidth={4096}
        // shadow={
        //   new THREE.LightShadow(
        //     new THREE.OrthographicCamera(
        //       window.innerWidth / -2,
        //       window.innerWidth / 2,
        //       window.innerHeight / 2,
        //       window.innerHeight / -2,
        //       1,
        //       10000
        //     )
        //   )
        // }
      />
      <ambientLight intensity={0.4} />
      <gridHelper onClick={addBrick} args={[1500, 60]} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={addBrick}
        onPointerMove={mouseMove}
      >
        <planeGeometry args={[1500, 1500]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <BrickCursor ref={brickCursorRef} />
    </>
  );
};
