import React, { Fragment, useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'

import MetaData from '../../layout/MetaData'
import Loader from '../../loader'
import { fundUserWallet, getWallet, clearErrors } from '../../../actions/billingActions'
import NumberFormat from 'react-number-format'
import { FUND_WALLET_RESET } from '../../../constants/billingConstants'

const PreviewCampaign = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    // dispatch(getWallet())
    const navigate = useNavigate();

    const [amount, setAmountToPay] = useState('')
    // const {amount} = amountToPay
    const { fundWallet, loading, error } = useSelector(state => state.fundWallet)
    const { wallet } = useSelector(state => state.wallet)
    const { isAuthenticated, user } = useSelector(state => state.auth)

    // const dispatch = useDispatch()

    const [isActive, setActive] = useState("false");

    // console.log(user.user);
    
    const ToggleAudience = (e) => {
        setActive(!isActive); 
        e.preventDefault()
    };


    const createCampaignHandler = (e) => {
        e.preventDefault();

        // const formData = new FormData();
        const obj = JSON.parse(`{"amount": ${amount}}`);

        dispatch(fundUserWallet(obj))
        setAmountToPay("");
    }

    useEffect( () => {

        if (!isAuthenticated || user === null) {
            navigate('/login')
        }else if(!loading && fundWallet.status === "success") {
            alert.success(fundWallet.message)
            dispatch({ type: FUND_WALLET_RESET })
            navigate('/app/billing')
        }

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getWallet())
    }, [dispatch])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Sender ID"} />
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
                                                    src="./assets/img/Brand_Awareness.svg"
                                                    className="img-fluid wd-50 ht-50"
                                                    alt
                                                    srcSet
                                                />
                                                </div>
                                                <div>
                                                <p className="tx-20 tx-bold pd-t-15 tx-com">Flash SMS</p>
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
                                                    Get unlimited offer with Tizeti LTD. Super fast and reliable
                                                    network access All day long
                                                </p>
                                                </div>
                                            </div>
                                            </div>
                                            <hr />
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
                                            </div>
                                            <hr />
                                            <div className="mg-b-20 mg-md-b-10">
                                            <p className="tx-18 tx-com tx-semibold mb-0">Pricing</p>
                                            <div className="form-group mg-t-15">
                                                <label htmlFor className="tx-14 tx-gray mb-1 tx-medium">
                                                Potential Audience Based on filter
                                                </label>
                                                <p className="tx-18 tx-com tx-bold mb-0">268,000</p>
                                            </div>
                                            <div className="form-row mg-t-15 col-lg-6 pd-x-0">
                                                <div className="form-group col-md-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter your target audience number to get price"
                                                />
                                                </div>
                                                <div className="form-group col-md-3">
                                                <span className="badge badge-pink  tx-18 mg-5 tx-amt w-100 mt-0">
                                                    {" "}
                                                    N50,000
                                                </span>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="mg-t-20">
                                            <button
                                                type="button"
                                                className="btn btn-primary pd-x-40 tx-com mg-r-15"
                                                data-toggle="modal"
                                                data-target="#assignModal"
                                            >
                                                Publish
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

export default PreviewCampaign