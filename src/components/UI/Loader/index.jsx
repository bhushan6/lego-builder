/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export const Loader = ({ status }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Loading
      <span className="spinner spinnerQuarter"></span>
    </div>
  );
};
