import Axios from "axios";

import {
  CREATE_STORE_REQUEST,
  CREATE_STORE_SUCCESS,
  CREATE_STORE_FAIL,
  GET_STORE_REQUEST,
  GET_STORE_SUCCESS,
  GET_STORE_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/ecommerceConstants";

const baseURL = process.env.REACT_APP_MYSOGI_BETA_URL;
const axios = Axios.create({
  baseURL,
});

// Create New Ecommerce Store Action
export const createStoreAction = (storeData, storeId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_STORE_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `store/create/${storeId}`,
      storeData,
      config
    );

    if (data.success) {
      dispatch({
        type: CREATE_STORE_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: CREATE_STORE_FAIL,
        payload: "Something went wrong!",
      });
    }
  } catch (data) {
    dispatch({
      type: CREATE_STORE_FAIL,
      payload: data.message,
    });
  }
};

// Create New Ecommerce Store Action
export const addNewProductAction =
  (productData, storeId) => async (dispatch) => {
    try {
      dispatch({ type: ADD_PRODUCT_REQUEST });
      let user = JSON.parse(sessionStorage.getItem("user"));
      const token = user.user.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `store/product/create/${storeId}/`,
        productData,
        config
      );

      if (data.success) {
        dispatch({
          type: ADD_PRODUCT_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: ADD_PRODUCT_FAIL,
          payload: "Something went wrong!",
        });
      }
    } catch (data) {
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload: data.message,
      });
    }
  };

// Get Store Data Action
export const getStoreDataAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_STORE_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`store/detail/${userId}/`, config);

    if (data.success) {
      dispatch({
        type: GET_STORE_SUCCESS,
        payload: data.store,
      });
    } else if (!data.store) {
      dispatch({
        type: GET_STORE_FAIL,
        payload: "Create Store to proceed",
      });
    } else {
      console.log(data);
      dispatch({
        type: GET_STORE_FAIL,
        payload: "Something went wrong!",
      });
    }
  } catch (data) {
    dispatch({
      type: GET_STORE_FAIL,
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
