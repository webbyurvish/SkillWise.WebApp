import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import YouTube from "react-youtube";
import Header from "../Layout/Header";
import axios from "axios";

export default function PlayVideo() {
  const { id } = useParams();
  console.log(id);
  const [player, setPlayer] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: "snippet",
              id: id,
              key: "AIzaSyAwsFzF2YMFOcZ05Bc2DY3lUGJzi2F8Xvk",
            },
          }
        );

        const video = response.data.items[0];
        const title = video.snippet.title;
        setVideoTitle(title);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    fetchVideoDetails();
  }, [id]);

  const onReady = (event) => {
    setPlayer(event.target);
  };

  return (
    <div>
      <Header />
      <div></div>
      <div className="ytbody"></div>
      <div className="youtube-wrapper">
        <YouTube videoId={id} onReady={onReady} />
      </div>
      <h3 style={{ marginLeft: "13rem", marginTop: "2.5rem" }}>{videoTitle}</h3>
      <div></div>
      <body></body>
    </div>
  );
}
