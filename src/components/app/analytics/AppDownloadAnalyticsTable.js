import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { DateTime } from "luxon";

import Loader from "../../loader";

const AppDownloadAnalyticsTable = () => {
  const { adLoading, viewAppDownloadCampaigns } = useSelector(
    (state) => state.viewAppDownloadCampaign || {}
  );

  // useEffect(() => {
  //     dispatch(getViewFlierVideosCampaigns())
  //     // dispatch(getWallet())

  // }, [])

  const setViewAppDownloadCampaigns = () => {
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

    viewAppDownloadCampaigns &&
      viewAppDownloadCampaigns.forEach((campaign) => {
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
                className={`{"badge" ${
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
                    <Link to={`../analytics/appdownload/${campaign.id}`}>
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
      {adLoading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setViewAppDownloadCampaigns()}
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

export default AppDownloadAnalyticsTable;
