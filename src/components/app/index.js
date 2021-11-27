import React, { Fragment, useEffect } from 'react'
import { Link, BrowserRouter } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../actions/authActions'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

const Dashboard = () => {


    const { user, loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        alert.success("Logged out successfully")
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Dashbord"} />
                    <Sidebar />
                    <div className="content ht-100v pd-0">
                        <div className="content-header shadow-dash bd-b-0">
                        <div className="content-search">
                            <i data-feather="search" />
                            <input type="search" className="form-control" placeholder="Search..." />
                        </div>
                        <nav className="nav">
                            <div className=" ml-md-4 ml-2 mg-t-5">
                            <div className="d-flex">
                                <a
                                href="./wallet.html"
                                className="tx-semibold tx-orange pd-t-1 mg-r-5"
                                style={{ textDecoration: "underline" }}
                                >
                                Fund wallet
                                </a>
                                <span className="mg-l-3 tx-14 tx-medium">
                                <img src="./assets/img/campaign.svg" alt srcSet />
                                Balance:N50,000
                                </span>
                            </div>
                            </div>
                            <div className="dropdown dropdown-profile ml-md-4 ml-2">
                            <a
                                href
                                className="dropdown-link tx-dark tx-13 tx-medium"
                                data-toggle="dropdown"
                                data-display="static"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                John Doe
                                <div className="avatar avatar-sm mg-l-10">
                                <img
                                    src="https://via.placeholder.com/500"
                                    className="rounded-circle"
                                    alt
                                />
                                </div>
                            </a>
                            {/* dropdown-link */}
                            <div className="dropdown-menu dropdown-menu-right tx-13">
                                <div className="avatar avatar-lg mg-b-15">
                                <img
                                    src="https://via.placeholder.com/500"
                                    className="rounded-circle"
                                    alt
                                />
                                </div>
                                <h6 className="tx-semibold mg-b-5">Katherine Pechon</h6>
                                <p className="mg-b-25 tx-12 tx-color-03">Administrator</p>
                                <a href className="dropdown-item">
                                <i data-feather="edit-3" /> Edit Profile
                                </a>
                                <a href="page-profile-view.html" className="dropdown-item">
                                <i data-feather="user" /> View Profile
                                </a>
                                <div className="dropdown-divider" />
                                <a href="page-help-center.html" className="dropdown-item">
                                <i data-feather="help-circle" /> Help Center
                                </a>
                                <a href className="dropdown-item">
                                <i data-feather="life-buoy" /> Forum
                                </a>
                                <a href className="dropdown-item">
                                <i data-feather="settings" />
                                Account Settings
                                </a>
                                <a href className="dropdown-item">
                                <i data-feather="settings" />
                                Privacy Settings
                                </a>
                                <Link to="/" className="dropdown-item" onClick={logoutHandler}>
                                <i data-feather="log-out" />
                                Sign Out
                                </Link>
                            </div>
                            {/* dropdown-menu */}
                            </div>
                        </nav>
                        </div>
                        {/* content-header */}
                        <div className="content-body">
                        <div className="container pd-x-0">
                            <p className="mg-b-0 tx-26 tx-bold tx-com">
                            Hello <span className> Olatunde,</span> what would you like to do?
                            </p>
                            <div className="row justify-content-between">
                            <div className="col-md-6 col-12">
                                <p className="tx-14 mg-b-30 tx-gray tx-medium">
                                Select any of the options to proceed
                                </p>
                            </div>
                            </div>
                            <div id="myCard">
                            <div className="card">
                                <div className="card-body">
                                <i data-feather="check-circle" className="check" />
                                <div className="row">
                                    <div className="col-md-2 col-lg-2 col-2 mg-t-20 tx-center">
                                    <img
                                        src="./assets/img/Create_Campaign.svg"
                                        className="img-fluid pd-md-t-40 pd-t-20"
                                        alt
                                        srcSet
                                    />
                                    </div>
                                    <div className="col-md-5 col-10 mg-t-20 pd-md-b-40 disabler">
                                    <p className="tx-24 tx-bold mb-4 tx-com">
                                        Create an Ad Campaign
                                    </p>
                                    <p className="tx-14 col-md-10 pd-x-0">
                                        Create New Ad to tap into our massive and diverse customer
                                        base to market your product and offers.
                                    </p>
                                    <a
                                        href="./create-campaign.html"
                                        className="btn btn-primary pd-x-40"
                                    >
                                        Get Started
                                    </a>
                                    </div>
                                    <div className="col-md-5 d-md-block d-xl-block d-lg-block d-none">
                                    <div className="neg-div">
                                        <img
                                        src="./assets/img/create_ads_illustration.svg"
                                        id="secondImg"
                                        className="img-fluid"
                                        alt
                                        srcSet
                                        />
                                        <img
                                        src="./assets/img/become_partners_illustration.svg"
                                        id="firstImg"
                                        className="img-fluid mg-t-100"
                                        alt
                                        srcSet
                                        />
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="card mg-t-40 card-active">
                                <div className="card-body">
                                <i data-feather="check-circle" className="check" />
                                <div className="row">
                                    <div className="col-md-2 col-lg-2 col-2 mg-t-20 tx-center">
                                    <img
                                        src="./assets/img/Become_partner.svg"
                                        className="img-fluid pd-md-t-40 pd-t-20"
                                        alt
                                        srcSet
                                    />
                                    </div>
                                    <div className="col-md-5 col-10 mg-t-20 pd-md-b-40">
                                    <p className="tx-24 tx-bold mb-4 tx-com">All Campaigns</p>
                                    <p className="tx-14 tx-blac col-md-9 pd-x-0">
                                        Tap into Mysogi massive and diverse customer base to market
                                        your product and offers.
                                    </p>
                                    <a
                                        href="./all-campaigns.html"
                                        className="btn btn-primary pd-x-30"
                                    >
                                        All Campaigns
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            {/*Home Modal */}
                            <div
                            className="modal fade"
                            id="homeModal"
                            tabIndex={-1}
                            aria-labelledby="homeModalLabel"
                            aria-hidden="true"
                            >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content pd-md-x-30 pd-x-20 pd-y-20">
                                <div className="modal-header bd-b-0">
                                    <p className="tx-18 modal-title" id="homeModalLabel">
                                    Go back to home
                                    </p>
                                    <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    >
                                    <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p className="tx-16 tx-gray mb-0">
                                    Are you sure you want to leave this page?
                                    </p>
                                </div>
                                <div className="modal-footer bd-t-0">
                                    <a
                                    href="./home.html"
                                    type="button"
                                    className="btn btn-primary w-100"
                                    >
                                    Continue
                                    </a>
                                    <button
                                    type="button"
                                    className="btn btn-outline-primary w-100"
                                    data-dismiss="modal"
                                    >
                                    No, Thanks
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Dashboard