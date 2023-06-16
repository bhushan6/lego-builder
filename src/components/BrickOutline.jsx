import { useSelect } from "@react-three/drei";
import React, { useMemo } from "react";

const OutlineMesh = ({ meshesData }) => {
  console.log(meshesData);
  return <></>;
};

const BrickOutline = () => {
  const selected = useSelect().map((sel) => sel.userData);

  const selectedMeshes = useMemo(() => {
    const meshesAccrodingToType = {};

    for (let i = 0; i < selected.length; i++) {
      const currentSelected = selected[i];
      meshesAccrodingToType[currentSelected.type] = meshesAccrodingToType[
        currentSelected.type
      ]
        ? [...meshesAccrodingToType[currentSelected.type], currentSelected]
        : [currentSelected];
    }

    return meshesAccrodingToType;
  }, [selected]);

  //   const compansate = {
  //     x: dimensions.x % 2 === 0 ? dimensions.x / 2 : (dimensions.x - 1) / 2,
  //     z: dimensions.z % 2 === 0 ? dimensions.z / 2 : (dimensions.z - 1) / 2,
  //   };

  //   const offset = {
  //     x:
  //       Math.sign(translation.x) < 0
  //         ? Math.max(translation.x, -compansate.x)
  //         : Math.min(translation.x, compansate.x),
  //     z:
  //       Math.sign(translation.z) < 0
  //         ? Math.max(translation.z, -compansate.z)
  //         : Math.min(translation.z, compansate.z),
  //   };

  return (
    <>
      {/* <mesh
        position={[
          (offset.x * width) / dimensions.x,
          0.5,
          (offset.z * depth) / dimensions.z,
        ]}
        geometry={outlineGeometry}
      >
        <meshBasicMaterial color={"white"} side={BackSide} />
      </mesh> */}
      {Object.entries(selectedMeshes).map(([key, value]) => (
        <OutlineMesh key={key} meshesData={value} />
      ))}
    </>
  );
};

export default BrickOutline;
