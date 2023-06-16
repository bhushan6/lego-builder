import { useSelect } from "@react-three/drei";
import React from "react";
import { useDeleteShortcut } from "../utils";

const DeleteBrick = ({ setBricks }) => {
  const selected = useSelect().map((sel) => sel.userData.uID);

  useDeleteShortcut(selected, setBricks);

  return <></>;
};

export default DeleteBrick;
