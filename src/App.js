import "./App.css";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { LinearToneMapping } from "three";
import { Scene } from "./components";

function App() {
  return (
    <div className="App">
      <Canvas
        gl={{
          alpha: false,
          antialias: false,
          powerPreference: "high-performance",
          toneMapping: LinearToneMapping,
        }}
        camera={{
          position: [17.43, 657.76, 943.51],
          near: 0.1,
          far: 20000,
        }}
        colorManagement={true}
        shadowMap={true}
        dpr={Math.min(2, window.devicePixelRatio)}
      >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
