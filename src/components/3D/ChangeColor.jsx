/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useDeferredValue, useEffect, useRef } from "react";
import { useStore } from "../../store";

export const ChangeColor = ({ color }) => {
  const selected = useStore((state) => state.selectedBricks).map(
    (sel) => sel.userData.uID
  );

  const setBricks = useStore((state) => state.setBricks);

  const prevColor = useRef(color);

  const deferredColor = useDeferredValue(color);

  useEffect(() => {
    if (selected.length < 1 || prevColor.current === deferredColor) return;

    setBricks((bricks) => {
      const updatedBricks = [];

      bricks.forEach((brick) => {
        const selectedClone = [...selected];
        const uID = brick.uID;
        for (let i = 0; i < selectedClone.length; i++) {
          const selectedUID = selectedClone[i];
          if (uID === selectedUID) {
            brick.color = deferredColor;
            selectedClone.splice(i, 1);
          }
        }
        updatedBricks.push(brick);
      });

      return updatedBricks;
    });

    return () => {
      prevColor.current = deferredColor;
    };
  }, [deferredColor, selected, setBricks]);

  return null;
};
