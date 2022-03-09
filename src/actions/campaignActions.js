import Axios from "axios";

import {
  SMS_CAMPAIGN_REQUEST,
  SMS_CAMPAIGN_SUCCESS,
  SMS_CAMPAIGN_FAIL,
  VIDEO_FLIER_CAMPAIGN_REQUEST,
  VIDEO_FLIER_CAMPAIGN_SUCCESS,
  VIDEO_FLIER_CAMPAIGN_FAIL,
  APP_DOWNLOAD_CAMPAIGN_REQUEST,
  APP_DOWNLOAD_CAMPAIGN_SUCCESS,
  APP_DOWNLOAD_CAMPAIGN_FAIL,
  SHOW_ADS_REQUEST,
  SHOW_ADS_SUCCESS,
  SHOW_ADS_FAIL,
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
  GET_SINGLE_CAMPAIGN_REQUEST,
  GET_SINGLE_CAMPAIGN_SUCCESS,
  GET_SINGLE_CAMPAIGN_FAIL,
  GET_ALL_CAMPAIGN_REQUEST,
  GET_ALL_CAMPAIGN_SUCCESS,
  GET_ALL_CAMPAIGN_FAIL,
  INFLUENCER_CAMPAIGN_REQUEST,
  INFLUENCER_CAMPAIGN_SUCCESS,
  INFLUENCER_CAMPAIGN_FAIL,
  GET_FILTERED_CONTACT_LIST_REQUEST,
  GET_FILTERED_CONTACT_LIST_SUCCESS,
  GET_FILTERED_CONTACT_LIST_FAIL,

  ///////////SINGLE CAMAPIGNS CONSTANTS /////////
  VIEW_SINGLE_APP_CAMPAIGN_REQUEST,
  VIEW_SINGLE_APP_CAMPAIGN_SUCCESS,
  VIEW_SINGLE_APP_CAMPAIGN_FAIL,
  VIEW_SINGLE_FLIER_CAMPAIGN_REQUEST,
  VIEW_SINGLE_FLIER_CAMPAIGN_SUCCESS,
  VIEW_SINGLE_FLIER_CAMPAIGN_FAIL,
  GET_SMS_SINGLE_CAMPAIGN_REQUEST,
  GET_SMS_SINGLE_CAMPAIGN_SUCCESS,
  GET_SMS_SINGLE_CAMPAIGN_FAIL,
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
  UPDATE_INFLUENCER_PUBLISHED_STATUS_REQUEST,
  UPDATE_INFLUENCER_PUBLISHED_STATUS_SUCCESS,
  UPDATE_INFLUENCER_PUBLISHED_STATUS_FAIL,
  GET_INFLUENCER_DETAILS_REQUEST,
  GET_INFLUENCER_DETAILS_SUCCESS,
  GET_INFLUENCER_DETAILS_FAIL,
  ALL_USER_INFLUENCER_REQUEST,
  ALL_USER_INFLUENCER_SUCCESS,
  ALL_USER_INFLUENCER_FAIL,

  ////////////// GENERIC CONSTANTS ///////////////
  CLEAR_ERRORS,
  GET_DIGITAL_CAMPAIGNS_REQUEST,
  GET_DIGITAL_CAMPAIGNS_SUCCESS,
  GET_DIGITAL_CAMPAIGNS_FAIL,
} from "../constants/campaignConstants";

const baseURL = "https://mysogi.uat.com.ng/";

const axios = Axios.create({
  baseURL,
});

