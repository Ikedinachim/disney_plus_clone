import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { DateTime } from "luxon";
import NumberFormat from "react-number-format";

import Loader from "../../../loader";
import MetaData from "../../../layout/MetaData";

// import { getWallet } from '../../../actions/billingActions'
import { MDBDataTable } from "mdbreact";
import {
  getAllUserInfluencers,
  clearErrors,
} from "../../../../actions/campaignActions";
import { toast } from "react-toastify";

const ViewInfluencerCampaigns = () => {
  const { loading, error, allUserInfluencer } = useSelector(
    (state) => state.allUserInfluencer || {}
  );

  console.log(allUserInfluencer);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    dispatch(getAllUserInfluencers());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // dispatch(getWallet())
  }, [dispatch, alert, error]);

  const setSmsCampaigns = () => {
    const data = {
      columns: [
        {
          label: "",
          field: "checkBoxes",
          sort: "asc",
        },
        {
          label: "CAMPAIGN NAME",
          field: "campaignName",
          sort: "asc",
        },
        {
          label: "AD TYPE",
          field: "adType",
          sort: "asc",
        },
        {
          label: "REVENUE",
          field: "revenue",
          sort: "asc",
        },
        {
          label: "COST",
          field: "cost",
          sort: "asc",
        },
        {
          label: "DATE CREATED",
          field: "dateCreated",
          sort: "asc",
        },
        {
          label: "STATUS",
          field: "status",
          sort: "asc",
        },
        {
          label: "ACTIONS",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    allUserInfluencer &&
      allUserInfluencer.forEach((campaign) => {
        data.rows.push({
          checkBoxes: (
            <Fragment>
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck1"
                />
                <label class="custom-control-label" for="customCheck1"></label>
              </div>
            </Fragment>
          ),
          campaignName: campaign.campaignType,
          adType: campaign.channel,
          revenue: (
            <NumberFormat
              value={0}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          ),
          cost: (
            <NumberFormat
              value={campaign.cost}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          ),
          dateCreated: DateTime.fromJSDate(
            new Date(campaign.createdAt)
          ).toFormat("dd MMM, yyyy"),
          status: (
            <span
              className={`{"badge" ${
                !campaign.isAdminApproved ? "badge-pink" : "badge-active"
              }`}
            >
              {!campaign.isAdminApproved ? "Pending" : "Approved"}
            </span>
          ),
          actions: (
            <Fragment>
              <div class="tx-black tx-14">
                <div class="d-flex">
                  <Link to={`../campaign/single-influencer/${campaign.id}`}>
                    <i className="fa fa-eye tx-orange pd-t-4 mg-r-5" /> View{" "}
                  </Link>
                </div>
              </div>
            </Fragment>
          ),
        });
      });
    return data;
  };

  return (
    <Fragment>
      {/* <MetaData title={"SMS Campaigns"} /> */}
      {loading ? (
        ""
      ) : (
        <MDBDataTable
          data={setSmsCampaigns()}
          className="px-3 scroll"
          bordered
          striped
          hover
          checkboxFirstColumn
          responsive
        />
      )}
    </Fragment>
  );
};

export default ViewInfluencerCampaigns;
