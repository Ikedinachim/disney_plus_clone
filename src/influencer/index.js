import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MetaData from "../components/layout/MetaData";
import Loader from "../components/loader";
import FeatherIcon from "feather-icons-react";
import { DateTime } from "luxon";
import { useAlert } from "react-alert";
import NumberFormat from "react-number-format";

import { MDBDataTable } from "mdbreact";
import {
  getAllInfluencerCampaign,
  getInfluencerDetails,
  clearErrors,
} from "../actions/campaignActions";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, influencerCampaignList } = useSelector(
    (state) => state.influencerCampaignList
  );

  const { idLoading } = useSelector((state) => state.influencerDetails);
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.wallet);

  const [isActive, setActive] = useState("false");

  const ToggleClass = (e) => {
    setActive(!isActive);
    e.preventDefault();
  };

  // const resetPropagation = (e) => {
  //     e.stopPropagation()
  //     e.preventDefault()
  //  }

  const [datatable, setDatatable] = useState();

  const setAllCampaigns = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          // sort: "desc",
        },
        {
          label: "CAMPAIGN NAME",
          field: "campaignName",
          // sort: "desc",
        },
        {
          label: "CHANNEL",
          field: "channel",
          // sort: "desc",
        },
        {
          label: "DATE CREATED",
          field: "dateCreated",
          // sort: "desc",
        },
        {
          label: "STATUS",
          field: "status",
          // sort: "desc",
        },
        {
          label: "ACTIONS",
          field: "actions",
          // sort: "desc",
        },
      ],
      rows: [],
    };

    let reverseInfluencerCampaignList = [...influencerCampaignList.reverse()];

    reverseInfluencerCampaignList.forEach((campaign) => {
      data.rows.push({
        id: campaign.id,
        campaignName: campaign.name,
        channel: campaign.platforms,
        dateCreated: DateTime.fromJSDate(new Date(campaign.createdAt)).toFormat(
          "dd MMM, yyyy"
        ),
        status: (
          <span
            className={`badge d-flex-center ${
              campaign.isApproved &&
              !campaign.isPublished &&
              !campaign.isRejected
                ? "badge-pending"
                : ""
            } ${
              campaign.isApproved &&
              campaign.isPublished &&
              !campaign.isRejected
                ? "badge-active"
                : ""
            } ${
              !campaign.isApproved &&
              !campaign.isPublished &&
              campaign.isRejected
                ? "badge-primary"
                : ""
            }
             ${
               !campaign.isApproved &&
               !campaign.isPublished &&
               !campaign.isRejected
                 ? "badge-pink"
                 : ""
             }`}
          >
            {
              // (!campaign.isApproved ? "Pending" : "Approved")
              campaign.isApproved &&
              !campaign.isPublished &&
              !campaign.isRejected
                ? "Unpublished"
                : null ||
                  (campaign.isApproved &&
                    campaign.isPublished &&
                    !campaign.isRejected)
                ? "Published"
                : null ||
                  (!campaign.isApproved &&
                    !campaign.isPublished &&
                    campaign.isRejected)
                ? "Rejected"
                : null ||
                  (!campaign.isApproved &&
                    !campaign.isPublished &&
                    !campaign.isRejected)
                ? "Pending"
                : null

              // if (campaign.marketingData.isApproved && !campaign.marketingData.isPublished && !campaign.marketingData.isRejected) {
              //   return "Approved"
              // }
            }
          </span>
        ),
        actions: (
          <Fragment>
            {/* <div className="dropdown">
                        <span
                            className
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span className="dot" />
                            <span className="dot" />
                            <span className="dot" />
                        </span>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="./view-sender.html">
                            {" "}
                            <i data-feather="eye" className="favourite-icon mr-2 wd-15 ht-15" />
                            View
                            </a>
                            <a className="dropdown-item" href>
                            {" "}
                            <i data-feather="edit" className="favourite-icon mr-2 wd-15 ht-15" />
                            Edit
                            </a>
                            <a className="dropdown-item" href="#">
                            <i data-feather="trash-2" className="favourite-icon mr-2 wd-15 ht-15" />
                            Delete
                            </a>
                        </div>
                    </div> */}
            <div class="tx-black tx-14">
              <Link
                to={`/influencer/view-campaign/${campaign.influenceMarketingId}`}
                class="d-flex"
              >
                <i class="fa fa-eye tx-orange pd-t-4 mg-r-5"></i>
                {campaign.marketingData.isApproved &&
                !campaign.marketingData.isPublished &&
                !campaign.marketingData.isRejected
                  ? "Post"
                  : "View"}
              </Link>
            </div>
          </Fragment>
        ),
      });
    });
    return data;
  };

  useEffect(() => {
    if (user) {
      dispatch(getAllInfluencerCampaign(user.user.influencer_id));
      dispatch(getInfluencerDetails(user.user.influencer_id));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading || idLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Dashboard"} />
          <div className="content-body">
            <div className="container-fluid">
              <div className="row justify-content-between">
                <div className="col-md-6 col-6">
                  <p className="mg-b-0 tx-26 tx-bold">Overview</p>
                </div>
                <div className="col-12 col-md-4 col-xl-3 pd-xl-l-0">
                  <div className="d-flex justify-content-end">
                    {/* <div>
                      <div className="d-flex justify-content-end">
                        <a
                          href="./all-campaign.html"
                          className="btn btn-primary w-100"
                        >
                          View All Campaigns
                        </a>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="row row-xs">
                <div className="col-sm-6 col-xs-6 col-lg-3 mg-t-10">
                  <div className="card card-body p-3 rounded bd-0 shadow-sm">
                    <div className="d-flex d-lg-block d-xl-flex">
                      <span>
                        <img
                          className="icon img-fluid"
                          src="../assets/img/Total_Ads_Played.svg"
                        />
                      </span>
                      <div className="ml-3">
                        <p className="tx-bold tx-bold tx-28 mg-b-0 lh-1 white">
                          {influencerCampaignList &&
                          influencerCampaignList.length
                            ? influencerCampaignList.length
                            : 0}
                          {influencerCampaignList.length > 1000 ? "k" : ""}
                        </p>
                        <p className="tx-gray tx-12 tx-14 mb-0">
                          Total Campaigns
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* col */}
                <div className="col-sm-6 col-xs-6 col-lg-3 mg-t-10">
                  <div className="card card-body p-3 rounded bd-0 shadow-sm">
                    <div className="d-flex d-lg-block d-xl-flex">
                      <span>
                        <img
                          className="icon img-fluid"
                          src="../assets/img/my2.svg"
                        />
                      </span>
                      <div className="ml-3">
                        <p className="tx-bold tx-bold tx-28 mg-b-0 lh-1 white">
                          9,320
                        </p>
                        <p className="tx-gray tx-12 tx-14 mb-0">
                          Approved Campaigns
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* col */}
                <div className="col-sm-6 col-xs-6 col-lg-3 mg-t-10">
                  <div className="card card-body p-3 rounded bd-0 shadow-sm">
                    <div className="d-flex d-lg-block d-xl-flex">
                      <span>
                        <img
                          className="icon img-fluid"
                          src="../assets/img/my3.svg"
                        />
                      </span>
                      <div className="ml-3">
                        <p className="tx-bold tx-bold tx-28 mg-b-0 lh-1 white">
                          370,520
                        </p>
                        <p className="tx-gray tx-12 tx-14 mb-0">
                          Pending Campaigns
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* col */}
                <div className="col-sm-6 col-xs-6 col-lg-3 mg-t-10">
                  <div className="card card-body p-3 rounded bd-0 shadow-sm">
                    <div className="d-flex d-lg-block d-xl-flex">
                      <span>
                        <img
                          className="icon img-fluid"
                          src="../assets/img/Reported_Ads.svg"
                        />
                      </span>
                      <div className="ml-3">
                        <p className="tx-bold tx-bold tx-28 mg-b-0 lh-1 white">
                          246K
                        </p>
                        <p className="tx-gray tx-12 tx-14 mb-0">
                          Rejected Campaigns
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* col */}
              </div>
              <div className="card rounded bd-0 shadow-sm mg-t-40">
                {/* <div className="card-header bd-b-0 pd-b-0 pd-t-40 pd-md-x-30">
                  <div className>
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
                                htmlFor="customCheck"
                              ></label>
                            </div>
                          </div>
                          <div>
                            <div className="search-form w-100">
                              <input
                                type="search"
                                className="form-control bg-search"
                                placeholder="Search in Campaigns"
                              />
                              <button className="btn" type="button">
                                <FeatherIcon icon="search" />
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
                                htmlFor="inputEmail3"
                                className="col-3 col-form-label pd-r-0"
                              >
                                Sort by
                              </label>
                              <div className="col-9">
                                <select className="custom-select">
                                  <option selected>Most recent</option>
                                  <option value={1}>One</option>
                                  <option value={2}>Two</option>
                                  <option value={3}>Three</option>
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
                                    <FeatherIcon
                                      icon="download"
                                      className="mg-r-5"
                                    />
                                    Export as
                                  </span>
                                </button>
                              </div>
                              <div>
                                <div className="d-flex justify-content-end">
                                  <button className="btn">
                                    <span>
                                      <FeatherIcon
                                        icon="printer"
                                        className="tx-primary mg-r-5 print-icon"
                                      />
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
                </div> */}
                <div className="card-body pd-md-x-30 pd-t- mg-t-20 mg-md-t-0">
                  {/* <table className="table display table-hover">
                    <thead className="tx-uppercase">
                      <tr>
                        <th scope="col" />
                        <th scope="col">Campaign Name</th>
                        <th scope="col">Channel</th>
                        <th scope="col">Date Created</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck1"
                            />
                            <div></div>
                          </div>
                        </th>
                        <td>Art Campaign</td>
                        <td>Instagram, twitter. Snapchat</td>
                        <td>01 Mar, 2021</td>
                        <td>
                          <span className="badge badge-active tx-14">
                            {" "}
                            Approved
                          </span>{" "}
                        </td>
                        <td>
                          <a
                            href="./view-campaign.html"
                            className="tx-black tx-14"
                          >
                            <div className="d-flex">
                              <i className="fa fa-eye tx-orange pd-t-4 mg-r-5" />
                              View
                            </div>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck2"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck2"
                            />
                            <div></div>
                          </div>
                        </th>
                        <td>Enterprise Table</td>
                        <td>Instagram, twitter</td>
                        <td>01 Mar, 2021</td>
                        <td>
                          <span className="badge badge-pink tx-14">
                            {" "}
                            Rejected
                          </span>{" "}
                        </td>
                        <td>
                          <a
                            href="./view-campaign.html"
                            className="tx-black tx-14"
                          >
                            <div className="d-flex">
                              <i className="fa fa-eye tx-orange pd-t-4 mg-r-5" />
                              View
                            </div>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck3"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck3"
                            />
                            <div></div>
                          </div>
                        </th>
                        <td>HOR campaign</td>
                        <td>Instagram, twitter. Snapchat</td>
                        <td>01 Mar, 2021</td>
                        <td>
                          <span className="badge badge-active tx-14">
                            {" "}
                            Approved
                          </span>{" "}
                        </td>
                        <td>
                          <a
                            href="./view-campaign.html"
                            className="tx-black tx-14"
                          >
                            <div className="d-flex">
                              <i className="fa fa-eye tx-orange pd-t-4 mg-r-5" />
                              View
                            </div>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck4"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck4"
                            />
                            <div></div>
                          </div>
                        </th>
                        <td>Art Campaign</td>
                        <td>Instagram</td>
                        <td>01 Mar, 2021</td>
                        <td>
                          <span className="badge badge-pink tx-14">
                            {" "}
                            Rejected
                          </span>{" "}
                        </td>
                        <td>
                          <a
                            href="./view-campaign.html"
                            className="tx-black tx-14"
                          >
                            <div className="d-flex">
                              <i className="fa fa-eye tx-orange pd-t-4 mg-r-5" />
                              View
                            </div>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck5"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck5"
                            />
                            <div></div>
                          </div>
                        </th>
                        <td>Art Campaign</td>
                        <td>twitter. Snapchat</td>
                        <td>01 Mar, 2021</td>
                        <td>
                          <span className="badge badge-pending tx-14">
                            {" "}
                            Pending
                          </span>{" "}
                        </td>
                        <td>
                          <a
                            href="./view-campaign.html"
                            className="tx-black tx-14"
                          >
                            <div className="d-flex">
                              <i className="fa fa-eye tx-orange pd-t-4 mg-r-5" />
                              View
                            </div>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table> */}
                  <MDBDataTable
                    responsive
                    data={setAllCampaigns()}
                    className="px-3 scroll"
                    // onSort={(s) => console.log(s)}
                    // order={["dateCreated", "desc"]}
                    bordered
                    striped
                    hover
                    // checkboxFirstColumn
                    pagingTop
                    barReverse
                    searchTop
                    searchBottom={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
