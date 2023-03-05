import React, { useEffect, useState, useRef } from "react";
import { Shadow, Brick, BrickCursor, Lights, Workspace } from ".";
import { Vector3, Box3 } from "three";
import { uID, getMeasurementsFromDimensions, base } from "../utils";
import { useControls } from "leva";

let t;

export const Scene = () => {
  const [bricks, setBricks] = useState([]);

  const bricksBoundBox = useRef([]);

  const brickCursorRef = useRef();

  const { width, depth, rotate } = useControls({
    width: {
      value: 1,
      min: 1,
      max: 5,
      step: 1,
    },
    depth: {
      value: 2,
      min: 1,
      max: 5,
      step: 1,
    },
    rotate: false,
  });

  const addBrick = (e) => {
    e.stopPropagation();

    if (!e.face || !e.face.normal || !e.point) return;

    if (!brickCursorRef.current) return;

    if (!isDrag.current) {
      const dimensions = getMeasurementsFromDimensions({
        x: width,
        z: depth,
      });
      const boundingBoxOfBrickToBeAdded = new Box3().setFromObject(
        brickCursorRef.current
      );

      let canCreate = true;

      for (let index = 0; index < bricksBoundBox.current.length; index++) {
        const brickBoundingBox = bricksBoundBox.current[index].brickBoundingBox;
        const collision =
          boundingBoxOfBrickToBeAdded.intersectsBox(brickBoundingBox);

        console.log(collision);

        if (collision) {
          const dx = Math.abs(
            brickBoundingBox.max.x - boundingBoxOfBrickToBeAdded.max.x
          );
          const dz = Math.abs(
            brickBoundingBox.max.z - boundingBoxOfBrickToBeAdded.max.z
          );
          const yIntsersect =
            brickBoundingBox.max.y - 9 > boundingBoxOfBrickToBeAdded.min.y;
          if (
            yIntsersect &&
            dx !== dimensions.width &&
            dz !== dimensions.depth
          ) {
            canCreate = false;
            break;
          }
        }
      }

      if (canCreate) {
        const brickData = {
          intersect: { point: e.point, face: e.face },
          uID: uID(),
          dimensions: { x: width, z: depth },
          rotation: rotate ? Math.PI / 2 : 0,
        };

        setBricks((prevState) => [...prevState, brickData]);
      }
    } else {
      isDrag.current = false;
    }
  };

  const mouseMove = (e) => {
    e.stopPropagation();
    if (!brickCursorRef.current) return;

    const { height } = getMeasurementsFromDimensions({
      x: width,
      z: depth,
    });

    const evenWidth = !rotate ? width % 2 === 0 : depth % 2 === 0;
    const evenDepth = !rotate ? depth % 2 === 0 : width % 2 === 0;

    brickCursorRef.current.position
      .copy(new Vector3(e.point.x, Math.abs(e.point.y), e.point.z))
      .add(
        new Vector3(e.face.normal.x, Math.abs(e.face.normal.y), e.face.normal.z)
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
      }, 300);
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
      <Lights />
      <Workspace addBrick={addBrick} mouseMove={mouseMove} />
      <BrickCursor
        ref={brickCursorRef}
        rotation={rotate ? Math.PI / 2 : 0}
        dimensions={{ x: width, z: depth }}
      />
    </>
  );
};
