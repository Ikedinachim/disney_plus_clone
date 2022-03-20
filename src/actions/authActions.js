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
  UPDATE_USER_FAIL,
  UPDATE_INFLUENCER_PASSWORD_REQUEST,
  UPDATE_INFLUENCER_PASSWORD_SUCCESS,
  UPDATE_INFLUENCER_PASSWORD_FAIL,
  UPDATE_INFLUENCER_PROFILE_REQUEST,
  UPDATE_INFLUENCER_PROFILE_SUCCESS,
  // UPDATE_INFLUENCER_PROFILE_RESET,
  UPDATE_INFLUENCER_PROFILE_FAIL,
  UPDATE_INFLUENCER_COST_REQUEST,
  UPDATE_INFLUENCER_COST_SUCCESS,
  UPDATE_INFLUENCER_COST_FAIL,
  UPDATE_INFLUENCER_PASSWORD_ACTIVE,
  USER_PASSWORD_REQUEST,
  USER_PASSWORD_SUCCESS,
  CONFIRM_USER_REQUEST,
  CONFIRM_USER_SUCCESS,
  CONFIRM_USER_FAIL,
  RESEND_VERIFICATION_REQUEST,
  RESEND_VERIFICATION_SUCCESS,
  RESEND_VERIFICATION_FAIL,
  USER_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
} from "../constants/authConstants";


const baseURL = "https://mysogi.uat.com.ng/";

const axios = Axios.create({
  baseURL,
});

// Login
export const login = (username, password) => async (dispatch) => {
  try {
    // dispatch({ type: UPDATE_INFLUENCER_PASSWORD_RESET });
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

    // let tester = data;

    if (data.status === "success" && data.statusCode !== 102) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.data,
      });
    } else if (data.status === "success" && data.statusCode === 102) {
      dispatch({
        type: UPDATE_INFLUENCER_PASSWORD_ACTIVE,
        payload: data,
      });
      dispatch({
        type: LOGIN_FAIL,
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

//Update password
export const updateUserPassword = (payload) => async (dispatch) => {
  try {
    dispatch({ type: USER_PASSWORD_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "api/auth/change-password",
      payload,
      config
    );

    if (data.status === "success") {
      dispatch({
        type: USER_PASSWORD_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: USER_PASSWORD_FAIL,
        payload: data.message,
      });
    }
  } catch (data) {
    dispatch({
      type: USER_PASSWORD_FAIL,
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
      payload.profile,
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
  } catch (error) {
    dispatch({
      type: UPDATE_INFLUENCER_PROFILE_FAIL,
      payload: error.message,
    });
  }
};

//Update Influencer Cost
export const updateInfluencerCost = (payload) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_INFLUENCER_COST_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `api/campaign/influencer/${payload.id}/update-costs`,
      payload.updatedCosts,
      config
    );

    if (data.status === "success") {
      dispatch({
        type: UPDATE_INFLUENCER_COST_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: UPDATE_INFLUENCER_COST_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_INFLUENCER_COST_FAIL,
      payload: error.message,
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
      payload: data.error,
    });
  }
};

////////////////Forgot password/////////////

///send mail for reset via mail
export const sendPasswordResetLink = (params) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      email: params,
    };
    const data = await axios.put("api/auth/forgot-password", body, config);
    if (data.status === "success") {
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.message,
    });
  }
};

export const resendVerificationLink = (params) => async (dispatch) => {
  try {
    dispatch({ type: RESEND_VERIFICATION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      email: params,
    };
    const data = await axios.put("api/auth/forgot-password", body, config);
    if (data.status === "success") {
      dispatch({
        type: RESEND_VERIFICATION_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: RESEND_VERIFICATION_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: RESEND_VERIFICATION_FAIL,
      payload: error.message,
    });
  }
};

export const registrationConfirmation = (params) => async (dispatch) => {
  try {
    dispatch({ type: CONFIRM_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.put("api/auth/forgot-password", params, config);
    if (data.status === "success") {
      dispatch({
        type: CONFIRM_USER_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: CONFIRM_USER_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: CONFIRM_USER_FAIL,
      payload: error.message,
    });
  }
};

//////////set new password///////////
export const sendNewPassword = (params) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put("api/auth/reset-password", params, config);
    if (data.status === "success") {
      dispatch({
        type: NEW_PASSWORD_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: NEW_PASSWORD_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
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
