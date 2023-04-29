import React, { useMemo, useEffect, useRef } from "react";
import {
  CSSToHex,
  getMeasurementsFromDimensions,
  base,
  createGeometry,
} from "../utils";
import { Vector3, Box3 } from "three";

export const Brick = ({
  intersect,
  color = "#ff0000",
  dimensions = { x: 1, z: 1 },
  rotation = 0,
  translation = { x: 0, z: 0 },
  onClick = () => {},
  bricksBoundBox = { current: [] },
  uID = "",
  mouseMove = () => {},
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
      boundingBoxRef.filter((brick) => {
        return brick.uID !== uID;
      });
    };
  }, []);

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
          position={[
            (offsetX * width) / dimensions.x,
            0.5,
            (offsetZ * depth) / dimensions.z,
          ]}
          onClick={onClick}
          geometry={brickGeometry}
          onPointerMove={mouseMove}
        >
          <meshStandardMaterial
            color={CSSToHex(color)}
            metalness={0.4}
            roughness={0.5}
          />
        </mesh>
      </group>
    </>
  );
};
