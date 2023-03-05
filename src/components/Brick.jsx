import React, { useMemo, useEffect, useRef } from "react";
import {
  CSSToHex,
  getMeasurementsFromDimensions,
  base,
  createGeometry,
} from "../utils";
import { Vector3, Box3 } from "three";

const emptyFn = () => {};

export const Brick = ({
  intersect,
  color = "#ff0000",
  dimensions = { x: 1, z: 1 },
  rotation = 0,
  translation = 0,
  addBrick = () => {},
  bricksBoundBox = { current: [] },
  uID = "",
  mouseMove = () => {},
  isModeEdit,
}) => {
  const brickRef = useRef();

  const { height, width, depth } = getMeasurementsFromDimensions(dimensions);
  const brickGeometry = useMemo(() => {
    return createGeometry({ width, height, depth, dimensions });
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

    const boundingBoxRef = bricksBoundBox.current;

    boundingBoxRef.push({ uID, brickBoundingBox });

    return () => {
      boundingBoxRef.filter((brick) => brick.uID !== uID);
    };
  }, [uID, bricksBoundBox]);

  const onPointerOver = (e) => {
    document.body.style.cursor = "pointer";
  };

  const onPointerLeave = () => {
    document.body.style.cursor = "inherit";
  };

  return (
    <>
      <mesh
        ref={brickRef}
        onClick={addBrick}
        position={[position.x, Math.abs(position.y), position.z]}
        rotation={[0, rotation, 0]}
        castShadow={true}
        receiveShadow={true}
        geometry={brickGeometry}
        onPointerMove={isModeEdit ? emptyFn : mouseMove}
        onPointerLeave={!isModeEdit ? emptyFn : onPointerLeave}
        onPointerEnter={!isModeEdit ? emptyFn : onPointerOver}
      >
        <meshStandardMaterial
          color={CSSToHex(color)}
          metalness={0.4}
          roughness={0.5}
        />
      </mesh>
    </>
  );
};
