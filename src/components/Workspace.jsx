import React from "react";

export const Workspace = ({ addBrick = () => {}, mouseMove = () => {} }) => {
  return (
    <>
      <gridHelper onClick={addBrick} args={[1500, 60]} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={addBrick}
        onPointerMove={mouseMove}
      >
        <planeGeometry args={[1500, 1500]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </>
  );
};
