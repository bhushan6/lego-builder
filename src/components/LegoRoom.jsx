import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { LinearToneMapping } from "three";
import ControlsWrapper from "./ControlsWrapper";
import { Scene, InfoPanel } from ".";

const LegoRoom = () => {
  return (
    <>
      <Canvas
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: LinearToneMapping,
        }}
        camera={{
          position: [17.43, 657.76, 943.51],
          near: 0.1,
          far: 20000,
        }}
        colormanagement={"true"}
        shadows={true}
        dpr={Math.min(2, window.devicePixelRatio)}
      >
        <Suspense fallback={null}>
          <Scene />
          <ControlsWrapper />
        </Suspense>
      </Canvas>
      <InfoPanel />
    </>
  );
};

export default LegoRoom;
