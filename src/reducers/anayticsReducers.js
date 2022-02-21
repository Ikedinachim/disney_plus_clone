import {
  PROPELLER_CAMPAIGN_REQUEST,
  PROPELLER_CAMPAIGN_SUCCESS,
  PROPELLER_CAMPAIGN_FAIL,
  CLEAR_ERRORS,
} from "../constants/analyticsConstants";

export const getPropellerCampaignsReducer = (
  state = { propellerCampaigns: [] },
  action
) => {
  switch (action.type) {
    case PROPELLER_CAMPAIGN_REQUEST:
      return {
        loading: true,
      };

    case PROPELLER_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        propellerCampaigns: action.payload,
      };

    case PROPELLER_CAMPAIGN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
