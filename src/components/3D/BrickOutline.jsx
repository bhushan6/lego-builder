/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// import { useSelect } from ".";
import React, { useLayoutEffect, useMemo, useRef } from "react";
import {
  createGeometry,
  getMeasurementsFromDimensions,
  knobSize,
  outlineWidth,
} from "../../utils";
import { BackSide, Object3D } from "three";
import { useStore } from "../../store";

const dummy = new Object3D();

const OutlineMesh = ({ meshesData }) => {
  const ref = useRef();

  const dimensions = meshesData[0]?.dimensions;

  const { height, width, depth } = dimensions
    ? getMeasurementsFromDimensions(dimensions)
    : {};

  const outlineGeometry = useMemo(() => {
    return createGeometry({
      width: width + outlineWidth * 2,
      height: height + outlineWidth * 2,
      depth: depth + outlineWidth * 2,
      dimensions,
      knobDim: knobSize + outlineWidth,
    });
  }, [width, height, depth, dimensions]);

  const compansate = {
    x: dimensions.x % 2 === 0 ? dimensions.x / 2 : (dimensions.x - 1) / 2,
    z: dimensions.z % 2 === 0 ? dimensions.z / 2 : (dimensions.z - 1) / 2,
  };

  useLayoutEffect(() => {
    if (!ref.current) return;

    meshesData.forEach((meshData, i) => {
      const translation = meshData.translation;

      const offset = {
        x:
          Math.sign(translation.x) < 0
            ? Math.max(translation.x, -compansate.x)
            : Math.min(translation.x, compansate.x),
        z:
          Math.sign(translation.z) < 0
            ? Math.max(translation.z, -compansate.z)
            : Math.min(translation.z, compansate.z),
      };

      dummy.rotation.set(0, meshData.rotation, 0);
      dummy.position.set(
        meshData.position.x + offset.x,
        Math.abs(meshData.position.y),
        meshData.position.z + offset.z
      );
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [meshesData]);

  return (
    <>
      <instancedMesh
        ref={ref}
        position={[0, 0.5, 0]}
        args={[outlineGeometry, null, meshesData.length]}
      >
        <meshBasicMaterial color={"white"} side={BackSide} />
      </instancedMesh>
    </>
  );
};

export const BrickOutline = () => {
  const selected = useStore((state) => state.selectedBricks).map(
    (sel) => sel.userData
  );

  const selectedMeshes = useMemo(() => {
    const meshesAccrodingToType = {};

    for (let i = 0; i < selected.length; i++) {
      const currentSelected = selected[i];
      if (Object.keys(currentSelected).length > 0) {
        meshesAccrodingToType[currentSelected.type] = meshesAccrodingToType[
          currentSelected.type
        ]
          ? [...meshesAccrodingToType[currentSelected.type], currentSelected]
          : [currentSelected];
      }
    }

    return meshesAccrodingToType;
  }, [selected]);

  return (
    <>
      {Object.entries(selectedMeshes).map(([key, value]) => (
        <OutlineMesh key={key} meshesData={value} />
      ))}
    </>
  );
};
