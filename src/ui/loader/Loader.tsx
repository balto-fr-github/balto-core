import React from "react";

interface LoadingSpinnerProps {
  height?: string;
  color?: string;
  isFullScreen?: boolean;
}

const Loader: React.FC<LoadingSpinnerProps> = ({
  height = "200px",
  color = "#155634",
  isFullScreen = false,
}) => {
  return (
    <div
      style={{
        width: isFullScreen ? "100vw" : "100%",
        height: isFullScreen ? "100vh" : height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: isFullScreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        backgroundColor: isFullScreen ? "rgba(0, 0, 0, 0.5)" : "transparent",
        zIndex: isFullScreen ? 9999 : "auto",
      }}
    >
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent`}
        style={{
          borderColor: `rgba(0, 0, 0, 0.1)`,
          borderTopColor: color,
          width: "40px",
          height: "40px",
        }}
      ></div>
    </div>
  );
};

export default Loader;
