import { CircularProgress } from "@mui/material";
import React from "react";

function Loader({ height = "calc(100vh)" }: any) {
  return (
    <div
      style={{
        width: "100%",
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
}

export default Loader;
