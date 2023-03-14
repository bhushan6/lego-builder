import React from "react";
// import { useControls } from "leva";

export const Lights = () => {
  // const [{ left, bottom, far, near, zoom }, set] = useControls(() => ({
  //   left: {
  //     value: 1,
  //     min: 1,
  //     max: 500,
  //     step: 1,
  //   },
  //   bottom: {
  //     value: 1,
  //     min: 1,
  //     max: 500,
  //     step: 1,
  //   },
  //   far: {
  //     value: 1,
  //     min: 1,
  //     max: 50000,
  //     step: 1,
  //   },
  //   near: {
  //     value: 0.01,
  //     min: 0.01,
  //     max: 20,
  //     step: 0.1,
  //   },
  //   zoom: {
  //     value: 0,
  //     min: 0,
  //     max: 2,
  //     step: 0.1,
  //   },
  // }));

  return (
    <>
      <spotLight
        position={[-1000, 1500, -500]}
        intensity={0.9}
        penumbra={1}
        shadow-mapSize={[512, 512]}
        castShadow
      />
      <ambientLight intensity={0.4} />
    </>
  );
};
