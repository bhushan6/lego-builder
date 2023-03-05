import React, { useMemo, useEffect, useRef } from "react";
import {
  CSSToHex,
  getMeasurementsFromDimensions,
  base,
  knobSize,
} from "../utils";
import { BoxGeometry, CylinderGeometry, Vector3, Box3 } from "three";
import { mergeBufferGeometries } from "three/addons/utils/BufferGeometryUtils.js";

function createGeometry({ width, height, depth, dimensions }) {
  let geometries = [];
  const cubeGeo = new BoxGeometry(width - 0.1, height - 0.1, depth - 0.1);

  geometries.push(cubeGeo);

  for (let i = 0; i < dimensions.x; i++) {
    for (let j = 0; j < dimensions.z; j++) {
      const cylinder = new CylinderGeometry(knobSize, knobSize, knobSize, 20);
      const x = base * i - ((dimensions.x - 1) * base) / 2;
      const y = base / 1.5; // TODO to be reworked
      const z = base * j - ((dimensions.z - 1) * base) / 2;
      cylinder.translate(x, y, z);
      geometries.push(cylinder);
    }
  }

  const brickGeometry = mergeBufferGeometries(geometries);
  return brickGeometry;
}

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
}) => {
  const brickRef = useRef();

  console.log(intersect);

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
        onPointerMove={mouseMove}
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
