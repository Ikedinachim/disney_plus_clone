import React from "react";
// import styles from "./loader.module.scss";
// import LoadingGIF from "../../assets/img/loader.gif";
import "./progress.css";

const Loader = () => {
  return (
    <div>
      <div className="progress-circle p10">
        <span>10%</span>
        <div className="left-half-clipper">
          <div className="first50-bar" />
          <div className="value-bar" />
        </div>
      </div>
      <div className="progress-circle p33">
        <span>33%</span>
        <div className="left-half-clipper">
          <div className="first50-bar" />
          <div className="value-bar" />
        </div>
      </div>
      <div className="progress-circle over50 p66">
        <span>66%</span>
        <div className="left-half-clipper">
          <div className="first50-bar" />
          <div className="value-bar" />
        </div>
      </div>
      <div className="progress-circle over50 p77">
        <span>77%</span>
        <div className="left-half-clipper">
          <div className="first50-bar" />
          <div className="value-bar" />
        </div>
      </div>
      <div className="progress-circle over50 p99">
        <span>99%</span>
        <div className="left-half-clipper">
          <div className="first50-bar" />
          <div className="value-bar" />
        </div>
      </div>
      <div className="progress-circle over50 p100">
        <span>100%</span>
        <div className="left-half-clipper">
          <div className="first50-bar" />
          <div className="value-bar" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
