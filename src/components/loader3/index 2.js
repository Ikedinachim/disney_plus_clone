import React from "react";
// import styles from "./loader.module.scss";
// import LoadingGIF from "../../assets/img/loader.gif";
import "./progress.css";

const Loader = () => {
  return (
    <div className="container">
      <div className="main_div">
        <div className="row">
          <div className="card-body">
            <div className="col-md-12 loader5 heightauto">
              {/* Preloader */}
              <section>
                <div id="preloader">
                  <div id="ctn-preloader" className="ctn-preloader">
                    <div className="animation-preloader">
                      <div className="txt-loading">
                        <span
                          data-text-preloader="M"
                          className="letters-loading"
                        >
                          M
                        </span>
                        <span
                          data-text-preloader="Y"
                          className="letters-loading"
                        >
                          Y
                        </span>
                        <span
                          data-text-preloader="S"
                          className="letters-loading"
                        >
                          S
                        </span>
                        <span
                          data-text-preloader="O"
                          className="letters-loading"
                        >
                          O
                        </span>
                        <span
                          data-text-preloader="G"
                          className="letters-loading"
                        >
                          G
                        </span>
                        <span
                          data-text-preloader="I"
                          className="letters-loading"
                        >
                          I
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
