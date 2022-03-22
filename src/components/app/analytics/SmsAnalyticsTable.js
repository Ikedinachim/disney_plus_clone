import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { DateTime } from "luxon";

import Loader from "../../loader";

const SmsAnalyticsTable = () => {
  const { loading, smsCampaigns } = useSelector(
    (state) => state.getSmsCampaign || {}
  );

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

    smsCampaigns &&
      smsCampaigns.forEach((campaign) => {
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
          dateCreated: DateTime.fromJSDate(
            new Date(campaign.createdAt)
          ).toFormat("dd MMM, yyyy"),
          status: (
            <span
              className={`{"badge" ${
                !campaign.isApproved ? "badge-pink" : "badge-active"
              }`}
            >
              {!campaign.isApproved ? "Pending" : "Approved"}
            </span>
          ),
          actions: (
            <Fragment>
              <div class="tx-black tx-14">
                <div class="d-flex">
                  <Link to={`../analytics/sms/${campaign.id}`}>
                    <i className="fa fa-eye tx-orange pd-t-4 mg-r-5" /> View
                    Analytics{" "}
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
      {loading ? (
        <Loader />
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

export default SmsAnalyticsTable;
