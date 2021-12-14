import {
    SMS_CAMPAIGN_REQUEST,
    SMS_CAMPAIGN_SUCCESS,
    SMS_CAMPAIGN_RESET,
    SMS_CAMPAIGN_FAIL,
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