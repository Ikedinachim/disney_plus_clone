import Axios from "axios";
import { DateTime } from "luxon";

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
  CAMPAIGN_DATE_REQUEST,
  CAMPAIGN_DATE_SUCCESS,
  CAMPAIGN_DATE_FAIL,
  ADS_CLICK_REQUEST,
  ADS_CLICK_SUCCESS,
  ADS_CLICK_FAIL,
  CLEAR_ERRORS,
  BITLY_CLICK_REQUEST,
  BITLY_CLICK_SUCCESS,
  BITLY_CLICK_FAIL,
} from "../constants/analyticsConstants";

const baseURL = process.env.REACT_APP_MYSOGI_BASE_URL;

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
      dayFrom: "2022-01-01",
      dayTo: DateTime.now().toFormat("yyyy-MM-dd"),
      campaignId: [parseInt(propellerId)],
      geo: ["NG"],
      dept: ["nativeads"],
    };

    const data = await axios.post(
      "/api/campaign/propeller-statistics-data",
      params,
      {
        headers: headers,
      }
    );
    const body = data.data;
    if (data.status === 200) {
      dispatch({
        type: PROPELLER_CAMPAIGN_SUCCESS,
        payload: body.data,
      });
    } else {
      dispatch({
        type: PROPELLER_CAMPAIGN_FAIL,
        payload: body.message,
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
      dayFrom: "2022-01-01",
      dayTo: DateTime.now().toFormat("yyyy-MM-dd"),
      campaignId: [parseInt(propellerId)],
      geo: ["NG"],
      dept: ["nativeads"],
    };

    const data = await axios.post(
      "/api/campaign/propeller-statistics-data",
      params,
      {
        headers: headers,
      }
    );

    const body = data.data;

    if (data.status === 200) {
      dispatch({
        type: PROPELLER_OS_CAMPAIGN_SUCCESS,
        payload: body.data,
      });
    } else {
      dispatch({
        type: PROPELLER_OS_CAMPAIGN_FAIL,
        payload: body.message,
      });
    }
  } catch (error) {
    dispatch({
      type: PROPELLER_OS_CAMPAIGN_FAIL,
      payload: error.message,
    });
  }
};

//Get day to day
export const getCampaignByDate = (propellerId) => async (dispatch) => {
  try {
    dispatch({ type: CAMPAIGN_DATE_REQUEST });

    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const headers = {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      "Content-type": "application/json",
      crossdomain: true,
    };
    const params = {
      groupBy: "date_time",
      dayFrom: "2022-01-01",
      dayTo: DateTime.now().toFormat("yyyy-MM-dd"),
      campaignId: [parseInt(propellerId)],
      geo: ["NG"],
      dept: ["nativeads"],
    };

    const data = await axios.post(
      "/api/campaign/propeller-statistics-data",
      params,
      {
        headers: headers,
      }
    );
    const body = data.data;
    if (data.status === 200) {
      dispatch({
        type: CAMPAIGN_DATE_SUCCESS,
        payload: body.data,
      });
    } else {
      dispatch({
        type: CAMPAIGN_DATE_FAIL,
        payload: body.message,
      });
    }
  } catch (error) {
    dispatch({
      type: CAMPAIGN_DATE_FAIL,
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
      dayFrom: "2022-01-01",
      dayTo: DateTime.now().toFormat("yyyy-MM-dd"),
      campaignId: [parseInt(propellerId)],
      geo: ["NG"],
      dept: ["nativeads"],
    };

    const data = await axios.post(
      "/api/campaign/propeller-statistics-data",
      params,
      {
        headers: headers,
      }
    );
    const body = data.data;
    if (data.status === 200) {
      dispatch({
        type: PROPELLER_MOBILE_SUCCESS,
        payload: body.data,
      });
    } else {
      dispatch({
        type: PROPELLER_MOBILE_FAIL,
        payload: body.message,
      });
    }
  } catch (error) {
    dispatch({
      type: PROPELLER_MOBILE_FAIL,
      payload: error.message,
    });
  }
};

// Update Influencer Campaign Status Action
export const setAdsClickStatus = (payload) => async (dispatch) => {
  // console.log(payload);
  try {
    dispatch({ type: ADS_CLICK_REQUEST });
    const { data } = await axios.post("/api/campaign/save-click", payload);

    if (data.status === "success") {
      dispatch({
        type: ADS_CLICK_SUCCESS,
        payload: data,
      });
      // console.log(data);
    } else {
      dispatch({
        type: ADS_CLICK_FAIL,
        payload: data.message,
      });
    }
  } catch (data) {
    dispatch({
      type: ADS_CLICK_FAIL,
      payload: data.message,
    });
  }
};

//Get bitly click number
export const getBitlyCount = (links) => async (dispatch) => {
  try {
    dispatch({ type: BITLY_CLICK_REQUEST });

    const token = process.env.REACT_APP_BITLY_KEY;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = await axios.get(
      `https://api-ssl.bitly.com/v4/bitlinks/${links}/clicks/summary`,
      { headers: headers }
    );

    if (data.status === 200) {
      dispatch({
        type: BITLY_CLICK_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: BITLY_CLICK_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: BITLY_CLICK_FAIL,
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
