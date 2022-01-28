import React, { Fragment, useEffect } from "react";
import { getAllCampaign } from "../../../actions/campaignActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AllCampaignCard from "./AllCampaignCard";

const AllCampaigns = () => {
  const dispatch = useDispatch();
  const { allCampaign } = useSelector((state) => state.allCampaign || {});

  useEffect(() => {
    dispatch(getAllCampaign());
  }, [dispatch]);
  console.log(allCampaign);
  return (
    <Fragment>
      <div className="content-body">
        <div className="container pd-x-0">
          <div className="row justify-content-between">
            <div className="col-md-6 col-6">
              <Link to="../billing" className="tx-black">
                <div className="mg-b-0 tx-26 tx-bold">
                  <i className="fa fa-angle-left mg-r-10 pd-t-15 tx-18"></i>
                  <span>Campaigns</span>
                </div>
              </Link>
            </div>
            <div className="col-md-2 col-6">
              <p>
                <a href="./create-campaign.html" className="btn btn-primary">
                  {" "}
                  New Campaign
                </a>
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
              <ul className="nav nav-line" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link tab active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    All Campaigns
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link tab"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Users
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link tab"
                    id="prof-tab"
                    data-toggle="tab"
                    href="#prof"
                    role="tab"
                    aria-controls="prof"
                    aria-selected="false"
                  >
                    Influencers
                  </a>
                </li>
              </ul>
              <div className="tab-content bd-t-0" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="pd-y-20">
                    <table className="table display table-hover">
                      <thead className="tx-uppercase">
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Campaign Name</th>
                          <th scope="col">AD Type</th>
                          <th scope="col">Cost</th>
                          <th scope="col">Date Generated</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* body of campaign all campaign */}
                        {allCampaign &&
                          allCampaign.map((allCampaign) => (
                            <AllCampaignCard campaign={allCampaign} />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="card-body">
                    <table className="table display table-hover">
                      <thead className="tx-uppercase">
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">NAME</th>
                          <th scope="col">EMAIL ADDRESS</th>
                          <th scope="col">PHONE NUMBER</th>
                          <th scope="col">WALLET BALANCE</th>
                          <th scope="col">Status</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck11"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck11"
                              >
                                <div className="avatar avatar-sm">
                                  <img
                                    src="./assets/img/staff.png"
                                    className="rounded-circle"
                                    alt=""
                                  />
                                </div>
                              </label>
                            </div>
                          </th>
                          <td>Segun Bakare</td>
                          <td>Lanrekosoko@gmail.com</td>
                          <td>08135627364</td>
                          <td>#0.00</td>
                          <td>
                            <span className="badge badge-active tx-14">
                              {" "}
                              Active
                            </span>{" "}
                          </td>
                          <td>
                            <div className="dropdown">
                              <span
                                className=""
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                              </span>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a className="dropdown-item" href="">
                                  {" "}
                                  <i
                                    data-feather="edit"
                                    className="favourite-icon mr-2 wd-15 ht-15"
                                  ></i>
                                  Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i
                                    data-feather="trash-2"
                                    className="favourite-icon mr-2 wd-15 ht-15"
                                  ></i>
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck12"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck12"
                              >
                                <div className="avatar avatar-sm">
                                  <img
                                    src="./assets/img/staff.png"
                                    className="rounded-circle"
                                    alt=""
                                  />
                                </div>
                              </label>
                            </div>
                          </th>
                          <td>Segun Bakare</td>
                          <td>Lanrekosoko@gmail.com</td>
                          <td>08135627364</td>
                          <td>#0.00</td>
                          <td>
                            <span className="badge badge-pink tx-14">
                              {" "}
                              Inactive
                            </span>{" "}
                          </td>
                          <td>
                            <div className="dropdown">
                              <span
                                className=""
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                              </span>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a className="dropdown-item" href="">
                                  {" "}
                                  <i
                                    data-feather="edit"
                                    className="favourite-icon mr-2 wd-15 ht-15"
                                  ></i>
                                  Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i
                                    data-feather="trash-2"
                                    className="favourite-icon mr-2 wd-15 ht-15"
                                  ></i>
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck13"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck13"
                              >
                                <div className="avatar avatar-sm">
                                  <img
                                    src="./assets/img/staff.png"
                                    className="rounded-circle"
                                    alt=""
                                  />
                                </div>
                              </label>
                            </div>
                          </th>
                          <td>Segun Bakare</td>
                          <td>Lanrekosoko@gmail.com</td>
                          <td>08135627364</td>
                          <td>#0.00</td>
                          <td>
                            <span className="badge badge-active tx-14">
                              {" "}
                              Active
                            </span>{" "}
                          </td>
                          <td>
                            <div className="dropdown">
                              <span
                                className=""
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                              </span>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a className="dropdown-item" href="">
                                  {" "}
                                  <i
                                    data-feather="edit"
                                    className="favourite-icon mr-2 wd-15 ht-15"
                                  ></i>
                                  Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i
                                    data-feather="trash-2"
                                    className="favourite-icon mr-2 wd-15 ht-15"
                                  ></i>
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="prof"
                  role="tabpanel"
                  aria-labelledby="prof-tab"
                >
                  <div className="card-body">
                    <table className="table display table-hover">
                      <thead className="tx-uppercase">
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">NAME</th>
                          <th scope="col">OCCUPATION</th>
                          <th scope="col">AVAILABLE ON</th>
                          <th scope="col" className="tx-right">
                            CAMPAIGN
                          </th>
                          <th scope="col">REVENUE</th>
                          <th scope="col">Status</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck11"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck11"
                              >
                                <div className="avatar avatar-sm">
                                  <img
                                    src="./assets/img/staff.png"
                                    className="rounded-circle"
                                    alt=""
                                  />
                                </div>
                              </label>
                            </div>
                          </th>
                          <td>Sydney Talker</td>
                          <td>Content Creator</td>
                          <td>Instagram, Twitter, Snapchat</td>
                          <td className="tx-right">45</td>
                          <td className="">₦2,500.00</td>
                          <td>
                            <span className="badge badge-active tx-14">
                              {" "}
                              Active
                            </span>{" "}
                          </td>
                          <td>
                            <div className="dropdown">
                              <span
                                className=""
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                              </span>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a className="dropdown-item" href="">
                                  {" "}
                                  <i
                                    data-feather="edit"
                                    className="favourite-icon mr-2 wd-15 ht-15"
                                  ></i>
                                  Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i
                                    data-feather="trash-2"
                                    className="favourite-icon mr-2 wd-15 ht-15"
                                  ></i>
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck12"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck12"
                              >
                                <div className="avatar avatar-sm">
                                  <img
                                    src="./assets/img/staff.png"
                                    className="rounded-circle"
                                    alt=""
                                  />
                                </div>
                              </label>
                            </div>
                          </th>
                          <td>Sydney Talker</td>
                          <td>Content Creator</td>
                          <td>Instagram, Twitter, Snapchat</td>
                          <td className="tx-right">45</td>
                          <td className="">₦2,500.00</td>
                          <td>
                            <span className="badge badge-pink tx-14">
                              {" "}
                              Inactive
                            </span>{" "}
                          </td>
                          <td>
                            <div className="dropdown">
                              <span
                                className=""
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                              </span>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a className="dropdown-item" href="">
                                  {" "}
                                  <i
                                    data-feather="edit"
                                    className="favourite-icon mr-2 wd-15 ht-15"
                                  ></i>
                                  Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i
                                    data-feather="trash-2"
                                    className="favourite-icon mr-2 wd-15 ht-15"
                                  ></i>
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck13"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck13"
                              >
                                <div className="avatar avatar-sm">
                                  <img
                                    src="./assets/img/staff.png"
                                    className="rounded-circle"
                                    alt=""
                                  />
                                </div>
                              </label>
                            </div>
                          </th>
                          <td>Sydney Talker</td>
                          <td>Content Creator</td>
                          <td>Instagram, Twitter, Snapchat</td>
                          <td className="tx-right">45</td>
                          <td className="">₦2,500.00</td>
                          <td>
                            <span className="badge badge-active tx-14">
                              {" "}
                              Active
                            </span>{" "}
                          </td>
                          <td>
                            <div className="dropdown">
                              <span
                                className=""
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                              </span>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a className="dropdown-item" href="">
                                  {" "}
                                  <i
                                    data-feather="edit"
                                    className="favourite-icon mr-2 wd-15 ht-15"
                                  ></i>
                                  Edit
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i
                                    data-feather="trash-2"
                                    className="favourite-icon mr-2 wd-15 ht-15"
                                  ></i>
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AllCampaigns;
