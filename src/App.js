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
          position: [0, 0, 10],
          near: 0.1,
          far: 20000,
        }}
        colorManagement={true}
        shadowMap={true} // highlight-line
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
