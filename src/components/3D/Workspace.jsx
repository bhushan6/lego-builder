/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Environment, Lightformer } from "@react-three/drei";
import React, { useState } from "react";

export const Workspace = ({ onClick = () => {}, mouseMove = () => {} }) => {
  const [workspaceSize, setWorkspaceSize] = useState(500);

  const gridSize = workspaceSize / 25;

  return (
    <>
      <gridHelper args={[workspaceSize, gridSize]} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={onClick}
        // position={[0, -0.5, 0]}
        onPointerMove={(e) => {
          mouseMove(e);
          // adjustWorkspaceSize(e);
        }}
      >
        <planeGeometry args={[workspaceSize, workspaceSize]} />
        <meshBasicMaterial
          visible={false}
          color={"white"}
          opacity={0.4}
          transparent
        />
      </mesh>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, 0, 0]}>
          <Lightformer
            form="ring"
            intensity={1}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[2, 100, 1]}
          />
          <Lightformer
            form="ring"
            intensity={1}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[100, 2, 1]}
          />
          <Lightformer
            form="ring"
            intensity={0.5}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            form="rect"
            intensity={0.5}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[100, 10, 1]}
          />
        </group>
      </Environment>
    </>
  );
};
