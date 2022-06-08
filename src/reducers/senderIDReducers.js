import {
  GET_SENDERID_REQUEST,
  GET_SENDERID_SUCCESS,
  GET_SENDERID_FAIL,
  GET_DEFAULT_SENDERID_REQUEST,
  GET_DEFAULT_SENDERID_SUCCESS,
  GET_DEFAULT_SENDERID_FAIL,
  CREATE_SENDERID_REQUEST,
  CREATE_SENDERID_SUCCESS,
  CREATE_SENDERID_RESET,
  CREATE_SENDERID_FAIL,
  CLEAR_ERRORS,
  GET_GENERAL_REQUEST,
  GET_GENERAL_FAIL,
  GET_GENERAL_SUCCESS,
} from "../constants/senderIDConstants";

export const defaultSenderIDReducer = (
  state = { defaultSenderID: [] },
  action
) => {
  switch (action.type) {
    case GET_DEFAULT_SENDERID_REQUEST:
      return {
        loading: true,
      };

    case GET_DEFAULT_SENDERID_SUCCESS:
      return {
        loading: false,
        defaultSenderID: action.payload,
      };

    case GET_DEFAULT_SENDERID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const generalSenderReducer = (state = { generalSender: [] }, action) => {
  switch (action.type) {
    case GET_GENERAL_REQUEST:
      return {
        loading: true,
        // senderID: []
      };

    case GET_GENERAL_SUCCESS:
      return {
        loading: false,
        generalSender: action.payload,
      };

    case GET_GENERAL_FAIL:
      return {
        loading: false,
        generalSender: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const senderIDReducer = (state = { senderID: [] }, action) => {
  switch (action.type) {
    case GET_SENDERID_REQUEST:
      return {
        loading: true,
        // senderID: []
      };

    case GET_SENDERID_SUCCESS:
      return {
        loading: false,
        senderID: action.payload,
      };

    case GET_SENDERID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const createSenderIdReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SENDERID_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_SENDERID_SUCCESS:
      return {
        loading: true,
        status: action.payload,
      };
    case CREATE_SENDERID_RESET:
      return {
        loading: false,
        status: null,
      };

    case CREATE_SENDERID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
