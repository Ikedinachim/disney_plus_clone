import {
  CREATE_STORE_REQUEST,
  CREATE_STORE_SUCCESS,
  CREATE_STORE_RESET,
  CREATE_STORE_FAIL,
  EDIT_STORE_REQUEST,
  EDIT_STORE_SUCCESS,
  EDIT_STORE_RESET,
  EDIT_STORE_FAIL,
  GET_STORE_REQUEST,
  GET_STORE_SUCCESS,
  GET_STORE_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_RESET,
  ADD_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_RESET,
  EDIT_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/ecommerceConstants";

export const storeReducer = (state = { store: {} }, action) => {
  switch (action.type) {
    case CREATE_STORE_REQUEST:
    case EDIT_PRODUCT_REQUEST:
    case GET_STORE_REQUEST:
    case ADD_PRODUCT_REQUEST:
    case EDIT_STORE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        createStore: action.payload,
      };
    case EDIT_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        editStore: action.payload,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        addProduct: action.payload,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        editProduct: action.payload,
      };
    case GET_STORE_SUCCESS:
      return {
        loading: false,
        store: action.payload,
      };
    case CREATE_STORE_FAIL:
    case EDIT_STORE_FAIL:
      return {
        ...state,
        loading: false,
        createStore: null,
        editStore: null,
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
    case EDIT_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        addProduct: null,
        editProduct: null,
        error: action.payload,
      };
    case CREATE_STORE_RESET:
    case EDIT_STORE_RESET:
      return {
        ...state,
        createStore: null,
        editStore: null,
      };
    case ADD_PRODUCT_RESET:
      return {
        ...state,
        addProduct: null,
      };
    case EDIT_PRODUCT_RESET:
      return {
        ...state,
        editProduct: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
        createStore: null,
        editStore: null,
        addProduct: null,
        editProduct: null,
      };

    default:
      return state;
  }
};
