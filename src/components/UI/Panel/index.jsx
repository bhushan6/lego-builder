/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./styles.css";
import { SliderWithLabel } from "./Slider";
import { Checkbox } from "./Checkbox";
import { ColorInput } from "./ColorInput";

export const Panel = () => {
  return (
    <div className="Panel">
      <SliderWithLabel label="width" />
      <SliderWithLabel label="depth" />
      <SliderWithLabel label="anchor X" min={-2} defaultValue={0} max={2} />
      <SliderWithLabel label="anchor Z" min={-2} defaultValue={0} max={2} />
      <Checkbox />
      <ColorInput />
    </div>
  );
};
