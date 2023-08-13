/* eslint-disable no-unused-vars */
import React from "react";
import { TrashIcon, ResetIcon } from "@radix-ui/react-icons";
import "./styles.css";
import { useStore } from "../../../store";
// import { EDIT_MODE } from "../../../utils";

export const BottomBar = () => {
  const mode = useStore((state) => state.mode);

  // const isEditMode = mode === EDIT_MODE;

  const selectedBricks = useStore((state) => state.selectedBricks).map(
    (sel) => sel.userData.uID
  );
  const setBricks = useStore((state) => state.setBricks);
  const setSelection = useStore((state) => state.setSelectedBricks);

  const deleteSelectedBricks = () => {
    setBricks((bricks) => {
      const newBricks = bricks.filter((brick) => {
        const selectedClone = [...selectedBricks];
        const uID = brick.uID;
        let should = true;
        for (let i = 0; i < selectedClone.length; i++) {
          const selectedUID = selectedClone[i];
          if (uID === selectedUID) {
            should = false;
            selectedClone.splice(i, 1);
          }
        }
        return should;
      });
      return newBricks;
    });
    setSelection({});
  };

  return (
    <div className="BottomBar">
      <button className="Button violet">
        <ResetIcon className="Icon" color="black" />
      </button>
      <button className="Button violet">
        <ResetIcon
          style={{ transform: "scaleX(-1)" }}
          className="Icon"
          color="black"
        />
      </button>
      <button onClick={deleteSelectedBricks} className="Button violet">
        <TrashIcon className="Icon" color="black" />
      </button>
    </div>
  );
};
