/* eslint-disable no-unused-vars */
import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import "./styles.css";
import { CREATE_MODE, EDIT_MODE } from "../../../utils";
import { useStore } from "../../../store";

export const ModeToggleBar = () => {
  const setMode = useStore((state) => state.setMode);

  return (
    <ToggleGroup.Root
      className="ToggleGroup"
      type="single"
      defaultValue={CREATE_MODE}
      aria-label="Text alignment"
    >
      <ToggleGroup.Item
        className="ToggleGroupItem"
        value={CREATE_MODE}
        aria-label={CREATE_MODE}
        onClick={() => setMode(CREATE_MODE)}
      >
        {CREATE_MODE}
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="ToggleGroupItem"
        value={EDIT_MODE}
        aria-label={EDIT_MODE}
        onClick={() => setMode(EDIT_MODE)}
      >
        {EDIT_MODE}
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};
