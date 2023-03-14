import "./App.css";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { LinearToneMapping } from "three";
import { InfoPanel, Scene } from "./components";
import useStore from "./store";

const LegoRoom = () => {
  return (
    <>
      <Canvas
        // gl={{
        //   alpha: false,
        //   antialias: false,
        //   powerPreference: "high-performance",
        //   toneMapping: LinearToneMapping,
        // }}
        camera={{
          position: [17.43, 657.76, 943.51],
          near: 0.1,
          far: 20000,
        }}
        colorManagement
        shadows
        dpr={Math.min(2, window.devicePixelRatio)}
      >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
        </Suspense>
      </Canvas>
      <InfoPanel />
    </>
  );
};

function App() {
  // const enterRoom = useStore((state) => state.liveblocks.enterRoom);
  // const leaveRoom = useStore((state) => state.liveblocks.leaveRoom);
  // const isLoading = useStore((state) => state.liveblocks.isStorageLoading);

  // useEffect(() => {
  //   enterRoom("lego-demo-room");
  //   return () => {
  //     leaveRoom("lego-demo-room");
  //   };
  // }, [enterRoom, leaveRoom]);

  // if (isLoading) {
  //   return (
  //     <>
  //       <h1>Loading.....</h1>
  //     </>
  //   );
  // }

  return (
    <div className="App">
      <LegoRoom />
    </div>
  );
}

export default App;
