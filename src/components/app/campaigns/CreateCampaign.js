import React, { Fragment, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'

import MetaData from '../../layout/MetaData'
import Loader from '../../loader'
import { getWallet, clearErrors } from '../../../actions/billingActions'
import { getSenderID } from '../../../actions/senderIDActions';

const CreateCampaign = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user, loading, error } = useSelector(state => state.auth)

    useEffect( () => {
        if (!isAuthenticated || user === null) {
            navigate('/login')
        }

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getWallet())
        dispatch(getSenderID())
    }, [dispatch, alert, error, isAuthenticated, navigate, user])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Create a Campaign"} />
                        <div className="content-body">
                            <div className="container pd-x-0">
                                <div className="pd-y-20">
                                    <div className="d-flex justify-content-between">
                                        <p className="tx-18 mb-0">30%</p>
                                        <p className="tx-18 mb-0">1 out of 3</p>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar bg-primary progress-bar-striped progress-bar-animated wd-20p" role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                    <div className="pd-md-y-40">
                                        <p className="tx-24 tx-bold mb-1">Create a campaign!</p>
                                        <p className="tx-14">Select the goal that would make the campaign successful for you</p>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-3 col-12 mg-t-20">
                                                <Link to="/app/campaign/create" className="tx-dark">
                                                    <div className="card card-height rounded bd-0 shadow-sm">
                                                        <div className="card-body tx-center pd-x-12 pd-md-x-30">
                                                            <img src="../../../assets/img/Influencer_Marketing_sm.png" alt="" className="img-fluid" />
                                                            <div className="pd-t-15">
                                                                <p className="tx-16 tx-bold">Influential Marketing</p>
                                                                <p className="tx-14 tx-gray mb-0">Tap from our unlimited network of top influencers</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-6 col-lg-3 col-12 mg-t-20">
                                                <Link to="/app/campaign/sms" className="tx-dark">
                                                    <div className="card card-height rounded bd-0 shadow-sm">
                                                        <div className="card-body tx-center pd-x-12 pd-md-x-30">
                                                            <img src="../../../assets/img/flashsms_sm.png" alt="" className="img-fluid" />
                                                            <div className="pd-t-15">
                                                                <p className="tx-16 tx-bold">Flash SMS / SMS</p>
                                                                <p className="tx-14 tx-gray mb-0">Hit your right target with smart SMS</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-6 col-lg-3 col-12 mg-t-20">
                                                <Link to="/app/campaign/flier-video" className="tx-dark">
                                                    <div className="card card-height rounded bd-0 shadow-sm">
                                                        <div className="card-body tx-center pd-x-12">
                                                            <img src="../../../assets/img/flier_campaign_sm.png" alt="" className="img-fluid" />
                                                            <div className="pd-t-15">
                                                                <p className="tx-16 tx-bold">Flier/Video Campaign</p>
                                                                <p className="tx-14 tx-gray mb-0">Bring speed and scale to your business with juicy and premium offers for your customers</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-6 col-lg-3 col-12 mg-t-20">
                                                <Link to="/app/campaign/app-download" className="tx-dark">
                                                    <div className="card card-height rounded bd-0 shadow-sm">
                                                        <div className="card-body tx-center pd-x-12">
                                                            <img src="../../../assets/img/mysogi_phone_sm.png" alt="" className="img-fluid" />
                                                            <div className="pd-t-15">
                                                                <p className="tx-16 tx-bold">APP Download Campaign</p>
                                                                <p className="tx-14 tx-gray mb-0">Get access to a new world of campaigning with the right touch</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mx-auto tx-center mg-y-40 mg-md-y-60">
                                            <div className="d-flex">
                                                <Link to="/app" className="btn btn-outline-primary wd-200 mg-l-20">Go Back</Link>
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

export default CreateCampaign