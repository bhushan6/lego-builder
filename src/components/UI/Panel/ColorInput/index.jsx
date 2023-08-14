/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { HexColorPicker } from "react-colorful";
import "./styles.css";
import { useStore } from "../../../../store";
// import useDebounce from "use-debouncy";

export const ColorInput = () => {
  const setColor = useStore((state) => state.setColor);

  const tId = useRef();

  const debouncesetColor = (color) => {
    if (tId.current) clearTimeout(tId.current);

    tId.current = setTimeout(() => {
      setColor(color);
    }, 200);
  };

  return (
    <div className="SliderInputContainer">
      <label className="SliderLabel">Color</label>
      <HexColorPicker color="#000000" onChange={debouncesetColor} />
    </div>
  );
};
