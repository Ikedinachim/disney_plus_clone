import React, { Fragment, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import MetaData from '../../../layout/MetaData'
import NumberFormat from 'react-number-format'

import { getWallet } from '../../../../actions/billingActions'
import { createSmsCampaignAction, clearErrors } from '../../../../actions/campaignActions';
import { SMS_CAMPAIGN_RESET } from '../../../../constants/campaignConstants'
import Loader from '../../../loader';

const PreviewCampaign = ({ nextStep, prevStep, values, audience }) => {
    
    const { error, createSmsCampaign, loading } = useSelector(state => state.smsCampaign || [])
    const alert = useAlert();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { wallet } = useSelector(state => state.wallet)

    const Continue = e => {
        e.preventDefault();
        nextStep();
    }

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }

    const submitSmsCampaignHandler = (e) => {
        e.preventDefault();
        dispatch(createSmsCampaignAction(values))    
    }
    
    useEffect( () => {
        if(createSmsCampaign && createSmsCampaign.status === 'success') {
            alert.success(createSmsCampaign.message)
            dispatch(getWallet())
            navigate('/app/campaigns')
            dispatch({ type: SMS_CAMPAIGN_RESET })
        } else if(error) {
            alert.error(error)
            dispatch(clearErrors())
            dispatch(getWallet())
        }
    }, [dispatch, alert, error, createSmsCampaign, navigate])

    return (
        <Fragment>
            {loading ? <Loader /> : (
            <Fragment>
                <MetaData title={"Preview Campaign"} />
                    <div className="content-body">
                        <div className="container pd-x-0">
                            <div className="row justify-content-between">
                                <div className="col-md-6 mg-b-20 mg-md-b-0">
                                    <Link to="/app/campaign/create" className="tx-black">
                                        <div className="d-flex">
                                            <div>
                                                <i className="fa fa-angle-left mg-r-10 pd-t-15 tx-18" />
                                            </div>
                                            <div>
                                                <p className="tx-28 tx-bold mb-0">Campaigns</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="pd-md-y-20">
                                <div className="card rounded bd-0 shadow-sm">
                                    <div className="card-body pd-lg-x-50">
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex">
                                                <div className="mg-r-20">
                                                    <img
                                                        src="../../../../assets/img/Brand_Awareness.svg"
                                                        className="img-fluid wd-50 ht-50"
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <p className="tx-20 tx-bold pd-t-15 tx-com capitalize">
                                                        {values.channel}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="d-flex pd-t-25">
                                                    <div>
                                                        <i className="fa fa-edit tx-primary mg-r-5" />
                                                    </div>
                                                    <p className="mb-0">Edit</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className=" mg-b-20 mg-md-b-10">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p className="tx-18 mb-0 tx-bold tx-com">
                                                        Campaign Information
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="d-flex pd-t-3">
                                                        <div>
                                                            <i className="fa fa-edit tx-primary mg-r-5" />
                                                        </div>
                                                        <p className="mb-0">Edit</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mg-t-15">
                                                <div className="form-group col-md-12">
                                                    <label htmlFor className="tx-14 tx-gray mb-0 tx-medium">
                                                        Campaign Message
                                                    </label>
                                                    <p className="tx-15 mb-0">
                                                        {values.campaignMessage}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <hr />
                                        <div className="mg-b-20 mg-md-b-10">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                <p className="tx-18 mb-0 tx-bold tx-com">Target Audience</p>
                                                </div>
                                                <div>
                                                <div className="d-flex pd-t-3">
                                                    <div>
                                                    <i className="fa fa-edit tx-primary mg-r-5" />
                                                    </div>
                                                    <p className="mb-0">Edit</p>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="form-row mg-t-15">
                                                <div className="col-md-3 form-group">
                                                <label
                                                    htmlFor
                                                    className="tx-14 tx-gray mb-0 tx-medium d-block"
                                                >
                                                    Age Range
                                                </label>
                                                <div className="d-flex">
                                                    <span className="badge badge-pink tx-14 mg-5">
                                                    {" "}
                                                    13-24 years
                                                    </span>
                                                    <span className="badge badge-pink tx-14 mg-5">
                                                    {" "}
                                                    13-24 years
                                                    </span>
                                                </div>
                                                </div>
                                                <div className="col-md-1 form-group">
                                                <label
                                                    htmlFor
                                                    className="tx-14 tx-gray mb-0 tx-medium d-block"
                                                >
                                                    Gender
                                                </label>
                                                <span className="badge badge-pink tx-14 mg-5"> Male</span>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor className="tx-14 tx-gray mb-0 tx-medium d-block">
                                                Location
                                                </label>
                                                <div className="d-flex">
                                                <span className="badge badge-pink tx-14 mg-5"> Adamawa</span>
                                                <span className="badge badge-pink tx-14 mg-5">
                                                    {" "}
                                                    Maidugairi
                                                </span>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor className="tx-14 tx-gray mb-0 tx-medium d-block">
                                                Interest
                                                </label>
                                                <span className="badge badge-pink tx-14 mg-5">
                                                {" "}
                                                Surfing Net
                                                </span>
                                            </div>
                                        </div> */}
                                        <hr />
                                        <div className="mg-b-20 mg-md-b-10">
                                            <p className="tx-18 tx-com tx-semibold mb-0">Pricing</p>
                                            <div className="form-group mg-t-15">
                                                <label htmlFor className="tx-14 tx-gray mb-1 tx-medium">
                                                    Potential Audience Based on Manual Input
                                                </label>
                                                <p className="tx-18 tx-com tx-bold mb-0">
                                                    {audience} 
                                                    <span className="tx-14 tx-gray tx-medium">number(s) loaded</span>
                                                </p>
                                            </div>
                                            <div className="form-row mg-t-15 pd-x-0">
                                                <div className=" col-md-2 d-flex">
                                                    <p className="tx-18 tx-com tx-bold mb-0">Amount:</p>
                                                    <span className="badge tx-green tx-bold tx-18 mg-5 tx-amt w-100 mt-0">
                                                        {" "}
                                                        <NumberFormat 
                                                            value={values.price} 
                                                            displayType={'text'} 
                                                            thousandSeparator={true} 
                                                            prefix={'₦'} 
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5 pd-x-0 mg-y-40">
                                            <div className="mg-t-20 d-flex">
                                                {wallet.balance < values.price ?
                                                    <button
                                                        className="btn btn-primary w-100 tx-com mg-r-15"
                                                        onClick={ Continue }
                                                        disabled={ loading ? true : false }
                                                        type="submit"
                                                        variant="contained"
                                                    >
                                                        Fund Wallet
                                                    </button>
                                                    :
                                                    <button
                                                        className="btn btn-primary w-100 tx-com mg-r-15"
                                                        onClick={ submitSmsCampaignHandler }
                                                        disabled={ loading ? true : false }
                                                        type="submit"
                                                        variant="contained"
                                                    >
                                                        Publish
                                                    </button>
                                                }
                                                <button
                                                    className="btn btn-outline-primary w-100 tx-com mg-r-15"
                                                    onClick={ Previous }
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    Go Back
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

export default PreviewCampaign