import React from "react";
import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category = "Generic") => {
  const eventTracker = (
    action = "User clicked a generic button",
    label = "Generic label"
  ) => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};
export default useAnalyticsEventTracker;
