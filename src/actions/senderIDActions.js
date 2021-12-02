import Axios from 'axios';

import {
    GET_SENDERID_REQUEST,
    GET_SENDERID_SUCCESS,
    GET_SENDERID_FAIL,
    CREATE_SENDERID_REQUEST,
    CREATE_SENDERID_SUCCESS,
    CREATE_SENDERID_FAIL,
    CLEAR_ERRORS
} from '../constants/senderIDConstants'

const baseURL = 'https://mysogi.uat.com.ng/';

const axios = Axios.create({
    baseURL
});

// Get User Sender ID's
export const getSenderID = () => async (dispatch) => {
    try {
        
        
        dispatch({ type: GET_SENDERID_REQUEST })
        let user = JSON.parse(sessionStorage.getItem('user'));
        const token = user.user.token;

        const config = {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }

        const { data } = await axios.get('/api/view-sender-ids', config)

        if (data.status === "success") {
            dispatch({
                type: GET_SENDERID_SUCCESS,
                payload: data.data.senderIds,
            })
        } else {
            dispatch({
                type: GET_SENDERID_FAIL,
                payload: data.message
            })
        }
        
    } catch (error) {
        dispatch({
            type: GET_SENDERID_FAIL,
            payload: error.message
        })
    }
}


// Create New Sender ID
export const createSenderId = (setCreateSenderId) => async (dispatch) => {
    try {

        dispatch({ type: CREATE_SENDERID_REQUEST })
        let user = JSON.parse(sessionStorage.getItem('user'));
        const token = user.user.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        }
        const { data } = await axios.post('api/create-sender-id', setCreateSenderId, config)

        if (data.status === "success") {
            dispatch({
                type: CREATE_SENDERID_SUCCESS,
                payload: data.status
            })
        } else {
            dispatch({
                type: CREATE_SENDERID_FAIL,
                payload: data.message
            })
        }
        
    } catch (data) {
        dispatch({
            type: CREATE_SENDERID_FAIL,
            payload: data.message
        })
    }
}


// Clear Errors
export const clearErrors = () => async (dispatch) => {(
    dispatch({
        type: CLEAR_ERRORS
    })
)}