/* eslint-disable no-unused-vars */
import React from "react";
import { TrashIcon, ResetIcon } from "@radix-ui/react-icons";
import "./styles.css";
import { useStore } from "../../../store";
import { PopoverPeopleList } from "../PeopleList";
import { useUndoRedoShortcut } from "../../../utils";
// import { EDIT_MODE } from "../../../utils";

export const BottomBar = () => {
  const mode = useStore((state) => state.mode);

  // const isEditMode = mode === EDIT_MODE;

  const selectedBricks = useStore((state) => state.selectedBricks).map(
    (sel) => sel.userData.uID
  );
  const setBricks = useStore((state) => state.setBricks);
  const setSelection = useStore((state) => state.setSelectedBricks);

  const room = useStore((state) => state.liveblocks.room);

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

  // const clearBricks = useStore((state) => state.clearBricks);

  const undo = () => {
    room.history.undo();
    setSelection({});
  };

  const redo = () => {
    room.history.redo();
    setSelection({});
  };

  useUndoRedoShortcut(undo, redo);

  return (
    <div className="BottomBar">
      <button className="Button violet" onClick={undo}>
        <ResetIcon className="Icon" color="black" />
      </button>
      <button className="Button violet" onClick={redo}>
        <ResetIcon
          style={{ transform: "scaleX(-1)" }}
          className="Icon"
          color="black"
        />
      </button>
      <button onClick={deleteSelectedBricks} className="Button violet">
        <TrashIcon className="Icon" color="black" />
      </button>
      {/* <button onClick={clearBricks} className="Button violet">
        <TrashIcon className="Icon" color="black" />
      </button> */}
      <PopoverPeopleList />
    </div>
  );
};
