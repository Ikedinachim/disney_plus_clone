import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { DateTime } from "luxon";
import { getViewFlierVideosCampaigns } from "../../../actions/campaignActions";

import Loader from "../../loader";

const SmartSmsAnalyticsTable = () => {
  const dispatch = useDispatch();
  const { vfLoading, viewFlierVideosCampaigns } = useSelector(
    (state) => state.viewFlierVideosCampaign || {}
  );

  // useEffect(() => {
  //   dispatch(getViewFlierVideosCampaigns());
  // });

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
        if (campaign.channel === "smart_sms") {
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
            campaignName: campaign.campaignType,
            adType: campaign.channel,
            dateCreated: DateTime.fromJSDate(
              new Date(campaign.createdAt)
            ).toFormat("dd MMM, yyyy"),
            status: (
              <span
                className={`badge d-flex-center ${
                  !campaign.isApproved ? "badge-pink" : "badge-active"
                }`}
              >
                {!campaign.isApproved ? "Pending" : "Approved"}
              </span>
            ),
            actions: (
              <Fragment>
                <div className="tx-black tx-14">
                  <div className="d-flex">
                    <Link to={`../analytics/smartsms/${campaign.id}`}>
                      <i className="fa fa-eye tx-orange pd-t-4 mg-r-5" /> View
                      Analytics{" "}
                    </Link>
                  </div>
                </div>
              </Fragment>
            ),
          });
        }
      });
    return data;
  };

  return (
    <Fragment>
      {/* <MetaData title={"SMS Campaigns"} /> */}
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

export default SmartSmsAnalyticsTable;
