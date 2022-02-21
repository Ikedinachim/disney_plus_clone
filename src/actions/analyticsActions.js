import Axios from "axios";

import {
  PROPELLER_CAMPAIGN_REQUEST,
  PROPELLER_CAMPAIGN_SUCCESS,
  PROPELLER_CAMPAIGN_FAIL,
  CLEAR_ERRORS,
} from "../constants/analyticsConstants";

const baseURL = "https://ssp-api.propellerads.com/v5/";

const axios = Axios.create({
  baseURL,
});

//Get Statistics data
export const getPropellerCampaign = (propellerId) => async (dispatch) => {
  try {
    dispatch({ type: PROPELLER_CAMPAIGN_REQUEST });
    const token = "8fcd81e29610f456f221b5727fdac71a116b1a45fcde6793";

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      Request_body: {
        group_by: "campaign_id",
        day_from: "2022-01-01 00:00:00",
        day_to: "2022-02-22 23:59:59",
        campaign_id: [propellerId],
        geo: ["NG"],
        dept: ["nativeads"],
      },
    };

    const { data } = await axios.get("/adv/statistics", config);
    if (data.statusCode === 200) {
      dispatch({
        type: PROPELLER_CAMPAIGN_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: PROPELLER_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: PROPELLER_CAMPAIGN_FAIL,
      payload: error.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
