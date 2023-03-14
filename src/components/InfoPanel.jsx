import React from "react";
import useStore from "../store/index";

export const InfoPanel = () => {
  const clearBricks = useStore((state) => state.clearBricks);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "1000",
        top: 0,
        left: 0,
        fontFamily: "sans-serif",
        padding: "10px",
        width: "200px",
      }}
    >
      {/* Use panel on right top corner to customize the Lego Bricks Properties */}
      <button onClick={clearBricks}>Clear Scene</button>
    </div>
  );
};
