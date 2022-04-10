import {
  GET_ADMIN_SENDERID_REQUEST,
  GET_ADMIN_SENDERID_SUCCESS,
  GET_ADMIN_SENDERID_FAIL,
  CLEAR_ERRORS,
  UPDATE_ADMIN_SENDERID_REQUEST,
  UPDATE_ADMIN_SENDERID_SUCCESS,
  UPDATE_ADMIN_SENDERID_FAIL,
  UPDATE_ADMIN_SENDERID_RESET,
} from "../../../constants/senderIDConstants";

export const AdminSenderIDReducer = (state = { adminSenderID: [] }, action) => {
  switch (action.type) {
    case GET_ADMIN_SENDERID_REQUEST:
      return {
        loading: true,
      };

    case GET_ADMIN_SENDERID_SUCCESS:
      return {
        loading: false,
        adminSenderID: action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      };

    case GET_ADMIN_SENDERID_FAIL:
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

export const UpdateAdminSenderIDReducer = (state = { updateAdminSenderID: [] }, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_SENDERID_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_ADMIN_SENDERID_SUCCESS:
      return {
        loading: false,
        updateAdminSenderID: action.payload,
      };

    case UPDATE_ADMIN_SENDERID_FAIL:
      return {
        loading: false,
        updateError: action.payload,
      };

    case UPDATE_ADMIN_SENDERID_RESET:
      return {
        ...state,
        updateAdminSenderID: [],
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        updateError: null,
      };

    default:
      return state;
  }
};