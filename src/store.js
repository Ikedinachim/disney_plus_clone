import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import {
  authReducer,
  userDetailsReducer,
  updateUserReducer,
  updateInfluencerReducer,
  // userDetailsReducer
} from "./reducers/authReducers";

import {
  senderIDReducer,
  createSenderIdReducer,
} from "./reducers/senderIDReducers";
import {
  walletReducer,
  transactionHistoryReducer,
  fundWalletReducer,
  confirmFundingReducer,
} from "./reducers/billingReducers";
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
  createSenderId: createSenderIdReducer,
  wallet: walletReducer,
  tnxHistory: transactionHistoryReducer,
  allCampaign: AllCampaignReducer,
  senderID: senderIDReducer,
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
});

const reducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    storage.removeItem("persist:root");
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

let initialState = {};

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const middleWare = [thunk];
const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

const persistor = persistStore(store);
export default store;
export { persistor };
