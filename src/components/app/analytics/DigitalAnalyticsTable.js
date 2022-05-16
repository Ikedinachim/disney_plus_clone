import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
// import NumberFormat from "react-number-format";

// import { getDigitalCampaigns } from "../../../actions/campaignActions";
import Loader from "../../loader";
import MetaData from "../../layout/MetaData";

const DigitalAnalyticsTable = () => {
  const { loading, digitalCampaigns } = useSelector(
    (state) => state.digitalCampaigns || {}
  );

  const setAllCampaigns = () => {
    const data = {
      columns: [
        {
          label: "id",
          field: "id",
          sort: "asc",
        },
        // custom-control-label
        {
          label: "Digital channel Id",
          field: "propellerId",
          sort: "asc",
        },
        {
          label: "Campaign TYPE",
          field: "campaignType",
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
          label: "",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    digitalCampaigns &&
      digitalCampaigns.forEach((campaign) => {
        data.rows.push({
          id: campaign.id,
          propellerId: campaign.propellerId,
          campaignType: campaign.campaignType,
          dateCreated: DateTime.fromJSDate(
            new Date(campaign.createdAt)
          ).toFormat("dd MMM, yyyy"),
          status: (
            <span
              className={`{"badge" ${
                campaign.status === "Stopped"
                  ? "badge-primary"
                  : "" || campaign.status === "Working" 
                  ? "badge-active"
                  : "" || campaign.status === "Completed" ? "badge-pink" : ""
              }`}
            >
              {campaign.status === "Stopped"
                ? "Closed"
                : null || campaign.status === "Working"
                ? "Working"
                : null || campaign.status === "Completed"
                ? "Completed"
                : null}
            </span>
          ),
          actions: (
            <Fragment>
              <div class="tx-black tx-14">
                <div class="d-flex">
                  <Link to={`../analytics/graph/${campaign.propellerId}`}>
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
      <MetaData title={"Campaigns"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MDBDataTable
            responsive
            data={setAllCampaigns()}
            className="px-3 scroll"
            striped
            hover
            checkboxFirstColumn
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default DigitalAnalyticsTable;
