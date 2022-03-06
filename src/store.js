import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import sessionStorage from "redux-persist/lib/storage/session";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import {
  authReducer,
  userDetailsReducer,
  updateUserReducer,
  updateInfluencerReducer,
  updateInfluencerCostReducer,
  resetInfluencerPasswordReducer,
  updateUserPasswordReducer,

  // userDetailsReducer
} from "./reducers/authReducers";

import {
  senderIDReducer,
  createSenderIdReducer,
  defaultSenderIDReducer,
} from "./reducers/senderIDReducers";
import {
  walletReducer,
  transactionHistoryReducer,
  fundWalletReducer,
  confirmFundingReducer,
} from "./reducers/billingReducers";
import {
  getMobileCampaignsReducer,
  getOsCampaignsReducer,
  getPropellerCampaignsReducer,
  getCampaignByDateReducer,
} from "./reducers/analyticsReducers";
import {
  createSmsCampaignReducer,
  createFlierVideoCampaignReducer,
  getSmsCampaignsReducer,
  createAppDownloadCampaignReducer,
  createShowAdsReducer,
  viewFlierVideosCampaignsReducer,
  viewAppDownloadCampaignsReducer,
  getFilteredContactListReducer,
  getAllInfluencersReducer,
  getSingleCampaignReducer,
  AllCampaignReducer,
  createInfluencerCampaignReducer,
  getAllInfluencerCampaignReducer,
  updateInfluencerCampaignStatusReducer,
  getInfluencerDetailsReducer,
  updateInfluencerPublishedStatusReducer,
  getDigitalCampaignsReducer,
} from "./reducers/campaignReducers";

const appReducer = combineReducers({
  auth: authReducer,
  userDetails: userDetailsReducer,
  updateUser: updateUserReducer,
  updateUserPassword: updateUserPasswordReducer,
  createSenderId: createSenderIdReducer,
  senderID: senderIDReducer,
  defaultSenderID: defaultSenderIDReducer,
  wallet: walletReducer,
  tnxHistory: transactionHistoryReducer,
  allCampaign: AllCampaignReducer,
  fundWallet: fundWalletReducer,
  confirmFund: confirmFundingReducer,
  smsCampaign: createSmsCampaignReducer,
  flierVideoCampaign: createFlierVideoCampaignReducer,
  getSmsCampaign: getSmsCampaignsReducer,
  getSingleCampaign: getSingleCampaignReducer,
  showAds: createShowAdsReducer,
  appDownload: createAppDownloadCampaignReducer,
  viewFlierVideosCampaign: viewFlierVideosCampaignsReducer,
  viewAppDownloadCampaign: viewAppDownloadCampaignsReducer,
  filteredContactList: getFilteredContactListReducer,
  allInfluencers: getAllInfluencersReducer,
  influencerCampaign: createInfluencerCampaignReducer,
  influencerCampaignList: getAllInfluencerCampaignReducer,
  updateInfluencerCampaignStatus: updateInfluencerCampaignStatusReducer,
  updateInfluencerCampaignPublishStatus: updateInfluencerPublishedStatusReducer,
  influencerDetails: getInfluencerDetailsReducer,
  digitalCampaigns: getDigitalCampaignsReducer,
  getPropellerCampaigns: getPropellerCampaignsReducer,
  getOsCampaigns: getOsCampaignsReducer,
  getMobileCampaigns: getMobileCampaignsReducer,
  getCampaignByDate: getCampaignByDateReducer,
  updateInfluencerProfile: updateInfluencerReducer,
  updateInfluencerCost: updateInfluencerCostReducer,
  resetInfluencerPassword: resetInfluencerPasswordReducer,
});

const reducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    sessionStorage.removeItem("persist:root");
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

let initialState = {};

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const middleWare = [thunk];
const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});
const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);

const persistor = persistStore(store);
export default store;
export { persistor };
