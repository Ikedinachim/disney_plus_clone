import {
  PROPELLER_CAMPAIGN_REQUEST,
  PROPELLER_CAMPAIGN_SUCCESS,
  PROPELLER_CAMPAIGN_FAIL,
  PROPELLER_OS_CAMPAIGN_REQUEST,
  PROPELLER_OS_CAMPAIGN_SUCCESS,
  PROPELLER_OS_CAMPAIGN_FAIL,
  PROPELLER_MOBILE_REQUEST,
  PROPELLER_MOBILE_SUCCESS,
  PROPELLER_MOBILE_FAIL,
  CAMPAIGN_DATE_REQUEST,
  CAMPAIGN_DATE_SUCCESS,
  CAMPAIGN_DATE_FAIL,
  CLEAR_ERRORS,
} from "../constants/analyticsConstants";

/////Statistics details (impression, click, conversions)/////
export const getPropellerCampaignsReducer = (
  state = { propellerCampaigns: [] },
  action
) => {
  switch (action.type) {
    case PROPELLER_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };

    case PROPELLER_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        propellerCampaigns: action.payload,
      };

    case PROPELLER_CAMPAIGN_FAIL:
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

/////Statistics details (impression, click, conversions)/////
export const getCampaignByDateReducer = (
  state = { dateCampaigns: [] },
  action
) => {
  switch (action.type) {
    case CAMPAIGN_DATE_REQUEST:
      return {
        loading: true,
      };

    case CAMPAIGN_DATE_SUCCESS:
      return {
        loading: false,
        dateCampaigns: action.payload,
      };

    case CAMPAIGN_DATE_FAIL:
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

/////OS Campaign details////////
export const getOsCampaignsReducer = (state = { OsCampaigns: [] }, action) => {
  switch (action.type) {
    case PROPELLER_OS_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };

    case PROPELLER_OS_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        OsCampaigns: action.payload,
      };

    case PROPELLER_OS_CAMPAIGN_FAIL:
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

////Mobile Campaign details////
export const getMobileCampaignsReducer = (
  state = { mobileCampaigns: [] },
  action
) => {
  switch (action.type) {
    case PROPELLER_MOBILE_REQUEST:
      return {
        loading: true,
      };

    case PROPELLER_MOBILE_SUCCESS:
      return {
        loading: false,
        mobileCampaigns: action.payload,
      };

    case PROPELLER_MOBILE_FAIL:
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
