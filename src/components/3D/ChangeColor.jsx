/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useDeferredValue, useEffect, useRef } from "react";
import { useSelect } from ".";

export const ChangeColor = ({ color, setBricks }) => {
  const selected = useSelect().map((sel) => sel.userData.uID);

  const prevColor = useRef(color);

  const deferredColor = useDeferredValue(color);

  useEffect(() => {
    if (selected.length < 1 || prevColor.current === deferredColor) return;

    setBricks((bricks) =>
      bricks.map((brick) => {
        const selectedClone = [...selected];
        const uID = brick.uID;
        for (let i = 0; i < selectedClone.length; i++) {
          const selectedUID = selectedClone[i];
          if (uID === selectedUID) {
            brick.color = deferredColor;
            selectedClone.splice(i, 1);
          }
        }
        return brick;
      })
    );

    return () => {
      prevColor.current = deferredColor;
    };
  }, [deferredColor, selected]);

  return <></>;
};
