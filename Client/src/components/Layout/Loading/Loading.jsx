import React from "react";
import "./Loading.css";

//////////////////// ----  Loading component ---- ////////////////////

export default function Loading() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="content">
          <div className="sbl-circ-ripple"></div>
        </div>
      </div>
    </div>
  );
}
