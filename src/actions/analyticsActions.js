import Axios from "axios";

import {
  PROPELLER_CAMPAIGN_REQUEST,
  PROPELLER_CAMPAIGN_SUCCESS,
  PROPELLER_CAMPAIGN_FAIL,
  CLEAR_ERRORS,
} from "../constants/analyticsConstants";

const baseURL = "https://ssp-api.propellerads.com/v5/";

const axios = Axios;

//Get Statistics data
export const getPropellerCampaign = (propellerId) => async (dispatch) => {
  try {
    dispatch({ type: PROPELLER_CAMPAIGN_REQUEST });
    const token = "8fcd81e29610f456f221b5727fdac71a116b1a45fcde6793";

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer 8fcd81e29610f456f221b5727fdac71a116b1a45fcde6793",
      },
    };

    const params = {
      group_by: "os",
      day_from: "2022-01-01 00:00:00",
      day_to: "2022-02-22 23:59:59",
      campaign_id: [propellerId],
      geo: ["NG"],
      dept: ["nativeads"],
    };

    const _url = "https://ssp-api.propellerads.com/v5/adv/statistics";
    const header = {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      accept: "application/json",
      // crossdomain: true,
      "Access-Control-Allow-Method": "POST",
      // "Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
      "Content-Type": "application/json",
      Authorization: "Bearer 8fcd81e29610f456f221b5727fdac71a116b1a45fcde6793",
    };
    const body = {
      group_by: "mobile_isp",
      day_from: "2022-02-01 00:00:00",
      day_to: "2022-02-20 23:59:59",
      campaign_id: [5313054],
      geo: ["NG", "US"],
      dept: ["nativeads"],
    };

    const { data } = await axios({
      method: "POST",
      url: "https://ssp-api.propellerads.com/v5/adv/statistics",
      headers: header,
      data: body,
    });

    console.log(data);
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
