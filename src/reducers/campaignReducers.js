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
  ALL_USER_INFLUENCER_REQUEST,
  ALL_USER_INFLUENCER_SUCCESS,
  ALL_USER_INFLUENCER_FAIL,
  SINGLE_USER_INFLUENCER_REQUEST,
  SINGLE_USER_INFLUENCER_SUCCESS,
  SINGLE_USER_INFLUENCER_FAIL,
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
  GET_REVENUE_BAND_REQUEST,
  GET_REVENUE_BAND_SUCCESS,
  GET_REVENUE_BAND_FAIL,

  /////////////// BILLBOARD CONSTANTS ////////////
  BILLBOARD_CAMPAIGN_REQUEST,
  BILLBOARD_CAMPAIGN_SUCCESS,
  BILLBOARD_CAMPAIGN_RESET,
  BILLBOARD_CAMPAIGN_FAIL,
  GET_ALL_BILLBOARD_CAMPAIGN_REQUEST,
  GET_ALL_BILLBOARD_CAMPAIGN_SUCCESS,
  GET_ALL_BILLBOARD_CAMPAIGN_FAIL,
  GET_ALL_BILLBOARD_REQUEST,
  GET_ALL_BILLBOARD_SUCCESS,
  GET_ALL_BILLBOARD_FAIL,
  GET_SINGLE_BILLBOARD_CAMPAIGN_REQUEST,
  GET_SINGLE_BILLBOARD_CAMPAIGN_SUCCESS,
  GET_SINGLE_BILLBOARD_CAMPAIGN_FAIL,
  UPDATE_BILLBOARD_CAMPAIGN_STATUS_REQUEST,
  UPDATE_BILLBOARD_CAMPAIGN_STATUS_SUCCESS,
  UPDATE_BILLBOARD_CAMPAIGN_STATUS_FAIL,
  UPDATE_BILLBOARD_CAMPAIGN_STATUS_RESET,
  UPDATE_BILLBOARD_PUBLISHED_STATUS_REQUEST,
  UPDATE_BILLBOARD_PUBLISHED_STATUS_SUCCESS,
  UPDATE_BILLBOARD_PUBLISHED_STATUS_FAIL,
  UPDATE_BILLBOARD_PUBLISHED_STATUS_RESET,
  ///DASHBOARD//////
  GET_ALL_BILBOARD_PROVIDER_CAMPAIGN_REQUEST,
  GET_ALL_BILBOARD_PROVIDER_CAMPAIGN_SUCCESS,
  GET_ALL_BILBOARD_PROVIDER_CAMPAIGN_FAIL,

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
        smsCampaigns: action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
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
        viewFlierVideosCampaigns: action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
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
        viewAppDownloadCampaigns: action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
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
        reverseAllCampaign: action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
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
        singleFlierCampaign: action.payload,
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
        ...state,
        fcLoading: true,
      };

    case GET_FILTERED_CONTACT_LIST_SUCCESS:
      return {
        fcLoading: false,
        filteredContactList: action.payload,
      };

    case GET_FILTERED_CONTACT_LIST_FAIL:
      return {
        ...state,
        fcLoading: false,
        // filteredContactList: null,
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

export const getRevenueBandReducer = (state = { revenueBand: [] }, action) => {
  switch (action.type) {
    case GET_REVENUE_BAND_REQUEST:
      return {
        loading: true,
      };

    case GET_REVENUE_BAND_SUCCESS:
      return {
        loading: false,
        revenueBand: action.payload,
      };

    case GET_REVENUE_BAND_FAIL:
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

export const allUserInfluencerCampaignReducer = (
  state = { allUserInfluencer: [] },
  action
) => {
  switch (action.type) {
    case ALL_USER_INFLUENCER_REQUEST:
      return {
        loading: true,
        allUserInfluencer: [],
      };
    case ALL_USER_INFLUENCER_SUCCESS:
      return {
        loading: false,
        allUserInfluencer: action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      };
    case ALL_USER_INFLUENCER_FAIL:
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

export const singleUserInfluencerReducer = (
  state = { singleUserInfluencer: [] },
  action
) => {
  switch (action.type) {
    case SINGLE_USER_INFLUENCER_REQUEST:
      return {
        loading: true,
        singleUserInfluencer: [],
      };
    case SINGLE_USER_INFLUENCER_SUCCESS:
      return {
        loading: false,
        singleUserInfluencer: action.payload,
      };
    case SINGLE_USER_INFLUENCER_FAIL:
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

/////////////////// BILLBOARD DASHBOARD REDUCER //////////////////
export const createBillBoardCampaignReducer = (
  state = { createBillBoardCampaign: [] },
  action
) => {
  switch (action.type) {
    case BILLBOARD_CAMPAIGN_REQUEST:
      return {
        loading: true,
        createBillBoardCampaign: [],
      };

    case BILLBOARD_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        createBillBoardCampaign: action.payload,
      };
    case BILLBOARD_CAMPAIGN_FAIL:
      return {
        loading: false,
        createBillBoardCampaign: null,
        error: action.payload,
      };
    case BILLBOARD_CAMPAIGN_RESET:
      return {
        ...state,
        createBillBoardCampaign: [],
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

export const getAllBillBoardCampaignReducer = (
  state = { billBoardCampaigns: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_BILLBOARD_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };

    case GET_ALL_BILLBOARD_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        billBoardCampaigns: action.payload,
      };

    case GET_ALL_BILLBOARD_CAMPAIGN_FAIL:
      return {
        loading: false,
        billBoardCampaigns: null,
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
export const getAllBillBoardReducer = (
  state = { allBillBoard: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_BILLBOARD_REQUEST:
      return {
        loading: true,
      };

    case GET_ALL_BILLBOARD_SUCCESS:
      return {
        loading: false,
        allBillBoard: action.payload,
      };

    case GET_ALL_BILLBOARD_FAIL:
      return {
        loading: false,
        allBillBoard: null,
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
export const getSingleBillBoardCampaignReducer = (
  state = { singleBillBoardCampaign: [] },
  action
) => {
  switch (action.type) {
    case GET_SINGLE_BILLBOARD_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };

    case GET_SINGLE_BILLBOARD_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        singleBillBoardCampaign: action.payload,
      };

    case GET_SINGLE_BILLBOARD_CAMPAIGN_FAIL:
      return {
        loading: false,
        singleBillBoardCampaign: null,
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

export const getAllBillboardProviderCampaignReducer = (
  state = { providerCampaignList: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_BILBOARD_PROVIDER_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };

    case GET_ALL_BILBOARD_PROVIDER_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        providerCampaignList: action.payload,
      };

    case GET_ALL_BILBOARD_PROVIDER_CAMPAIGN_FAIL:
      return {
        loading: false,
        providerCampaignList: null,
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

export const updateBillboardCampaignStatusReducer = (
  state = { updateBillboardCampaignStatus: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_BILLBOARD_CAMPAIGN_STATUS_REQUEST:
      return {
        loading: true,
        updateBillboardCampaignStatus: [],
      };

    case UPDATE_BILLBOARD_CAMPAIGN_STATUS_SUCCESS:
      return {
        loading: false,
        updateBillboardCampaignStatus: action.payload,
      };
    case UPDATE_BILLBOARD_CAMPAIGN_STATUS_FAIL:
      return {
        loading: false,
        updateBillboardCampaignStatus: null,
        error: action.payload,
      };
    case UPDATE_BILLBOARD_CAMPAIGN_STATUS_RESET:
      return {
        ...state,
        updateBillboardCampaignStatus: [],
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

export const updateBillboardPublishedStatusReducer = (
  state = { updateBillboardPublishedStatus: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_BILLBOARD_PUBLISHED_STATUS_REQUEST:
      return {
        publishLoading: true,
        updateBillboardPublishedStatus: [],
      };

    case UPDATE_BILLBOARD_PUBLISHED_STATUS_SUCCESS:
      return {
        publishLoading: false,
        updateBillboardPublishedStatus: action.payload,
      };
    case UPDATE_BILLBOARD_PUBLISHED_STATUS_FAIL:
      return {
        publishLoading: false,
        updateBillboardPublishedStatus: null,
        publishError: action.payload,
      };
    case UPDATE_BILLBOARD_PUBLISHED_STATUS_RESET:
      return {
        ...state,
        updateBillboardPublishedStatus: [],
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
        digitalCampaigns: action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
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
