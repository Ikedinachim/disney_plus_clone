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
  CLEAR_ERRORS,
  CAMPAIGN_DATE_REQUEST,
  CAMPAIGN_DATE_SUCCESS,
  CAMPAIGN_DATE_FAIL,
  BITLY_CLICK_REQUEST,
  BITLY_CLICK_SUCCESS,
  BITLY_CLICK_FAIL,
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

//Get bitly click number
export const getBitlyCount = (links) => async (dispatch) => {
  try {
    dispatch({ type: BITLY_CLICK_REQUEST });

    const token = "4695c38c4bca19ec51a931b8a12209ea8ec489bf";

    const link = links.split("//").pop();
    const config = {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      "Content-type": "application/json",
    };

    const { data } = await axios.get(
      `https://api-ssl.bitly.com/v4/bitlinks/${link}/clicks/summary`,
      config
    );

    if (data.status === 200) {
      dispatch({
        type: BITLY_CLICK_SUCCESS,
        payload: data,
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
