/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";

export const Lights = () => {
  return (
    <>
      <hemisphereLight groundColor={"white"} intensity={0.2} />
      <directionalLight position={[20, 30, 10]}></directionalLight>
    </>
  );
};
