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

const baseURL = "https://mysogi.uat.com.ng/";

const axios = Axios.create({
  baseURL,
});

//Get Statistics data
export const getPropellerCampaign = (propellerId) => async (dispatch) => {
  try {
    dispatch({ type: PROPELLER_CAMPAIGN_REQUEST });

    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const headers = {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      "Content-type": "application/json",
      crossdomain: true,
    };
    const params = {
      groupBy: "campaign_id",
      dayFrom: "2022-01-01 00:00:00",
      dayTo: "2022-02-22 23:59:59",
      campaignId: [parseInt(propellerId)],
      geo: ["NG"],
      dept: ["nativeads"],
    };

    const { data } = await axios.post(
      "/api/campaign/propeller-statistics-data",
      params,
      {
        headers: headers,
      }
    );
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
      payload: error,
    });
  }
};

//Get Statistics data by os
export const getOsCampaign = (propellerId) => async (dispatch) => {
  try {
    dispatch({ type: PROPELLER_OS_CAMPAIGN_REQUEST });

    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const headers = {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      "Content-type": "application/json",
      crossdomain: true,
    };
    const params = {
      groupBy: "os",
      dayFrom: "2022-01-01 00:00:00",
      dayTo: "2022-02-22 23:59:59",
      campaignId: [parseInt(propellerId)],
      geo: ["NG"],
      dept: ["nativeads"],
    };

    const { data } = await axios.post(
      "/api/campaign/propeller-statistics-data",
      params,
      {
        headers: headers,
      }
    );
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

    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const headers = {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      "Content-type": "application/json",
      crossdomain: true,
    };
    const params = {
      groupBy: "mobile_isp",
      dayFrom: "2022-01-01 00:00:00",
      dayTo: "2022-02-22 23:59:59",
      campaignId: [parseInt(propellerId)],
      geo: ["NG"],
      dept: ["nativeads"],
    };

    const { data } = await axios.post(
      "/api/campaign/propeller-statistics-data",
      params,
      {
        headers: headers,
      }
    );
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
