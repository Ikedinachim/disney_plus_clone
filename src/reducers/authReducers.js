import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_RESET,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_RESET,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  UPDATE_INFLUENCER_PASSWORD_REQUEST,
  UPDATE_INFLUENCER_PASSWORD_SUCCESS,
  UPDATE_INFLUENCER_PASSWORD_RESET,
  UPDATE_INFLUENCER_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_RESET,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  NEW_PASSWORD_RESET,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_RESET,
  UPDATE_USER_FAIL,
  USER_PASSWORD_REQUEST,
  USER_PASSWORD_SUCCESS,
  USER_PASSWORD_RESET,
  USER_PASSWORD_FAIL,
  CONFIRM_USER_REQUEST,
  CONFIRM_USER_SUCCESS,
  CONFIRM_USER_FAIL,
  CONFIRM_USER_RESET,
  RESEND_VERIFICATION_REQUEST,
  RESEND_VERIFICATION_SUCCESS,
  RESEND_VERIFICATION_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_RESET,
  DELETE_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_INFLUENCER_PROFILE_REQUEST,
  UPDATE_INFLUENCER_PROFILE_SUCCESS,
  UPDATE_INFLUENCER_PROFILE_RESET,
  UPDATE_INFLUENCER_PROFILE_FAIL,
  UPDATE_INFLUENCER_COST_REQUEST,
  UPDATE_INFLUENCER_COST_SUCCESS,
  UPDATE_INFLUENCER_COST_RESET,
  UPDATE_INFLUENCER_COST_FAIL,
  CLEAR_ERRORS,
  UPDATE_INFLUENCER_PASSWORD_ACTIVE,
} from "../constants/authConstants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    // case UPDATE_INFLUENCER_PASSWORD_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     isAuthenticated: false,
    //     passwordUpdated: false,
    //   };

    case REGISTER_USER_REQUEST:
      return {
        loading: true,
        isRegistered: false,
      };

    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isRegistered: true,
      };
    // case UPDATE_INFLUENCER_PASSWORD_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     passwordUpdated: true,
    //     isUpdated: action.payload,
    //   };
    case REGISTER_USER_RESET:
      return {
        ...state,
        loading: false,
        isRegistered: false,
        isAuthenticated: false,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        // resetInfluencerPassword: action.payload,
      };

    // case UPDATE_INFLUENCER_PASSWORD_FAIL:
    //   return {
    //     loading: false,
    //     isAuthenticated: false,
    //     user: null,
    //     passwordUpdated: false,
    //     error: action.payload,
    //   };

    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        isRegistered: false,
        user: null,
        error: action.payload,
      };
    case LOGIN_RESET:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        isRegistered: false,
        user: null,
        error: null,
      };

    // case UPDATE_INFLUENCER_PASSWORD_RESET:
    //   return {
    //     ...state,
    //     loading: false,
    //     isAuthenticated: false,
    //     isUpdated: false,
    //     user: null,
    //     error: null,
    //   };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const resetInfluencerPasswordReducer = (
  state = { resetInfluencerPassword: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_INFLUENCER_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        passwordUpdated: false,
      };

    case UPDATE_INFLUENCER_PASSWORD_ACTIVE:
      return {
        // ...state,
        loading: false,
        toUpdatePasswrd: true,
        passwordUpdated: false,
        resetInfluencerPassword: action.payload,
      };

    case UPDATE_INFLUENCER_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        passwordUpdated: true,
        isUpdated: action.payload,
        resetInfluencerPassword: null,
      };

    case UPDATE_INFLUENCER_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        // resetInfluencerPassword: null,
        passwordUpdated: false,
        error: action.payload,
      };

    case UPDATE_INFLUENCER_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        isUpdated: false,
        resetInfluencerPassword: null,
        passwordUpdated: false,
        toUpdatePasswrd: false,
        error: null,
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

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case NEW_PASSWORD_REQUEST:
      return {
        loading: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };

    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case NEW_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case FORGOT_PASSWORD_RESET:
      return {
        ...state,
        message: [],
      };
    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const sendNewPasswordReducer = (state = { message: [] }, action) => {
  switch (action.type) {
    case NEW_PASSWORD_REQUEST:
      return {
        loading: true,
      };

    case NEW_PASSWORD_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };

    case NEW_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEW_PASSWORD_RESET:
      return {
        ...state,
        message: [],
      };
    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const confirmRegistrationReducer = (
  state = { confirmReg: [] },
  action
) => {
  switch (action.type) {
    case CONFIRM_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        confirmReg: action.payload,
      };
    case CONFIRM_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CONFIRM_USER_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        confirmReg: null,
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

export const resendVerificationReducer = (state = { resend: [] }, action) => {
  switch (action.type) {
    case RESEND_VERIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RESEND_VERIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        resend: action.payload,
      };
    case RESEND_VERIFICATION_FAIL:
      return {
        ...state,
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

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_USERS_FAIL:
      return {
        ...state,
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

const initialState = {
  loading: false,
  user: [],
  error: null,
  status: "",
};

export const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
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

export const updateUserReducer = (state = { updateUser: [] }, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        loading: true,
        updateUser: [],
      };
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        updateUser: action.payload,
        status: action.payload.status,
      };
    case UPDATE_USER_FAIL:
      return {
        loading: false,
        updateUser: null,
        error: action.payload,
        status: action.payload.status,
      };
    case UPDATE_USER_RESET:
      return {
        ...state,
        status: null,
        updateUser: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const updateUserPasswordReducer = (
  state = { updatePassword: [] },
  action
) => {
  switch (action.type) {
    case USER_PASSWORD_REQUEST:
      return {
        loading: true,
        updatePassword: [],
      };
    case USER_PASSWORD_SUCCESS:
      return {
        loading: false,
        updatePassword: action.payload,
        status: action.payload.status,
      };
    case USER_PASSWORD_FAIL:
      return {
        loading: false,
        updatePassword: [],
        error: action.payload,
        status: action.payload.status,
      };
    case USER_PASSWORD_RESET:
      return {
        ...state,
        updatePassword: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const updateInfluencerReducer = (
  state = { updateInfluencer: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_INFLUENCER_PROFILE_REQUEST:
      return {
        loading: true,
        updateInfluencer: [],
      };
    case UPDATE_INFLUENCER_PROFILE_SUCCESS:
      return {
        loading: false,
        updateInfluencer: action.payload,
        status: action.payload.status,
      };
    case UPDATE_INFLUENCER_PROFILE_FAIL:
      return {
        loading: false,
        updateInfluencer: null,
        error: action.payload,
        status: action.payload.status,
      };
    case UPDATE_INFLUENCER_PROFILE_RESET:
      return {
        ...state,
        status: null,
        updateInfluencer: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
export const updateInfluencerCostReducer = (
  state = { updateCosts: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_INFLUENCER_COST_REQUEST:
      return {
        loading: true,
        updateCosts: [],
      };
    case UPDATE_INFLUENCER_COST_SUCCESS:
      return {
        loading: false,
        updateCosts: action.payload,
        status: action.payload.status,
      };
    case UPDATE_INFLUENCER_COST_FAIL:
      return {
        loading: false,
        updateCosts: null,
        error: action.payload,
        status: action.payload.status,
      };
    case UPDATE_INFLUENCER_COST_RESET:
      return {
        ...state,
        status: null,
        updateCosts: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
