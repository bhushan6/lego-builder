/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import "./styles.css";
import { useStore } from "../../../../store";

const stateMap = {
  width: "width",
  depth: "depth",
  "anchor X": "anchorX",
  "anchor Z": "anchorZ",
};

const setterMap = {
  width: "setWidth",
  depth: "setDepth",
  "anchor X": "setAnchorX",
  "anchor Z": "setAnchorZ",
};

export const SliderWithLabel = ({
  label = "width",
  defaultValue = 1,
  ...props
}) => {
  const value = useStore((state) => state[stateMap[label]]);
  const setValue = useStore((state) => state[setterMap[label]]);

  return (
    <div className="SliderInputContainer">
      <label className="SliderLabel">{label}</label>
      <Slider.Root
        className="SliderRoot"
        defaultValue={[defaultValue]}
        max={4}
        step={1}
        min={1}
        onValueChange={([newVal]) => setValue(newVal)}
        {...props}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range className="SliderRange" />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" aria-label={label}>
          {value}
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
};
