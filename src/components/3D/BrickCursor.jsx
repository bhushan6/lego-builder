/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef, useMemo } from "react";
import { Vector3 } from "three";
import { getMeasurementsFromDimensions, base, CREATE_MODE } from "../../utils";
import { useStore } from "../../store";

export const BrickCursor = forwardRef(
  (
    {
      intersect = {
        point: new Vector3(),
        face: { normal: { x: 0, y: 0, z: 1 } },
      },
      dimensions = { x: 1, z: 1 },
      rotation = 0,
      translation = { x: 0, z: 0 },
    },
    ref
  ) => {
    const mode = useStore((state) => state.mode);

    const visible = mode === CREATE_MODE;

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
          ref={ref}
          position={[position.x, Math.abs(position.y), position.z]}
          rotation={[0, rotation, 0]}
          visible={visible}
        >
          <mesh
            position={[
              (offsetX * width) / dimensions.x,
              0,
              (offsetZ * width) / dimensions.z,
            ]}
          >
            <boxGeometry args={[width, height, depth]} />
            <meshBasicMaterial
              color={"white"}
              transparent={true}
              opacity={0.3}
            />
          </mesh>
        </group>
      </>
    );
  }
);
