import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { authReducer } from './reducers/authReducers'

import { senderIDReducer, createSenderIdReducer } from './reducers/senderIDReducers'
import {  walletReducer, transactionHistoryReducer, fundWalletReducer, confirmFundingReducer } from './reducers/billingReducers'
import { createSmsCampaignReducer, getAllCampaignsReducer } from './reducers/campaignReducers'

const appReducer = combineReducers({

    auth: authReducer,
    createSenderId: createSenderIdReducer,
    wallet: walletReducer,
    tnxHistory: transactionHistoryReducer,
    senderID: senderIDReducer,
    fundWallet: fundWalletReducer,
    confirmFund: confirmFundingReducer,
    smsCampaign: createSmsCampaignReducer,
    getAllCampaign: getAllCampaignsReducer
    
})

const reducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        
        return appReducer(undefined, action)
    }
  
    return appReducer(state, action)
}


let initialState = {}

const middleWare = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store