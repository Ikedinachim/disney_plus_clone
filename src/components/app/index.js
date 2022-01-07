import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import FeatherIcon from 'feather-icons-react';
import { useAlert } from 'react-alert'

const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, user } = useSelector(state => state.auth)
    const { error } = useSelector(state => state.wallet)

    const [isActive, setActive] = useState("false");
    
    const ToggleClass = (e) => {
        setActive(!isActive); 
        e.preventDefault()
    };

    // const resetPropagation = (e) => { 
    //     e.stopPropagation()
    //     e.preventDefault()
    //  }

     useEffect(() => {
        if(error) {
            return alert.error(error)
        }
    }, [dispatch, error, alert ])

    return (
        
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Dashboard"} />
                    {/* <Outlet /> */}
                        <div className="content-body">
                            <div className="container pd-x-0">
                                <p className="mg-b-0 tx-26 tx-bold tx-com">
                                    Hello {" "}
                                    <span className> 
                                        {user.user.firstName},
                                    </span> what would you like to do?
                                </p>
                                <div className="row justify-content-between">
                                    <div className="col-md-6 col-12">
                                        <p className="tx-14 mg-b-30 tx-gray tx-medium">
                                        Select any of the options to proceed
                                        </p>
                                    </div>
                                </div>
                                <div id="myCard" >
                                    <div className={`card ${isActive ? "card-active" : null}`} onClick={ToggleClass}>
                                        <div className="card-body">
                                            <FeatherIcon icon="check-circle" className="check" />
                                            <div className="row">
                                                <div className="col-md-2 col-lg-2 col-2 mg-t-20 tx-center">
                                                    <img
                                                        src="../../assets/img/Create_Campaign.svg"
                                                        className="img-fluid pd-md-t-40 pd-t-20"
                                                        alt="asset"
                                                        srcSet
                                                    />
                                                </div>
                                                <div className={`col-md-5 col-10 mg-t-20 pd-md-b-40 ${!isActive ? "disabler" : null}`}>
                                                    <p className="tx-24 tx-bold mb-4 tx-com">
                                                        Create an Ad Campaign
                                                    </p>
                                                    <p className="tx-14 col-md-10 pd-x-0">
                                                        Create New Ad to tap into our massive and diverse customer
                                                        base to market your product and offers.
                                                    </p>
                                                    <button
                                                        type="button"
                                                        disabled={!isActive}
                                                        // navigate = "/app/create"                                     
                                                        className="btn btn-primary pd-x-40"
                                                        onClick={() => navigate("/app/campaign/create")}
                                                    >
                                                        Get Started
                                                    </button>
                                                </div>
                                                <div className="col-md-5 d-md-block d-xl-block d-lg-block d-none">
                                                    <div className="neg-div">
                                                        <img
                                                            src="../../assets/img/create_ads_illustration.svg"
                                                            id="secondImg"
                                                            className={`img-fluid ${isActive ? "d-block" : null}`}
                                                            alt="asset"
                                                        />
                                                        <img
                                                            src="../../assets/img/become_partners_illustration.svg"
                                                            id="firstImg"
                                                            className={`img-fluid mg-t-100 ${!isActive ? "d-block" : "d-none"}`}
                                                            alt="asset"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`card mg-t-40 ${!isActive ? "card-active" : null}`} onClick={ToggleClass}>
                                        <div className="card-body">
                                            <FeatherIcon icon="check-circle" className="check" />
                                            <div className="row">
                                                <div className="col-md-2 col-lg-2 col-2 mg-t-20 tx-center">
                                                    <img
                                                        src="../../assets/img/Become_partner.svg"
                                                        className="img-fluid pd-md-t-40 pd-t-20"
                                                        alt="asset"
                                                        srcSet
                                                    />
                                                </div>
                                                <div className={`col-md-5 col-10 mg-t-20 pd-md-b-40 ${isActive ? "disabler" : null}`}>
                                                    <p className="tx-24 tx-bold mb-4 tx-com">All Campaigns</p>
                                                    <p className="tx-14 tx-blac col-md-9 pd-x-0">
                                                        Tap into Mysogi massive and diverse customer base to market
                                                        your product and offers.
                                                    </p>
                                                    <button
                                                        type="button"
                                                        disabled={isActive}
                                                        href="./all-campaigns.html"
                                                        className="btn btn-primary pd-x-30"
                                                        onClick={() => navigate("/app/campaigns")}
                                                        // onClick={resetPropagation}
                                                    >
                                                        All Campaigns
                                                    </button>
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
                </Fragment>
            )}
        </Fragment>
    )
}

export default Dashboard