import React from 'react';
import { Helmet } from "react-helmet";

const LinkPreview = ({campaignMessage, image}) => {
  return (
    <Helmet>
      <meta property="og:title" content={campaignMessage} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="mysogi.com.ng"
      />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="400" />
    </Helmet>
  );
}

export default LinkPreview;
