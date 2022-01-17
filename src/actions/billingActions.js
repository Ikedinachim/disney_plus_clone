import Axios from "axios";

import {
  GET_WALLET_REQUEST,
  GET_WALLET_SUCCESS,
  GET_WALLET_FAIL,
  GET_TRANSACTION_HISTORY_REQUEST,
  GET_TRANSACTION_HISTORY_SUCCESS,
  GET_TRANSACTION_HISTORY_FAIL,
  FUND_WALLET_REQUEST,
  FUND_WALLET_SUCCESS,
  FUND_WALLET_FAIL,
  CONFIRM_FUNDING_REQUEST,
  CONFIRM_FUNDING_SUCCESS,
  CONFIRM_FUNDING_FAIL,
  CLEAR_ERRORS,
  GET_ALL_CAMPAIGN_REQUEST,
  GET_ALL_CAMPAIGN_SUCCESS,
  GET_ALL_CAMPAIGN_FAIL,
} from "../constants/billingConstants";

const baseURL = "https://mysogi.uat.com.ng/";

const axios = Axios.create({
  baseURL,
});

// Get User Balance
export const getWallet = () => async (dispatch) => {
  try {
    dispatch({ type: GET_WALLET_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/payment/wallet", config);

    if (data.status === "success") {
      dispatch({
        type: GET_WALLET_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: GET_WALLET_FAIL,
        payload: data.message,
      });
    }

    console.log(data.data);
  } catch (error) {
    dispatch({
      type: GET_WALLET_FAIL,
      payload: error.message,
    });
  }
};

// Get User Transaction History
export const getTransactionHistory = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TRANSACTION_HISTORY_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "/api/payment/transaction-history",
      config
    );

    if (data.status === "success") {
      dispatch({
        type: GET_TRANSACTION_HISTORY_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: GET_TRANSACTION_HISTORY_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_WALLET_FAIL,
      payload: error.message,
    });
  }
};

// Fund Wallet
export const fundUserWallet = (amount) => async (dispatch) => {
  try {
    dispatch({ type: FUND_WALLET_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const [fundAcc] = await Promise.all([
      await axios.post("/api/payment/initiate-payment", amount, config),
    ]);

    const reference = fundAcc.data.data.reference;
    amount = fundAcc.data.data.amount;

    const confirmFund = await axios.post(
      "/api/payment/confirm-payment",
      { amount, reference },
      config
    );

    const data = confirmFund.data;

    if (data.status === "success") {
      dispatch({
        type: FUND_WALLET_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: FUND_WALLET_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: FUND_WALLET_FAIL,
      payload: error.message,
    });
  }
};

// Confirm Wallet Funding
export const confirmFunding = (amount, reference) => async (dispatch) => {
  try {
    dispatch({ type: CONFIRM_FUNDING_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "/api/payment/confirm-payment",
      amount,
      reference,
      config
    );

    if (data.status === "success") {
      dispatch({
        type: CONFIRM_FUNDING_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: CONFIRM_FUNDING_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: CONFIRM_FUNDING_FAIL,
      payload: error.message,
    });
  }
};

// Get all campaigns
export const getAllCampaign = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CAMPAIGN_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/campaign/all-campaign", config);

    if (data.status === "success") {
      dispatch({
        type: GET_ALL_CAMPAIGN_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_CAMPAIGN_FAIL,
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
