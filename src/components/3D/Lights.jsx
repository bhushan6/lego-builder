import React from "react";

export const Lights = () => {
  return (
    <>
      <hemisphereLight groundColor={"white"} intensity={0.2} />
      <directionalLight position={[20, 30, 10]}></directionalLight>
    </>
  );
};
