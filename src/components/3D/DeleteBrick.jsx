/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// import { useSelect, useSetSelection } from ".";
import React from "react";
import { useDeleteShortcut } from "../../utils";
import { useStore } from "../../store";

export const DeleteBrick = ({ setBricks }) => {
  const selected = useStore((state) => state.selectedBricks).map(
    (sel) => sel.userData.uID
  );
  const setSelection = useStore((state) => state.setSelectedBricks);

  const onDelete = () => {
    setSelection({});
  };

  useDeleteShortcut(selected, setBricks, onDelete);

  const bricks = useStore((state) => state.bricks);

  console.log(bricks, ":::::::");

  return <></>;
};
