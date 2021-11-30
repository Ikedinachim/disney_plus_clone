import Axios from 'axios';

import {
    GET_WALLET_REQUEST,
    GET_WALLET_SUCCESS,
    GET_WALLET_FAIL,
    GET_TRANSACTION_HISTORY_REQUEST,
    GET_TRANSACTION_HISTORY_SUCCESS,
    GET_TRANSACTION_HISTORY_FAIL,
    FUND_WALLET_REQUEST,
    FUND_WALLET_SUCCESS,
    FUND_WALLET_FAIL,
    CLEAR_ERRORS
} from '../constants/billingConstants'

const baseURL = 'https://mysogi.uat.com.ng/';

const axios = Axios.create({
    baseURL
});

// Get User Sender ID's
export const getWallet = () => async (dispatch) => {
    try {
        
        
        dispatch({ type: GET_WALLET_REQUEST })
        let user = JSON.parse(sessionStorage.getItem('user'));
        const token = user.user.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        }

        const { data } = await axios.get('/api/payment/wallet', config)
        console.log(data)

        if (data.status === "success") {
            dispatch({
                type: GET_WALLET_SUCCESS,
                payload: data.data,
            })
        } else {
            dispatch({
                type: GET_WALLET_FAIL,
                payload: data.message
            })
        }
        
    } catch (error) {
        dispatch({
            type: GET_WALLET_FAIL,
            payload: error.message
        })
    }
}

// Get User Transaction History
export const getTransactionHistory = () => async (dispatch) => {
    try {
        
        
        dispatch({ type: GET_TRANSACTION_HISTORY_REQUEST })
        let user = JSON.parse(sessionStorage.getItem('user'));
        const token = user.user.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        }

        const { data } = await axios.get('/api/payment/transaction-history', config)
        console.log(data)

        if (data.status === "success") {
            dispatch({
                type: GET_TRANSACTION_HISTORY_SUCCESS,
                payload: data.data,
            })
        } else {
            dispatch({
                type: GET_TRANSACTION_HISTORY_FAIL,
                payload: data.message
            })
        }
        
    } catch (error) {
        dispatch({
            type: GET_WALLET_FAIL,
            payload: error.message
        })
    }
}


// Fund Wallet
export const fundWallet = (amount) => async (dispatch) => {
    try {
        
        
        dispatch({ type: FUND_WALLET_REQUEST })
        let user = JSON.parse(sessionStorage.getItem('user'));
        const token = user.user.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        }

        const { data } = await axios.post('/api/payment/initiate-payment', amount, config)
        console.log(data)

        if (data.status === "success") {
            dispatch({
                type: FUND_WALLET_SUCCESS,
                payload: data
            })
        } else {
            dispatch({
                type: FUND_WALLET_FAIL,
                payload: data.message
            })
        }
        
    } catch (error) {
        dispatch({
            type: FUND_WALLET_FAIL,
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