import axios from "axios";

const KEY = "AIzaSyCJBwO3gwtnkbTAIS1FDg6UNak7iF0XxmI";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY,
  },
});
