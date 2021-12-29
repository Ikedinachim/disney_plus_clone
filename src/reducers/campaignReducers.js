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

    GET_ALL_CAMPAIGN_REQUEST,
    GET_ALL_CAMPAIGN_SUCCESS,
    GET_ALL_CAMPAIGN_FAIL,
    CLEAR_ERRORS
} from '../constants/campaignConstants'

export const createSmsCampaignReducer = (state = { createSmsCampaign: [] }, action) => {
    switch(action.type) {
        case SMS_CAMPAIGN_REQUEST:
            return {
                loading: true,
                createSmsCampaign: []
            }
        
        case SMS_CAMPAIGN_SUCCESS:
            return {
                loading: false,
                createSmsCampaign: action.payload
            }
        case SMS_CAMPAIGN_RESET:
            return {
                ...state,
                createSmsCampaign: []
            }
        case SMS_CAMPAIGN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const createFlierVideoCampaignReducer = (state = { createFlierVideoCampaign: [] }, action) => {
    switch(action.type) {
        case VIDEO_FLIER_CAMPAIGN_REQUEST:
            return {
                loading: true,
                createFlierVideoCampaign: []
            }
        
        case VIDEO_FLIER_CAMPAIGN_SUCCESS:
            return {
                loading: false,
                createFlierVideoCampaign: action.payload
            }
        case VIDEO_FLIER_CAMPAIGN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case VIDEO_FLIER_CAMPAIGN_RESET:
            return {
                ...state,
                createFlierVideoCampaign: []
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const createAppDownloadCampaignReducer = (state = { createAppDownloadCampaign: [] }, action) => {
    switch(action.type) {
        case APP_DOWNLOAD_CAMPAIGN_REQUEST:
            return {
                loading: true,
                createAppDownloadCampaign: []
            }
        
        case APP_DOWNLOAD_CAMPAIGN_SUCCESS:
            return {
                loading: false,
                createAppDownloadCampaign: action.payload
            }
        case APP_DOWNLOAD_CAMPAIGN_FAIL:
            return {
                loading: false,
                createAppDownloadCampaign: null,
                error: action.payload
            }
        case APP_DOWNLOAD_CAMPAIGN_RESET:
            return {
                ...state,
                createAppDownloadCampaign: []
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const getAllCampaignsReducer = (state = { allCampaigns: [] }, action) => {
    switch(action.type) {
        case GET_ALL_CAMPAIGN_REQUEST:
            return {
                loading: true,
            }
        
        case GET_ALL_CAMPAIGN_SUCCESS:
            return {
                loading: false,
                allCampaigns: action.payload,
            }

        case GET_ALL_CAMPAIGN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}