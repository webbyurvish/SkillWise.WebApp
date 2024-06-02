import React from "react";

//////////////////// ---- Not Found Page ---- ////////////////////

export default function NotFound() {
  return (
    <React.Fragment>
      <div style={{ display: "flex", paddingTop: "14rem", marginLeft: "2rem" }}>
        <div>
          <img style={{ width: "35vw" }} src="/images/NotFound.png" />
        </div>
        <div>
          <h2
            style={{
              margin: "2rem",
              fontSize: "1.875rem",
              fontWeight: 400,
              fontWeight: "bold",
            }}
          >
            Not Found
          </h2>
          <p style={{ fontSize: "1.125rem", margin: "2rem" }}>
            You just hit a route that doesn't exist... What can you do now?
            That's a good question! There are several things you can do, going
            to home page would be a good idea. You might want to read the blog,
            we have very interesting articles and tutorials! Maybe looking for a
            mentor to improve your career?
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
