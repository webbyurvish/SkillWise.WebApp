import React, { useState } from "react";
import SearchBar from "./Searchbar";
import VideoList from "./VideoList";
import Header from "../Layout/Header";
import "./style/youtube.css";
import { useSelector } from "react-redux";

function Yt() {
  const videos = useSelector((state) => state.video.videos);

  return (
    <React.Fragment>
      <Header />
      <div className="ytbody">
        <nav className="flex-div ytnav">
          <div className="nav-left flex-div"></div>
          <div className="nav-middle flex-div">
            <div className="search_box flex-div">
              <SearchBar />
            </div>
          </div>
          <div className="nav-right flex-div"></div>
        </nav>

        {/* <!-- --------------------main---------------- --> */}

        <div className="content">
          <div id="result"></div>

          {/* <!-- ------------------------ video------------------------ --> */}
          <div style={{ marginTop: "3rem" }}>
            <VideoList videos={videos} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Yt;
