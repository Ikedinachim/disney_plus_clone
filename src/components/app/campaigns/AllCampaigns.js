import React, { Fragment, useEffect } from "react";
import { getAllCampaign } from "../../../actions/campaignActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import Loader from "../../loader";
import { DateTime } from "luxon";
import { MDBDataTable } from "mdbreact";
import MetaData from "../../layout/MetaData";

const AllCampaigns = () => {
  const dispatch = useDispatch();
  const { loading, allCampaign } = useSelector(
    (state) => state.allCampaign || {}
  );

  const setAllCampaigns = () => {
    const data = {
      columns: [
        {
          label: "",
          field: "checkBoxes",
          sort: "asc",
        },
        // custom-control-label
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

    allCampaign &&
      allCampaign.forEach((campaign) => {
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
                  <Link to={`../campaigns/${campaign.id}`}>
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

  useEffect(() => {
    dispatch(getAllCampaign());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title={"All Campaigns"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="row justify-content-between">
                <div className="col-md-6 col-6">
                  <div className="mg-b-0 tx-26 tx-bold">
                    <span>Campaigns</span>
                  </div>
                </div>
                <div className="col-md-2 col-6">
                  <p>
                    <Link to="../campaign/create" className="btn btn-primary">
                      New Campaign
                    </Link>
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-header bd-b-0 pd-b-0 pd-t-40 pd-md-x-30">
                  <div className="">
                    <div className="row justify-content-between">
                      <div className="col-12 col-lg-4 col-md-4 pd-r-5 mg-b-20 mg-md-b-0">
                        <div className="d-flex">
                          <div className="mg-t-10 mg-r-20">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input "
                                name="select-all"
                                id="customCheck"
                              />
                              <label
                                className="custom-control-label pd-y-10"
                                for="customCheck"
                              ></label>
                            </div>
                          </div>
                          <div>
                            <div className="search-form w-100">
                              <input
                                type="search"
                                className="form-control bg-search"
                                placeholder="Search"
                              />
                              <button className="btn" type="button">
                                <i data-feather="search"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6  mg-b-10 mg-md-b-0">
                            <div className="form-group form-row">
                              <label
                                for="inputEmail3"
                                className="col-3 col-form-label pd-r-0"
                              >
                                Sort by
                              </label>
                              <div className="col-9">
                                <select className="custom-select">
                                  <option selected>Most recent</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="d-flex justify-content-between">
                              <div>
                                <button
                                  className="btn btn-outline w-100 pd-x-30"
                                  data-toggle="modal"
                                  data-target="#exportModal"
                                >
                                  <span>
                                    <i
                                      data-feather="download"
                                      className="mg-r-5"
                                    ></i>
                                    Export as
                                  </span>
                                </button>
                              </div>
                              <div>
                                <div className="d-flex justify-content-end">
                                  <button className="btn">
                                    <span>
                                      <i
                                        data-feather="printer"
                                        className="tx-primary mg-r-5 print-icon"
                                      ></i>
                                      Print
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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

export default AllCampaigns;
