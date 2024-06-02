import axios from "axios";

const KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const baseURL = process.env.REACT_APP_YOUTUBE_BASE_URL;

//////////////////// ---- youtube data api request ---- ////////////////////

export default axios.create({
  baseURL: baseURL,
  params: {
    part: "snippet",
    maxResults: 12,
    type: "video",
    key: KEY,
  },
});
