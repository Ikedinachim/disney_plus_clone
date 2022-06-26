import React from "react";
import ReactPlayer from "react-player/lazy";

const MediaPlayer = (props) => {
  // useEffect(() => {
  //   // console.log(url);
  // }, [url]);
  const { url, height } = props;

  return (
    <ReactPlayer
      url={url}
      height={height}
      controls={true}
      playing={true}
      volume={1}
      width="100%"
      // height={Object.values(height)}
      // onReady={() => console.log("ready now")}
      // light={"https://i.stack.imgur.com/zw9Iz.png"}
      light={true}
    />
  );
};

export default MediaPlayer;