// Create SMS Campaign Action
export const createSmsCampaignAction =
  (smsCampaignData) => async (dispatch) => {
    try {
      dispatch({ type: SMS_CAMPAIGN_REQUEST });
      let user = JSON.parse(sessionStorage.getItem("user"));
      const token = user.user.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "api/campaign/create-campaign",
        smsCampaignData,
        config
      );

      if (data.status === "success") {
        dispatch({
          type: SMS_CAMPAIGN_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: SMS_CAMPAIGN_FAIL,
          payload: data.message,
        });
      }
    } catch (data) {
      dispatch({
        type: SMS_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  };

// Create Flier and Video Campaign Action
export const createFlierVideoCampaignAction =
  (flierVideoCampaignData) => async (dispatch) => {
    try {
      dispatch({ type: VIDEO_FLIER_CAMPAIGN_REQUEST });
      let user = JSON.parse(sessionStorage.getItem("user"));
      const token = user.user.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "api/campaign/create-flier-video-campaign",
        flierVideoCampaignData,
        config
      );

      if (data.status === "success") {
        dispatch({
          type: VIDEO_FLIER_CAMPAIGN_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: VIDEO_FLIER_CAMPAIGN_FAIL,
          payload: data.message,
        });
      }
    } catch (data) {
      dispatch({
        type: VIDEO_FLIER_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  };

// Create App Download Campaign Action
export const createAppDownloadCampaignAction =
  (appDownloadCampaignData) => async (dispatch) => {
    try {
      dispatch({ type: APP_DOWNLOAD_CAMPAIGN_REQUEST });
      let user = JSON.parse(sessionStorage.getItem("user"));
      const token = user.user.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "api/campaign/create-app-download",
        appDownloadCampaignData,
        config
      );

      if (data.status === "success") {
        dispatch({
          type: APP_DOWNLOAD_CAMPAIGN_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: APP_DOWNLOAD_CAMPAIGN_FAIL,
          payload: data.message,
        });
      }
    } catch (data) {
      dispatch({
        type: APP_DOWNLOAD_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  };

// Get SMS Campaigns
export const getSmsCampaigns = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SMS_CAMPAIGN_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/campaign/all-campaign/`, config);

    if (data.status === "success") {
      dispatch({
        type: GET_SMS_CAMPAIGN_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: GET_SMS_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_SMS_CAMPAIGN_FAIL,
      payload: error.message,
    });
  }
};
// Get Single SMS Campaigns
export const getSingleSmsCampaigns = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SMS_SINGLE_CAMPAIGN_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `/api/campaign/single-campaign/${id}`,
      config
    );

    if (data.status === "success") {
      dispatch({
        type: GET_SMS_SINGLE_CAMPAIGN_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: GET_SMS_SINGLE_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_SMS_SINGLE_CAMPAIGN_FAIL,
      payload: error.message,
    });
  }
};

// Get all campaigns
export const getAllCampaign = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CAMPAIGN_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "/api/campaign/all-generic-campaign",
      config
    );
    if (data.statusCode === 100) {
      dispatch({
        type: GET_ALL_CAMPAIGN_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_CAMPAIGN_FAIL,
      payload: error.message,
    });
  }
};

// Display Single Campaign
export const displaySingleCampaign = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_CAMPAIGN_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `/api/campaign/single-generic-campaign/${id}`,
      config
    );
    // console.log({ data });

    if (data.status === "success") {
      dispatch({
        type: GET_SINGLE_CAMPAIGN_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: GET_SINGLE_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CAMPAIGN_FAIL,
      payload: error.message,
    });
  }
};

// Get all Flier/Video Campaigns
export const getViewFlierVideosCampaigns = () => async (dispatch) => {
  try {
    dispatch({ type: VIEW_FLIER_VIDEO_CAMPAIGN_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "/api/campaign/all-flier-campaign",
      config
    );

    if (data.status === "success") {
      dispatch({
        type: VIEW_FLIER_VIDEO_CAMPAIGN_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: VIEW_FLIER_VIDEO_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: VIEW_FLIER_VIDEO_CAMPAIGN_FAIL,
      payload: error.message,
    });
  }
};

// Get single Flier/Video Campaigns
export const getSingleFlierVideosCampaigns = (id) => async (dispatch) => {
  try {
    dispatch({ type: VIEW_SINGLE_FLIER_CAMPAIGN_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `/api/campaign/single-flier-campaign/${id}`,
      config
    );

    if (data.status === "success") {
      dispatch({
        type: VIEW_SINGLE_FLIER_CAMPAIGN_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: VIEW_SINGLE_FLIER_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: VIEW_SINGLE_FLIER_CAMPAIGN_FAIL,
      payload: error.message,
    });
  }
};

// Get App Download Campaigns
export const getAppDownloadCampaigns = () => async (dispatch) => {
  try {
    dispatch({ type: VIEW_APP_DOWNLOAD_CAMPAIGN_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "/api/campaign/all-app-download-campaign",
      config
    );

    if (data.status === "success") {
      console.log("app download");
      dispatch({
        type: VIEW_APP_DOWNLOAD_CAMPAIGN_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: VIEW_APP_DOWNLOAD_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: VIEW_APP_DOWNLOAD_CAMPAIGN_FAIL,
      payload: error.message,
    });
  }
};

// Get Single App Download Campaign
export const getSingleAppDownloadCampaigns = (id) => async (dispatch) => {
  try {
    dispatch({ type: VIEW_SINGLE_APP_CAMPAIGN_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `/api/campaign/single-app-download-campaign/${id}`,
      config
    );

    if (data.status === "success") {
      console.log("app download");
      dispatch({
        type: VIEW_SINGLE_APP_CAMPAIGN_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: VIEW_SINGLE_APP_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: VIEW_SINGLE_APP_CAMPAIGN_FAIL,
      payload: error.message,
    });
  }
};

// Create Influencer Campaign Action
export const createInfluencerCampaignAction =
  (influencerCampaignData) => async (dispatch) => {
    try {
      dispatch({ type: INFLUENCER_CAMPAIGN_REQUEST });
      let user = JSON.parse(sessionStorage.getItem("user"));
      const token = user.user.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "api/campaign/influencer/create-marketing-campaign",
        influencerCampaignData,
        config
      );

      if (data.status === "success") {
        dispatch({
          type: INFLUENCER_CAMPAIGN_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: INFLUENCER_CAMPAIGN_FAIL,
          payload: data.message,
        });
      }
    } catch (data) {
      dispatch({
        type: INFLUENCER_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  };

// Get Filtered Contact List
export const getFilteredContactList =
  (filterContactData) => async (dispatch) => {
    try {
      dispatch({ type: GET_FILTERED_CONTACT_LIST_REQUEST });
      let user = JSON.parse(sessionStorage.getItem("user"));
      const token = user.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "/api/campaign/filter-database",
        filterContactData,
        config
      );

      if (data.status === "success") {
        dispatch({
          type: GET_FILTERED_CONTACT_LIST_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: GET_FILTERED_CONTACT_LIST_FAIL,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_FILTERED_CONTACT_LIST_FAIL,
        payload: error.message,
      });
    }
  };

// Get All Influencers
export const getAllInfluencers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_INFLUENCERS_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "/api/campaign/influencer/all-influencers",
      config
    );

    if (data.status === "success") {
      dispatch({
        type: GET_ALL_INFLUENCERS_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_INFLUENCERS_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_INFLUENCERS_FAIL,
      payload: error.message,
    });
  }
};

//Get all influencers for particular user
export const getAllUserInfluencers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_INFLUENCER_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "/api/campaign/influencer/list-user-infleuncer-campaign",
      config
    );

    if (data.status === "success") {
      dispatch({
        type: ALL_USER_INFLUENCER_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: ALL_USER_INFLUENCER_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: ALL_USER_INFLUENCER_FAIL,
      payload: error.message,
    });
  }
};
export const getSingleUserInfluencers = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_USER_INFLUENCER_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      campaignId: id,
    };

    const { data } = await axios.get(
      "/api/campaign/influencer/single-user-influencer-campaign",
      config,
      body
    );

    if (data.status === "success") {
      dispatch({
        type: SINGLE_USER_INFLUENCER_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: SINGLE_USER_INFLUENCER_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: SINGLE_USER_INFLUENCER_FAIL,
      payload: error.message,
    });
  }
};

// Get Ads
export const showAds = (id, campaignType, slug) => async (dispatch) => {
  try {
    dispatch({ type: SHOW_ADS_REQUEST });

    const { data } = await axios.get(
      `/api/campaign/get-data/${id}/${campaignType}/${slug}`
    );

    if (data.status === "success") {
      dispatch({
        type: SHOW_ADS_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: SHOW_ADS_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: SHOW_ADS_FAIL,
      payload: error.message,
    });
  }
};

/////////////////// INFLUENCER DASHBOARD ACTION //////////////////

// Get All Campaigns For Influencers
export const getAllInfluencerCampaign = (params) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_INFLUENCER_CAMPAIGN_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `/api/campaign/influencer/all-influencer-campaigns/${params}`,
      config
    );

    if (data.status === "success") {
      dispatch({
        type: GET_ALL_INFLUENCER_CAMPAIGN_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_INFLUENCER_CAMPAIGN_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_INFLUENCER_CAMPAIGN_FAIL,
      payload: error.message,
    });
  }
};

// Update Influencer Campaign Status Action
export const updateInfluencerCampaignStatusAction =
  (payload) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_INFLUENCER_CAMPAIGN_STATUS_REQUEST });
      let user = JSON.parse(sessionStorage.getItem("user"));
      const token = user.user.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        "api/campaign/influencer/update-approval-status",
        payload,
        config
      );

      if (data.status === "success") {
        dispatch({
          type: UPDATE_INFLUENCER_CAMPAIGN_STATUS_SUCCESS,
          payload: data,
        });
        // console.log(data);
      } else {
        dispatch({
          type: UPDATE_INFLUENCER_CAMPAIGN_STATUS_FAIL,
          payload: data.message,
        });
      }
    } catch (data) {
      dispatch({
        type: UPDATE_INFLUENCER_CAMPAIGN_STATUS_FAIL,
        payload: data.message,
      });
    }
  };

// Update Influencer Campaign Publish Status Action
export const updateInfluencerPublishStatusAction =
  (payload) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_INFLUENCER_PUBLISHED_STATUS_REQUEST });
      let user = JSON.parse(sessionStorage.getItem("user"));
      const token = user.user.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        "api/campaign/influencer/update-status",
        payload,
        config
      );

      if (data.status === "success") {
        dispatch({
          type: UPDATE_INFLUENCER_PUBLISHED_STATUS_SUCCESS,
          payload: data,
        });
        // console.log(data);
      } else {
        dispatch({
          type: UPDATE_INFLUENCER_PUBLISHED_STATUS_FAIL,
          payload: data.message,
        });
      }
    } catch (data) {
      dispatch({
        type: UPDATE_INFLUENCER_PUBLISHED_STATUS_FAIL,
        payload: data.message,
      });
    }
  };

// Get Influencer Details
export const getInfluencerDetails = (params) => async (dispatch) => {
  try {
    dispatch({ type: GET_INFLUENCER_DETAILS_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `/api/campaign/influencer/get-influencer/${params}`,
      config
    );

    if (data.status === "success") {
      dispatch({
        type: GET_INFLUENCER_DETAILS_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: GET_INFLUENCER_DETAILS_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_INFLUENCER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// /campaign/digital-campaigns

export const getDigitalCampaigns = () => async (dispatch) => {
  try {
    dispatch({ type: GET_DIGITAL_CAMPAIGNS_REQUEST });
    let user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`api/campaign/digital-campaigns`, config);

    // console.log(data.data);

    if (data.status === "success") {
      // console.log("works");
      dispatch({
        type: GET_DIGITAL_CAMPAIGNS_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: GET_DIGITAL_CAMPAIGNS_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_DIGITAL_CAMPAIGNS_FAIL,
      payload: error.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
