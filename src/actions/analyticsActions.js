import Axios from "axios";

import {
  PROPELLER_CAMPAIGN_REQUEST,
  PROPELLER_CAMPAIGN_SUCCESS,
  PROPELLER_CAMPAIGN_FAIL,
  PROPELLER_OS_CAMPAIGN_REQUEST,
  PROPELLER_OS_CAMPAIGN_SUCCESS,
  PROPELLER_OS_CAMPAIGN_FAIL,
  PROPELLER_MOBILE_REQUEST,
  PROPELLER_MOBILE_SUCCESS,
  PROPELLER_MOBILE_FAIL,
  CLEAR_ERRORS,
} from "../constants/analyticsConstants";

const baseURL = "https://ssp-api.propellerads.com/v5/";

const axios = Axios.create({
  baseURL,
});
const token = "8fcd81e29610f456f221b5727fdac71a116b1a45fcde6793";

//Get Statistics data
export const getPropellerCampaign = (propellerId) => async (dispatch) => {
  try {
    dispatch({ type: PROPELLER_CAMPAIGN_REQUEST });

    
      const headers = {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
        "Content-type": "application/json",
        crossdomain: true,
      };
      const params = {
        group_by: "campaign_id",
        day_from: "2022-01-01 00:00:00",
        day_to: "2022-02-22 23:59:59",
        campaign_id: [parseInt(propellerId)],
        geo: ["NG"],
        dept: ["nativeads"],
      };
    

    const { data } = await axios.post("/adv/statistics", params,{headers: headers});
    if (data.statusCode === 200) {
      dispatch({
        type: PROPELLER_CAMPAIGN_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: PROPELLER_CAMPAIGN_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: PROPELLER_CAMPAIGN_FAIL,
      payload: error,
    });
  }
};

//Get Statistics data by os
export const getOsCampaign = (propellerId) => async (dispatch) => {
  try {
    dispatch({ type: PROPELLER_OS_CAMPAIGN_REQUEST });

    const config = {
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      data: {
        group_by: "os",
        day_from: "2022-01-01 00:00:00",
        day_to: "2022-02-22 23:59:59",
        campaign_id: [propellerId],
        geo: ["NG"],
        dept: ["nativeads"],
      },
    };

    const { data } = await axios.post("/adv/statistics", config);
    if (data.status === "success") {
      dispatch({
        type: PROPELLER_OS_CAMPAIGN_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: PROPELLER_OS_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: PROPELLER_OS_CAMPAIGN_FAIL,
      payload: error.message,
    });
  }
};

//Get campaigns by mobile_isp
export const getMobileCampaign = (propellerId) => async (dispatch) => {
  try {
    dispatch({ type: PROPELLER_MOBILE_REQUEST });

    const config = {
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        group_by: "mobile_isp",
        day_from: "2022-01-01 00:00:00",
        day_to: "2022-02-22 23:59:59",
        campaign_id: [propellerId],
        geo: ["NG"],
        dept: ["nativeads"],
      },
    };

    const { data } = await axios.post("/adv/statistics", config);
    if (data.status === "success") {
      dispatch({
        type: PROPELLER_MOBILE_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: PROPELLER_MOBILE_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: PROPELLER_MOBILE_FAIL,
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
