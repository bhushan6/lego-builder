import React, { useEffect } from "react";
import { useSelect } from ".";
import { useControls } from "leva";
import { Group } from "three";

const group = new Group();

export const Translate = () => {
  const [{ Translate }, set] = useControls(() => ({
    Translate: false,
  }));

  const selected = useSelect();

  useEffect(() => {
    const keypress = (e) => {
      if (!Translate) return;
      console.log(e.key);
      if (e.key === "6") {
        selected.forEach((mesh) => group.add(mesh));
        console.log(group);
      }
    };

    document.addEventListener("keypress", keypress);

    return () => document.removeEventListener("keypress", keypress);
  }, [Translate, selected]);

  return <></>;
};
