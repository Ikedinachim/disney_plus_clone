import React from "react";
import styles from "./YoutubePlayer.module.scss";

const YoutubeEmbed = ( props ) => (
    // let { embedId } = props;
  <div className={styles.video_responsive}>
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${props.embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);


export default YoutubeEmbed;