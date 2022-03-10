import React, { Fragment, useEffect } from "react";
import { getDigitalCampaigns } from "../../../actions/campaignActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import Loader from "../../loader";
import { DateTime } from "luxon";
import { MDBDataTable } from "mdbreact";
import MetaData from "../../layout/MetaData";

const DigitalAnalyticsTable = () => {
  const dispatch = useDispatch();
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
          label: "Propeller Id",
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

    // console.log(digitalCampaigns);
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
                !campaign.isApproved ? "badge-pink" : "badge-active"
              }`}
            >
              {!campaign.isApproved ? "Closed" : "Open"}
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

  useEffect(() => {
    dispatch(getDigitalCampaigns());
  }, [dispatch]);

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
