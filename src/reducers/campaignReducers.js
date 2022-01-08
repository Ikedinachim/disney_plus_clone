import {
  SMS_CAMPAIGN_REQUEST,
  SMS_CAMPAIGN_SUCCESS,
  SMS_CAMPAIGN_RESET,
  SMS_CAMPAIGN_FAIL,
  VIDEO_FLIER_CAMPAIGN_REQUEST,
  VIDEO_FLIER_CAMPAIGN_SUCCESS,
  VIDEO_FLIER_CAMPAIGN_FAIL,
  VIDEO_FLIER_CAMPAIGN_RESET,
  APP_DOWNLOAD_CAMPAIGN_REQUEST,
  APP_DOWNLOAD_CAMPAIGN_SUCCESS,
  APP_DOWNLOAD_CAMPAIGN_RESET,
  APP_DOWNLOAD_CAMPAIGN_FAIL,
  SHOW_ADS_REQUEST,
  SHOW_ADS_SUCCESS,
  SHOW_ADS_FAIL,
  SHOW_ADS_RESET,
  GET_SMS_CAMPAIGN_REQUEST,
  GET_SMS_CAMPAIGN_SUCCESS,
  GET_SMS_CAMPAIGN_FAIL,
  VIEW_FLIER_VIDEO_CAMPAIGN_REQUEST,
  VIEW_FLIER_VIDEO_CAMPAIGN_SUCCESS,
  VIEW_FLIER_VIDEO_CAMPAIGN_FAIL,
  VIEW_APP_DOWNLOAD_CAMPAIGN_REQUEST,
  VIEW_APP_DOWNLOAD_CAMPAIGN_SUCCESS,
  VIEW_APP_DOWNLOAD_CAMPAIGN_FAIL,
  GET_FILTERED_CONTACT_LIST_REQUEST,
  GET_FILTERED_CONTACT_LIST_SUCCESS,
  GET_FILTERED_CONTACT_LIST_FAIL,
  CLEAR_ERRORS,
} from "../constants/campaignConstants";

export const createSmsCampaignReducer = (
  state = { createSmsCampaign: [] },
  action
) => {
  switch (action.type) {
    case SMS_CAMPAIGN_REQUEST:
      return {
        loading: true,
        createSmsCampaign: [],
      };

    case SMS_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        createSmsCampaign: action.payload,
      };
    case SMS_CAMPAIGN_RESET:
      return {
        ...state,
        createSmsCampaign: [],
      };
    case SMS_CAMPAIGN_FAIL:
      return {
        loading: false,
        createSmsCampaign: null,
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

export const createFlierVideoCampaignReducer = (
  state = { createFlierVideoCampaign: [] },
  action
) => {
  switch (action.type) {
    case VIDEO_FLIER_CAMPAIGN_REQUEST:
      return {
        loading: true,
        createFlierVideoCampaign: [],
      };

    case VIDEO_FLIER_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        createFlierVideoCampaign: action.payload,
      };
    case VIDEO_FLIER_CAMPAIGN_FAIL:
      return {
        loading: false,
        createFlierVideoCampaign: null,
        error: action.payload,
      };
    case VIDEO_FLIER_CAMPAIGN_RESET:
      return {
        ...state,
        createFlierVideoCampaign: [],
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

export const createAppDownloadCampaignReducer = (
  state = { createAppDownloadCampaign: [] },
  action
) => {
  switch (action.type) {
    case APP_DOWNLOAD_CAMPAIGN_REQUEST:
      return {
        loading: true,
        createAppDownloadCampaign: [],
      };

    case APP_DOWNLOAD_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        createAppDownloadCampaign: action.payload,
      };
    case APP_DOWNLOAD_CAMPAIGN_FAIL:
      return {
        loading: false,
        createAppDownloadCampaign: null,
        error: action.payload,
      };
    case APP_DOWNLOAD_CAMPAIGN_RESET:
      return {
        ...state,
        createAppDownloadCampaign: [],
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

export const getSmsCampaignsReducer = (
  state = { smsCampaigns: [] },
  action
) => {
  switch (action.type) {
    case GET_SMS_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };

    case GET_SMS_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        smsCampaigns: action.payload,
      };

    case GET_SMS_CAMPAIGN_FAIL:
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

export const viewFlierVideosCampaignsReducer = (
  state = { viewFlierVideosCampaigns: [] },
  action
) => {
  switch (action.type) {
    case VIEW_FLIER_VIDEO_CAMPAIGN_REQUEST:
      return {
        vfLoading: true,
      };

    case VIEW_FLIER_VIDEO_CAMPAIGN_SUCCESS:
      return {
        vfLoading: false,
        viewFlierVideosCampaigns: action.payload,
      };

    case VIEW_FLIER_VIDEO_CAMPAIGN_FAIL:
      return {
        vfLoading: false,
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

export const viewAppDownloadCampaignsReducer = (
  state = { viewAppDownloadCampaigns: [] },
  action
) => {
  switch (action.type) {
    case VIEW_APP_DOWNLOAD_CAMPAIGN_REQUEST:
      return {
        adLoading: true,
      };

    case VIEW_APP_DOWNLOAD_CAMPAIGN_SUCCESS:
      return {
        adLoading: false,
        viewAppDownloadCampaigns: action.payload,
      };

    case VIEW_APP_DOWNLOAD_CAMPAIGN_FAIL:
      return {
        adLoading: false,
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

export const getFilteredContactListReducer = (
  state = { filteredContactList: [] },
  action
) => {
  switch (action.type) {
    case GET_FILTERED_CONTACT_LIST_REQUEST:
      return {
        fcLoading: true,
      };

    case GET_FILTERED_CONTACT_LIST_SUCCESS:
      return {
        fcLoading: false,
        filteredContactList: action.payload,
      };

    case GET_FILTERED_CONTACT_LIST_FAIL:
      return {
        fcLoading: false,
        filteredContactList: null,
        fcError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        fcError: null,
      };

    default:
      return state;
  }
};

export const createShowAdsReducer = (state = { createShowAds: [] }, action) => {
  switch (action.type) {
    case SHOW_ADS_REQUEST:
      return {
        loading: true,
        createShowAds: [],
      };

    case SHOW_ADS_SUCCESS:
      return {
        loading: false,
        createShowAds: action.payload,
      };
    case SHOW_ADS_FAIL:
      return {
        loading: false,
        createShowAds: null,
        error: action.payload,
      };
    case SHOW_ADS_RESET:
      return {
        ...state,
        createShowAds: [],
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
