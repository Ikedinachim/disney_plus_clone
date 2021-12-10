import Axios from 'axios';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS,
    RESETAPP_REQUEST,
    USER_LOGOUT
} from '../constants/authConstants'

const baseURL = 'https://mysogi.uat.com.ng/';

const axios = Axios.create({
    baseURL
});

// Login
export const login = (username, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('api/auth/login', { username, password }, config)
        sessionStorage.setItem('user',JSON.stringify(data.data))
        

        if (data.status === "success") {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data.data,
            })
        } else {
            dispatch({
                type: LOGIN_FAIL,
                payload: data.message
            })
        }
        
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.data
        })
    }
}

// Register User
export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('api/auth/register', userData, config)
        sessionStorage.setItem('user',JSON.stringify(data.data))

        if (data.status === "success") {
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: data.message
            })
        }
        
    } catch (data) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: data.message
        })
    }
}

// Logout User
export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user')

        dispatch({
            type: USER_LOGOUT
        })
        
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {(
    dispatch({
        type: CLEAR_ERRORS
    })
)}