/* eslint-disable no-unused-vars */
import React from "react";
import { HexColorPicker } from "react-colorful";
import "./styles.css";
import { useStore } from "../../../../store";

export const ColorInput = () => {
  const setColor = useStore((state) => state.setColor);

  return (
    <div className="SliderInputContainer">
      <label className="SliderLabel">Color</label>
      <HexColorPicker color="#000000" onChange={(color) => setColor(color)} />
    </div>
  );
};
