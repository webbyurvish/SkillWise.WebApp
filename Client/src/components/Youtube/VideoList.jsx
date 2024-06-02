import React from "react";
import VideoItem from "./VideoItem";
import { useSelector } from "react-redux";

const VideoList = ({ handleVideoSelect }) => {
  const videos = useSelector((state) => state.video.videos);
  return (
    <div className="list_content">
      {videos.map((video) => {
        return (
          <React.Fragment>
            <VideoItem
              key={video.id.videoId}
              video={video}
              handleVideoSelect={handleVideoSelect}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default VideoList;
