import React from "react";

export const Lights = () => {
  return (
    <>
      <spotLight
        position={[-1000, 1500, -500]}
        intensity={0.9}
        castShadow={true}
        shadowBias={-0.0000022}
        penumbra={0.5}
        decay={2}
        shadowMapHeight={4096}
        shadowMapWidth={4096}
      />
      <ambientLight intensity={0.4} />
    </>
  );
};
