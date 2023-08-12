/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useSelect, useSetSelection } from ".";
import React from "react";
import { useDeleteShortcut } from "../../utils";

export const DeleteBrick = ({ setBricks }) => {
  const selected = useSelect().map((sel) => sel.userData.uID);
  const setSelection = useSetSelection();

  const onDelete = () => {
    setSelection({});
  };

  useDeleteShortcut(selected, setBricks, onDelete);

  return <></>;
};
