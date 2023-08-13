/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { LinearToneMapping } from "three";
import { ControlsWrapper, Scene } from ".";
import { DialogBox } from "../UI";
import { Perf } from "r3f-perf";
import { ModeToggleBar } from "../UI/ModeToggleBar";
import { Panel } from "../UI/Panel";
import { BottomBar } from "../UI/BottomBar";

export const LegoRoom = () => {
  return (
    <>
      <DialogBox />
      <ModeToggleBar />
      <Panel />
      <BottomBar />
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
        {/* <Perf position="bottom-left" matrixUpdate={true} /> */}
      </Canvas>
    </>
  );
};
