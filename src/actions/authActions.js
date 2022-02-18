import Axios from "axios";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_RESET,
  UPDATE_USER_FAIL,
  UPDATE_INFLUENCER_PASSWORD_REQUEST,
  UPDATE_INFLUENCER_PASSWORD_RESET,
  UPDATE_INFLUENCER_PASSWORD_SUCCESS,
  UPDATE_INFLUENCER_PASSWORD_FAIL,
  UPDATE_INFLUENCER_PROFILE_REQUEST,
  UPDATE_INFLUENCER_PROFILE_SUCCESS,
  UPDATE_INFLUENCER_PROFILE_RESET,
  UPDATE_INFLUENCER_PROFILE_FAIL,
} from "../constants/authConstants";
import { INFLUENCER_CAMPAIGN_REQUEST } from "../constants/campaignConstants";

const baseURL = "https://mysogi.uat.com.ng/";

const axios = Axios.create({
  baseURL,
});

// Login
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "api/auth/login",
      { username, password },
      config
    );
    sessionStorage.setItem("user", JSON.stringify(data.data));

    let tester = data;
    console.log(tester);

    if (data.status === "success" && data.statusCode !== 102) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.data,
      });
    } else if (data.status === "success" && data.statusCode === 102) {
      dispatch({
        type: UPDATE_INFLUENCER_PASSWORD_RESET,
        payload: data,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.data,
    });
  }
};

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("api/auth/register", userData, config);
    sessionStorage.setItem("user", JSON.stringify(data.data));

    if (data.status === "success") {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: data.message,
      });
    }
  } catch (data) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: data.message,
    });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    dispatch({
      type: USER_LOGOUT,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get User
export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/user/get-user", config);

    if (data.status === "success") {
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

//Update user
export const updateUserDetails = (payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "api/auth/update-profile",
      payload,
      config
    );

    if (data.status === "success") {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: data.message,
      });
    }
  } catch (data) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: data.message,
    });
  }
};

//Update Influencer Profile
export const updateInfluencerProfile = (payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_INFLUENCER_PROFILE_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "api/auth/update-profile",
      payload,
      config
    );

    if (data.status === "success") {
      dispatch({
        type: UPDATE_INFLUENCER_PROFILE_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: UPDATE_INFLUENCER_PROFILE_FAIL,
        payload: data.message,
      });
    }
  } catch (data) {
    dispatch({
      type: UPDATE_INFLUENCER_PROFILE_FAIL,
      payload: data.message,
    });
  }
};

// Update Influencer Password
export const updateInfluencerPassword = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_INFLUENCER_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "api/auth/change-password",
      userData,
      config
    );

    if (data.status === "success") {
      dispatch({
        type: UPDATE_INFLUENCER_PASSWORD_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: UPDATE_INFLUENCER_PASSWORD_FAIL,
        payload: data,
      });
    }
  } catch (data) {
    dispatch({
      type: UPDATE_INFLUENCER_PASSWORD_FAIL,
      payload: data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
