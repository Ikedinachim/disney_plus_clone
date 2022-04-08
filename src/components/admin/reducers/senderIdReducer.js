import {
  GET_ADMIN_SENDERID_REQUEST,
  GET_ADMIN_SENDERID_SUCCESS,
  GET_ADMIN_SENDERID_FAIL,
  CLEAR_ERRORS
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