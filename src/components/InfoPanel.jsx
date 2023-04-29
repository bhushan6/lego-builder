import React from "react";

export const InfoPanel = () => {
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
      Use panel on right top corner to customize the Lego Bricks Properties Use
      <br />
      "AWSD" to chnage the anchor points of bricks
    </div>
  );
};
