import React from "react";

export const Lights = () => {
  return (
    <>
      <hemisphereLight intensity={0.2} />
      <directionalLight
        position={[20, 30, 10]}
        shadow-mapSize={2048}
        shadow-bias={-0.001}
        castShadow
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-50, 50, 50, -50, 10, 1000]}
        />
      </directionalLight>
    </>
  );
};
