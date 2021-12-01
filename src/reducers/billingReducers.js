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
    CLEAR_ERRORS,

} from '../constants/billingConstants'

export const walletReducer = (state = { wallet: [] }, action) => {
    switch(action.type) {
        case GET_WALLET_REQUEST:
            return {
                loading: true,
                wallet: []
            }
        
        case GET_WALLET_SUCCESS:
            return {
                loading: false,
                wallet: action.payload,
            }

        case GET_WALLET_FAIL:
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

export const transactionHistoryReducer = (state = { tnxHistory: [] }, action) => {
    switch(action.type) {
        case GET_TRANSACTION_HISTORY_REQUEST:
            return {
                loading: true,
                tnxHistory: []
            }
        
        case GET_TRANSACTION_HISTORY_SUCCESS:
            return {
                loading: false,
                tnxHistory: action.payload,
            }

        case GET_TRANSACTION_HISTORY_FAIL:
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

export const fundWalletReducer = (state = { fundWallet: [] }, action) => {
    switch(action.type) {
        case FUND_WALLET_REQUEST:
            return {
                loading: true,
                // status: action.payload
                fundWallet: []
            }
        
        case FUND_WALLET_SUCCESS:
            return {
                loading: false,
                // status: action.payload,
                fundWallet: action.payload
            }

        case FUND_WALLET_FAIL:
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
