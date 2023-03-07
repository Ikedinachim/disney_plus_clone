import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
// import { useAlert } from "react-alert";
import { DateTime } from "luxon";
import NumberFormat from "react-number-format";

import Loader from "../../../loader";
import MetaData from "../../../layout/MetaData";

// import { getWallet } from '../../../actions/billingActions'
import { MDBDataTable } from "mdbreact";

const ViewFlierVideosCampaigns = () => {
  const { vfLoading, viewFlierVideosCampaigns } = useSelector(
    (state) => state.viewFlierVideosCampaign || {}
  );
  // const dispatch = useDispatch();
  // const alert = useAlert();

  // useEffect(() => {
  //     dispatch(getViewFlierVideosCampaigns())
  //     // dispatch(getWallet())

  // }, [])

  const setViewFlierVideosCampaigns = () => {
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

    viewFlierVideosCampaigns &&
      viewFlierVideosCampaigns.forEach((campaign) => {
        data.rows.push({
          checkBoxes: (
            <Fragment>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customCheck1"
                ></label>
              </div>
            </Fragment>
          ),
          campaignName:
            campaign.campaignType === "flier_video"
              ? "display/digital"
              : campaign.campaignType,
          adType: campaign.channel,
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
          status:
            (campaign.channel === "smart_sms" && (
              <span
                className={`badge d-flex-center ${
                  !campaign.isApproved ? "badge-pink" : "badge-active"
                }`}
              >
                {!campaign.isApproved ? "Pending" : "Approved"}
              </span>
            )) ||
            (campaign.channel === "display_ads" && (
              <span
                className={`badge d-flex-center ${
                  !campaign.displayAdsStatus ? "badge-pink" : "badge-active"
                }`}
              >
                {!campaign.displayAdsStatus
                  ? "Pending"
                  : campaign.displayAdsStatus}
              </span>
            )),
          actions: (
            <Fragment>
              <div className="tx-black tx-14">
                <div className="d-flex">
                  <Link to={`../campaign/single-flier-video/${campaign.id}`}>
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
      <MetaData title={"Smart SMS & Display Ads Campaigns"} />
      {vfLoading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setViewFlierVideosCampaigns()}
          className="px-3 scroll"
          bordered
          striped
          hover
          responsive
        />
      )}
    </Fragment>
  );
};

export default ViewFlierVideosCampaigns;
