import { useSelect, useSetSelection } from "../Select/Index";
import React from "react";
import { useDeleteShortcut } from "../utils";

const DeleteBrick = ({ setBricks }) => {
  const selected = useSelect().map((sel) => sel.userData.uID);
  const setSelection = useSetSelection();

  const onDelete = () => {
    setSelection({});
  };

  useDeleteShortcut(selected, setBricks, onDelete);

  return <></>;
};

export default DeleteBrick;
