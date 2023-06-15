import React, { useMemo, useEffect, useRef } from "react";
import {
  CSSToHex,
  getMeasurementsFromDimensions,
  base,
  createGeometry,
  knobSize,
} from "../utils";
import { Vector3, Box3, BackSide } from "three";
import { useSelect } from "@react-three/drei";

export const Brick = ({
  intersect,
  color = "#ff0000",
  dimensions = { x: 1, z: 1 },
  rotation = 0,
  translation = { x: 0, z: 0 },
  // onClick = () => {},
  bricksBoundBox = { current: [] },
  uID = "",
  mouseMove = () => {},
}) => {
  // const [{}, set] = useControls(() => ({
  //   Delete: button((get) => {
  //     deleteSelectedBrick();
  //   }),
  // }));

  const brickRef = useRef();

  const { height, width, depth } = getMeasurementsFromDimensions(dimensions);

  const brickGeometry = useMemo(() => {
    return createGeometry({ width, height, depth, dimensions });
  }, [width, height, depth, dimensions]);

  const outlineGeometry = useMemo(() => {
    return createGeometry({
      width: width + 2.6,
      height: height + 2.6,
      depth: depth + 2.6,
      dimensions,
      knobDim: knobSize + 1.2,
    });
  }, [width, height, depth, dimensions]);

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

  useEffect(() => {
    const brickBoundingBox = new Box3().setFromObject(brickRef.current);

    bricksBoundBox.current.push({ uID, brickBoundingBox });

    return () => {
      const newA = [];
      for (let i = 0; i < bricksBoundBox.current.length; i++) {
        const element = bricksBoundBox.current[i];
        if (element.uID !== uID) {
          newA.push(element);
        }
      }
      bricksBoundBox.current = newA;
    };
  }, [uID, bricksBoundBox]);

  const compansateX =
    dimensions.x % 2 === 0 ? dimensions.x / 2 : (dimensions.x - 1) / 2;
  const compansateZ =
    dimensions.z % 2 === 0 ? dimensions.z / 2 : (dimensions.z - 1) / 2;

  const offsetX =
    Math.sign(translation.x) < 0
      ? Math.max(translation.x, -compansateX)
      : Math.min(translation.x, compansateX);

  const offsetZ =
    Math.sign(translation.z) < 0
      ? Math.max(translation.z, -compansateZ)
      : Math.min(translation.z, compansateZ);

  const selected = useSelect().map((sel) => sel.userData.uID);
  const isSelected = !!selected.find((sel) => sel === uID);

  return (
    <>
      <group
        ref={brickRef}
        rotation={[0, rotation, 0]}
        position={[position.x, Math.abs(position.y), position.z]}
      >
        <mesh
          castShadow
          receiveShadow
          userData={{ uID }}
          position={[
            (offsetX * width) / dimensions.x,
            0.5,
            (offsetZ * depth) / dimensions.z,
          ]}
          // onClick={onClick}
          geometry={brickGeometry}
          onPointerMove={mouseMove}
        >
          <meshStandardMaterial
            color={CSSToHex(color)}
            metalness={0.4}
            roughness={0.5}
          />
        </mesh>
        {isSelected && (
          <mesh
            position={[
              (offsetX * width) / dimensions.x,
              0.5,
              (offsetZ * depth) / dimensions.z,
            ]}
            geometry={outlineGeometry}
          >
            <meshBasicMaterial color={"white"} side={BackSide} />
          </mesh>
        )}
      </group>
    </>
  );
};
