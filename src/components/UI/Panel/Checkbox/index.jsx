/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import * as CheckboxRadix from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import "./styles.css";
import { useStore } from "../../../../store";

const stateMap = {
  rotate: "rotate",
};

const setterMap = {
  rotate: "setRotate",
};

export const Checkbox = ({ label = "rotate" }) => {
  const setValue = useStore((state) => state[setterMap[label]]);

  return (
    <div
      className="SliderInputContainer"
      style={{ display: "flex", alignItems: "center" }}
    >
      <label className="SliderLabel" htmlFor={label}>
        {label}
      </label>
      <CheckboxRadix.Root
        className="CheckboxRoot"
        id={label}
        onCheckedChange={(bool) => setValue(bool)}
      >
        <CheckboxRadix.Indicator className="CheckboxIndicator">
          <CheckIcon />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
    </div>
  );
};
