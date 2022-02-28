import React, { useEffect } from "react";
import ReactPlayer from "react-player/lazy";

const MediaPlayer = (url) => {
  useEffect(() => {
    console.log(url);
  }, [url]);

  return (
    <ReactPlayer
      url={Object.values(url)}
      controls={true}
      playing={false}
      volume={1}
      width="100%"
      height="400px"
      onReady={() => console.log("ready now")}
      light={true}
    />
  );
};

export default MediaPlayer;
