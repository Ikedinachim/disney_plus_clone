import Axios from 'axios';

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
    // SHOW_ADS_RESET,

    GET_ALL_CAMPAIGN_REQUEST,
    GET_ALL_CAMPAIGN_SUCCESS,
    GET_ALL_CAMPAIGN_FAIL,
    CLEAR_ERRORS,
} from '../constants/campaignConstants'

const baseURL = 'https://mysogi.uat.com.ng/';

const axios = Axios.create({
    baseURL
});

// Create SMS Campaign Action
export const createSmsCampaignAction = (smsCampaignData) => async (dispatch) => {
    try {

        dispatch({ type: SMS_CAMPAIGN_REQUEST })
        let user = JSON.parse(sessionStorage.getItem('user'));
        const token = user.user.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        }
        const { data } = await axios.post('api/campaign/create-campaign', smsCampaignData, config)

        if (data.status === "success") {
            dispatch({
                type: SMS_CAMPAIGN_SUCCESS,
                payload: data
            })
        } else {
            dispatch({
                type: SMS_CAMPAIGN_FAIL,
                payload: data.message
            })
        }
        
    } catch (data) {
        dispatch({
            type: SMS_CAMPAIGN_FAIL,
            payload: data.message
        })
    }
}

// Create Flier and Video Campaign Action
export const createFlierVideoCampaignAction = (flierVideoCampaignData) => async (dispatch) => {
    try {

        dispatch({ type: VIDEO_FLIER_CAMPAIGN_REQUEST })
        let user = JSON.parse(sessionStorage.getItem('user'));
        const token = user.user.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        }
        const { data } = await axios.post('api/campaign/create-flier-video-campaign', flierVideoCampaignData, config)

        if (data.status === "success") {
            dispatch({
                type: VIDEO_FLIER_CAMPAIGN_SUCCESS,
                payload: data
            })
        } else {
            dispatch({
                type: VIDEO_FLIER_CAMPAIGN_FAIL,
                payload: data.message
            })
        }
        
    } catch (data) {
        dispatch({
            type: VIDEO_FLIER_CAMPAIGN_FAIL,
            payload: data.message
        })
    }
}

// Create App Download Campaign Action
export const createAppDownloadCampaignAction = (appDownloadCampaignData) => async (dispatch) => {
    try {

        dispatch({ type: APP_DOWNLOAD_CAMPAIGN_REQUEST })
        let user = JSON.parse(sessionStorage.getItem('user'));
        const token = user.user.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        }
        const { data } = await axios.post('api/campaign/create-app-download', appDownloadCampaignData, config)

        if (data.status === "success") {
            dispatch({
                type: APP_DOWNLOAD_CAMPAIGN_SUCCESS,
                payload: data
            })
        } else {
            dispatch({
                type: APP_DOWNLOAD_CAMPAIGN_FAIL,
                payload: data.message
            })
        }
        
    } catch (data) {
        dispatch({
            type: VIDEO_FLIER_CAMPAIGN_FAIL,
            payload: data.message
        })
    }
}

// Get All Campaigns
export const getAllCampaigns = () => async (dispatch) => {
    try {
        
        
        dispatch({ type: GET_ALL_CAMPAIGN_REQUEST })
        let user = JSON.parse(sessionStorage.getItem('user'));
        const token = user.user.token;

        const config = {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }

        const { data } = await axios.get('/api/campaign/all-campaign', config)

        if (data.status === "success") {
            dispatch({
                type: GET_ALL_CAMPAIGN_SUCCESS,
                payload: data.data,
            })
        } else {
            dispatch({
                type: GET_ALL_CAMPAIGN_FAIL,
                payload: data.message
            })
        }
        
    } catch (error) {
        dispatch({
            type: GET_ALL_CAMPAIGN_FAIL,
            payload: error.message
        })
    }
}

// Get All Campaigns
export const showAds = (id, campaignType, slug) => async (dispatch) => {
    try {
        
        
        dispatch({ type: SHOW_ADS_REQUEST })
        // let user = JSON.parse(sessionStorage.getItem('user'));
        // const token = user.user.token;

        // const config = {
        //     headers: {
        //         "Authorization" : `Bearer ${token}`
        //     }
        // }

        const { data } = await axios.get(`/api/campaign/get-data/${id}/${campaignType}/${slug}`)

        if (data.status === "success") {
            dispatch({
                type: SHOW_ADS_SUCCESS,
                payload: data.data,
            })
        } else {
            dispatch({
                type: SHOW_ADS_FAIL,
                payload: data.message
            })
        }
        
    } catch (error) {
        dispatch({
            type: GET_ALL_CAMPAIGN_FAIL,
            payload: error.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {(
    dispatch({
        type: CLEAR_ERRORS
    })
)}