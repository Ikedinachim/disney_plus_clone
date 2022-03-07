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
  INFLUENCER_CAMPAIGN_REQUEST,
  INFLUENCER_CAMPAIGN_SUCCESS,
  INFLUENCER_CAMPAIGN_RESET,
  INFLUENCER_CAMPAIGN_FAIL,
  SHOW_ADS_REQUEST,
  SHOW_ADS_SUCCESS,
  SHOW_ADS_FAIL,
  SHOW_ADS_RESET,
  GET_ALL_INFLUENCERS_REQUEST,
  GET_ALL_INFLUENCERS_SUCCESS,
  GET_ALL_INFLUENCERS_FAIL,
  GET_SMS_CAMPAIGN_REQUEST,
  GET_SMS_CAMPAIGN_SUCCESS,
  GET_SMS_CAMPAIGN_FAIL,
  VIEW_FLIER_VIDEO_CAMPAIGN_REQUEST,
  VIEW_FLIER_VIDEO_CAMPAIGN_SUCCESS,
  VIEW_FLIER_VIDEO_CAMPAIGN_FAIL,
  VIEW_APP_DOWNLOAD_CAMPAIGN_REQUEST,
  VIEW_APP_DOWNLOAD_CAMPAIGN_SUCCESS,
  VIEW_APP_DOWNLOAD_CAMPAIGN_FAIL,
  GET_ALL_CAMPAIGN_REQUEST,
  GET_ALL_CAMPAIGN_SUCCESS,
  GET_ALL_CAMPAIGN_FAIL,
  GET_SINGLE_CAMPAIGN_REQUEST,
  GET_SINGLE_CAMPAIGN_SUCCESS,
  GET_SINGLE_CAMPAIGN_FAIL,
  GET_DIGITAL_CAMPAIGNS_REQUEST,
  GET_DIGITAL_CAMPAIGNS_SUCCESS,
  GET_DIGITAL_CAMPAIGNS_FAIL,
  GET_FILTERED_CONTACT_LIST_REQUEST,
  GET_FILTERED_CONTACT_LIST_SUCCESS,
  GET_FILTERED_CONTACT_LIST_FAIL,
  /////////////// INFLUENCER CONSTANTS ////////////
  GET_ALL_INFLUENCER_CAMPAIGN_REQUEST,
  GET_ALL_INFLUENCER_CAMPAIGN_SUCCESS,
  GET_ALL_INFLUENCER_CAMPAIGN_FAIL,
  UPDATE_INFLUENCER_CAMPAIGN_STATUS_REQUEST,
  UPDATE_INFLUENCER_CAMPAIGN_STATUS_SUCCESS,
  UPDATE_INFLUENCER_CAMPAIGN_STATUS_FAIL,
  UPDATE_INFLUENCER_CAMPAIGN_STATUS_RESET,
  UPDATE_INFLUENCER_PUBLISHED_STATUS_REQUEST,
  UPDATE_INFLUENCER_PUBLISHED_STATUS_SUCCESS,
  UPDATE_INFLUENCER_PUBLISHED_STATUS_FAIL,
  UPDATE_INFLUENCER_PUBLISHED_STATUS_RESET,
  GET_INFLUENCER_DETAILS_REQUEST,
  GET_INFLUENCER_DETAILS_SUCCESS,
  GET_INFLUENCER_DETAILS_FAIL,
  VIEW_SINGLE_APP_CAMPAIGN_REQUEST,
  VIEW_SINGLE_APP_CAMPAIGN_SUCCESS,
  VIEW_SINGLE_APP_CAMPAIGN_FAIL,
  VIEW_SINGLE_FLIER_CAMPAIGN_REQUEST,
  VIEW_SINGLE_FLIER_CAMPAIGN_SUCCESS,
  VIEW_SINGLE_FLIER_CAMPAIGN_FAIL,
  GET_SMS_SINGLE_CAMPAIGN_REQUEST,
  GET_SMS_SINGLE_CAMPAIGN_SUCCESS,
  GET_SMS_SINGLE_CAMPAIGN_FAIL,

  ////////////// GENERIC CONSTANTS ///////////////
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
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const createInfluencerCampaignReducer = (
  state = { createInfluencerCampaign: [] },
  action
) => {
  switch (action.type) {
    case INFLUENCER_CAMPAIGN_REQUEST:
      return {
        loading: true,
        createInfluencerCampaign: [],
      };

    case INFLUENCER_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        createInfluencerCampaign: action.payload,
      };
    case INFLUENCER_CAMPAIGN_FAIL:
      return {
        loading: false,
        createInfluencerCampaign: null,
        error: action.payload,
      };
    case INFLUENCER_CAMPAIGN_RESET:
      return {
        ...state,
        createInfluencerCampaign: [],
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
        smsCampaigns: action.payload.reverse(),
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
        viewFlierVideosCampaigns: action.payload.reverse(),
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
        viewAppDownloadCampaigns: action.payload.reverse(),
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

const initialState = {
  loading: false,
  allCampaign: [],
  reverseAllCampaign: [],
  error: null,
};
export const AllCampaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CAMPAIGN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        allCampaign: action.payload,
        reverseAllCampaign: action.payload.sort((a, b) =>
          a.createdAt > b.createdAt ? -1 : 1
        ),
      };
    case GET_ALL_CAMPAIGN_FAIL:
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

export const getSingleCampaignReducer = (
  state = { singleCampaign: [] },
  action
) => {
  switch (action.type) {
    case GET_SINGLE_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };

    case GET_SINGLE_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        singleCampaign: action.payload,
      };

    case GET_SINGLE_CAMPAIGN_FAIL:
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

/////////////////////////GET SINGLE CAMPAIGNS/////////////////////////
export const getSingleSmsCampaignReducer = (
  state = { singleSmsCampaign: [] },
  action
) => {
  switch (action.type) {
    case GET_SMS_SINGLE_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };

    case GET_SMS_SINGLE_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        singleSmsCampaign: action.payload,
      };

    case GET_SMS_SINGLE_CAMPAIGN_FAIL:
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

export const getSingleAppCampaignReducer = (
  state = { singleAppCampaign: [] },
  action
) => {
  switch (action.type) {
    case VIEW_SINGLE_APP_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };

    case VIEW_SINGLE_APP_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        singleAppCampaign: action.payload,
      };

    case VIEW_SINGLE_APP_CAMPAIGN_FAIL:
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

export const getSingleFlierCampaignReducer = (
  state = { singleFlierCampaign: [] },
  action
) => {
  switch (action.type) {
    case VIEW_SINGLE_FLIER_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };

    case VIEW_SINGLE_FLIER_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        singleFlierCampaign: action.payload.reverse(),
      };

    case VIEW_SINGLE_FLIER_CAMPAIGN_FAIL:
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
///////////////////////////////////////////////////////////
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

export const getAllInfluencersReducer = (
  state = { Influencers: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_INFLUENCERS_REQUEST:
      return {
        loading: true,
      };

    case GET_ALL_INFLUENCERS_SUCCESS:
      return {
        loading: false,
        Influencers: action.payload,
      };

    case GET_ALL_INFLUENCERS_FAIL:
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

/////////////////// INFLUENCER DASHBOARD REDUCER //////////////////

export const getAllInfluencerCampaignReducer = (
  state = { influencerCampaignList: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_INFLUENCER_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };

    case GET_ALL_INFLUENCER_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        influencerCampaignList: action.payload,
      };

    case GET_ALL_INFLUENCER_CAMPAIGN_FAIL:
      return {
        loading: false,
        influencerCampaignList: null,
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

export const updateInfluencerPublishedStatusReducer = (
  state = { updateInfluencerPublishedStatus: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_INFLUENCER_PUBLISHED_STATUS_REQUEST:
      return {
        publishLoading: true,
        updateInfluencerPublishedStatus: [],
      };

    case UPDATE_INFLUENCER_PUBLISHED_STATUS_SUCCESS:
      return {
        publishLoading: false,
        updateInfluencerPublishedStatus: action.payload,
      };
    case UPDATE_INFLUENCER_PUBLISHED_STATUS_FAIL:
      return {
        publishLoading: false,
        updateInfluencerPublishedStatus: null,
        publishError: action.payload,
      };
    case UPDATE_INFLUENCER_PUBLISHED_STATUS_RESET:
      return {
        ...state,
        updateInfluencerPublishedStatus: [],
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        publishError: null,
      };

    default:
      return state;
  }
};

export const updateInfluencerCampaignStatusReducer = (
  state = { updateInfluencerCampaignStatus: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_INFLUENCER_CAMPAIGN_STATUS_REQUEST:
      return {
        loading: true,
        updateInfluencerCampaignStatus: [],
      };

    case UPDATE_INFLUENCER_CAMPAIGN_STATUS_SUCCESS:
      return {
        loading: false,
        updateInfluencerCampaignStatus: action.payload,
      };
    case UPDATE_INFLUENCER_CAMPAIGN_STATUS_FAIL:
      return {
        loading: false,
        updateInfluencerCampaignStatus: null,
        error: action.payload,
      };
    case UPDATE_INFLUENCER_CAMPAIGN_STATUS_RESET:
      return {
        ...state,
        updateInfluencerCampaignStatus: [],
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

export const getInfluencerDetailsReducer = (
  state = { influencerDetails: [] },
  action
) => {
  switch (action.type) {
    case GET_INFLUENCER_DETAILS_REQUEST:
      return {
        idLoading: true,
      };

    case GET_INFLUENCER_DETAILS_SUCCESS:
      return {
        idLoading: false,
        influencerDetails: action.payload,
      };

    case GET_INFLUENCER_DETAILS_FAIL:
      return {
        idLoading: false,
        influencerDetails: null,
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

/////////////////////////////Digital Campaigns Reducer////////////////////////////
export const getDigitalCampaignsReducer = (
  state = { digitalCampaigns: [] },
  action
) => {
  switch (action.type) {
    case GET_DIGITAL_CAMPAIGNS_REQUEST:
      return {
        loading: true,
      };
    case GET_DIGITAL_CAMPAIGNS_SUCCESS:
      return {
        loading: false,
        digitalCampaigns: action.payload,
      };
    case GET_DIGITAL_CAMPAIGNS_FAIL:
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
