import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { authReducer, userDetailsReducer } from './reducers/authReducers'

import { senderIDReducer, createSenderIdReducer } from './reducers/senderIDReducers'
import {  walletReducer, transactionHistoryReducer, fundWalletReducer, confirmFundingReducer } from './reducers/billingReducers'
import { createSmsCampaignReducer, createFlierVideoCampaignReducer, getAllCampaignsReducer } from './reducers/campaignReducers'

const appReducer = combineReducers({

    auth: authReducer,
    createSenderId: createSenderIdReducer,
    wallet: walletReducer,
    tnxHistory: transactionHistoryReducer,
    senderID: senderIDReducer,
    fundWallet: fundWalletReducer,
    confirmFund: confirmFundingReducer,
    smsCampaign: createSmsCampaignReducer,
    flierVideoCampaign: createFlierVideoCampaignReducer,
    getAllCampaign: getAllCampaignsReducer,
    
})

const reducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        
        return appReducer(undefined, action)
    }
  
    return appReducer(state, action)
}

// const userStatus = sessionStorage.getItem('user')

let initialState = {}

// let initialState = {
//     token: userStatus.token,
//     isAuthenticated: userStatus ? true : false, // or just !!localStorage.getItem('token')
//     isLoading: false,
//     isRegistered: false
//  }

const persistConfig = {
    key: 'root',
    storage,
}
  
const persistedReducer = persistReducer(persistConfig, reducer)

const middleWare = [thunk]
const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))


// let store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))
const persistor = persistStore(store)
// export default store

export { store, persistor }