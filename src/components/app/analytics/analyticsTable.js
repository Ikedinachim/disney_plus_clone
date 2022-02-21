import React, { Fragment, useEffect } from "react";
import { getDigitalCampaigns } from "../../../actions/campaignActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import Loader from "../../loader";
import { DateTime } from "luxon";
import { MDBDataTable } from "mdbreact";
import MetaData from "../../layout/MetaData";

const AnalyticsTable = () => {
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
          label: "",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    console.log(digitalCampaigns);
    digitalCampaigns &&
      digitalCampaigns.forEach((campaign) => {
        data.rows.push({
          id: campaign.id,
          propellerId: campaign.propellerId,
          campaignType: campaign.campaignType,
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
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="row justify-content-between">
                <div className="col-md-6 col-6">
                  <div className="mg-b-0 tx-26 tx-bold">
                    <span>Analytics</span>
                  </div>
                </div>
                <div className="col-md-2 col-6">
                  <p>
                    <Link to="../campaign/create" className="btn btn-primary">
                      Create New Campaign
                    </Link>
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-body pd-md-x-30 pd-t- mg-t-20 mg-md-t-0">
                  <div className="tab-content bd-t-0" id="myTabContent">
                    <div className="pd-y-20">
                      <MDBDataTable
                        responsive
                        data={setAllCampaigns()}
                        className="px-3 scroll"
                        striped
                        hover
                        checkboxFirstColumn
                      />

                      {/* <div class="tx-black tx-14">
                    <div class="d-flex">
                      <Link to={`../campaigns/${campaign.id}`}>
                        <i className="fa fa-eye tx-orange pd-t-4 mg-r-5" /> View{" "}
                      </Link>
                    </div>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </Fragment>
      )}
    </Fragment>
  );
};

export default AnalyticsTable;
