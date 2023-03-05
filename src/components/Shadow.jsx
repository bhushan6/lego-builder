import React from "react";

export const Shadow = ({ size = 3000 }) => {
  return (
    <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size, size]} />
      <shadowMaterial opacity={0.2} />
    </mesh>
  );
};
