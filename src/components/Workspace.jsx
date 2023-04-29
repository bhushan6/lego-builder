import React from "react";

export const Workspace = ({ onClick = () => {}, mouseMove = () => {} }) => {
  return (
    <>
      <gridHelper args={[1500, 60]} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={onClick}
        onPointerMove={mouseMove}
      >
        <planeGeometry args={[1500, 1500]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      {/* <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[3000, 3000, 1, 1]} />
        <shadowMaterial color="red" />
      </mesh> */}
    </>
  );
};
