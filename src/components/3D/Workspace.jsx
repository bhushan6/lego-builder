import { Environment, Lightformer } from "@react-three/drei";
import React, { useState } from "react";

const gridSize = 60;
// const extraOffset = 4;

export const Workspace = ({ onClick = () => {}, mouseMove = () => {} }) => {
  const [workspaceSize, setWorkspaceSize] = useState(1500);

  // const adjustWorkspaceSize = (e) => {
  //   if (
  //     Math.abs(e.point.x) * 2 > workspaceSize ||
  //     Math.abs(e.point.z) * 2 > workspaceSize
  //   ) {
  //     setWorkspaceSize(
  //       (workspaceSize) => workspaceSize + gridSize * extraOffset
  //     );
  //   } else {
  //   }
  // };

  return (
    <>
      <gridHelper args={[workspaceSize, gridSize]} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={onClick}
        onPointerMove={(e) => {
          mouseMove(e);
          // adjustWorkspaceSize(e);
        }}
      >
        <planeGeometry args={[workspaceSize, workspaceSize]} />
        <meshBasicMaterial
          visible={false}
          color={"red"}
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
      {/* <EffectComposer disableNormalPass multisampling={0}> */}
      {/* <N8AO color="red" aoRadius={2} intensity={1} /> */}
      {/* <SSAO /> */}
      {/* </EffectComposer> */}
      {/* <BakeShadows /> */}
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
