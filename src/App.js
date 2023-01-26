import React, { useEffect } from "react";
import ReactGA from "react-ga";

import MainRoutes from "./routes/Routes";
// import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./main.css";
import "./style.css";
import "./dashforge.css";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

function App() {
  const TRACKING_ID = "UA-232324966-1"; // MYSOGI TRACKING_ID
  ReactGA.initialize(TRACKING_ID);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return <MainRoutes />;
}

export default App;
