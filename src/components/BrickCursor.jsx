import React, { forwardRef, useMemo } from "react";
import { Vector3 } from "three";
import { getMeasurementsFromDimensions, base } from "../utils";

export const BrickCursor = forwardRef(
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
      const evenWidth = rotation === 0 ? width % 2 === 0 : depth % 2 === 0;
      const evenDepth = rotation === 0 ? depth % 2 === 0 : width % 2 === 0;

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
    }, [intersect, height, rotation, width, depth]);

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
