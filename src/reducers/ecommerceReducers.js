import {
  CREATE_STORE_REQUEST,
  CREATE_STORE_SUCCESS,
  CREATE_STORE_RESET,
  CREATE_STORE_FAIL,
  GET_STORE_REQUEST,
  GET_STORE_SUCCESS,
  GET_STORE_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_RESET,
  ADD_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/ecommerceConstants";

export const storeReducer = (state = { store: {} }, action) => {
  switch (action.type) {
    case CREATE_STORE_REQUEST:
    case GET_STORE_REQUEST:
    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_STORE_SUCCESS:
      return {
        loading: false,
        createStore: action.payload,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        loading: false,
        addProduct: action.payload,
      };
    case GET_STORE_SUCCESS:
      return {
        loading: false,
        store: action.payload,
      };
    case CREATE_STORE_FAIL:
      return {
        ...state,
        loading: false,
        createStore: null,
        error: action.payload,
      };
    case GET_STORE_FAIL:
      return {
        ...state,
        loading: false,
        store: null,
        error: action.payload,
      };
    case ADD_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        addProduct: null,
        error: action.payload,
      };
    case CREATE_STORE_RESET:
      return {
        ...state,
        createStore: null,
      };
    case ADD_PRODUCT_RESET:
      return {
        ...state,
        addProduct: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
        createStore: null,
        addProduct: null,
      };

    default:
      return state;
  }
};
