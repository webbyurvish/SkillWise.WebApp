import React from "react";
import "./style/youtube.css";
import { Link } from "react-router-dom";

const VideoItem = ({ video }) => {
  const videoId = video.id.videoId;

  return (
    <React.Fragment>
      <div className="vid_list">
        <Link className="yta" to={`/videos/play/${videoId}`}>
          <a className="yta">
            <img
              className="ytimg thumbnail"
              src={video.snippet.thumbnails.medium.url}
              alt=""
            />
          </a>
          <div className="flex-div">
            <div className="vid-info">{video.snippet.title}</div>
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
};
export default VideoItem;
