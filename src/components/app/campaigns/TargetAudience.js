import React, { Fragment, useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'

import MetaData from '../../layout/MetaData'
import Loader from '../../loader'
import { fundUserWallet, getWallet, clearErrors } from '../../../actions/billingActions'
import NumberFormat from 'react-number-format'
import { FUND_WALLET_RESET } from '../../../constants/billingConstants'

const TargetAudience = () => {
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
                            {/* <div className="container pd-x-0">
                            </div> */}
                            <div className="container-fluid">
                                <div className="card card-body rounded bd-0 shadow-sm pd-lg-x-50 pd-lg-y-30">
                                    <div className="d-flex justify-content-between">
                                    <p className="tx-18 mb-0">60%</p>
                                    <p className="tx-18 mb-0">3 out of 3</p>
                                    </div>
                                    <div className="progress">
                                    <div
                                        className="progress-bar bg-primary progress-bar-striped progress-bar-animated wd-60p"
                                        role="progressbar"
                                        aria-valuenow={40}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                    </div>
                                    <div className="pd-md-y-20">
                                    <div className>
                                        <form>
                                        <div>
                                            <p className="tx-22 tx-com tx-bold mb-1">Select Target Audience</p>
                                            <p className="tx-14 tx-blac">
                                            Let’s narrow down your target audience to help boost sales
                                            </p>
                                            <div className="form-group">
                                            <div className="custom-control custom-radio">
                                                <input
                                                type="radio"
                                                id="db"
                                                name="customRadio"
                                                className="custom-control-input"
                                                defaultChecked
                                                onClick="switch_div(1)"
                                                />
                                                <label className="custom-control-label" htmlFor="db">
                                                Use Mysogi Database
                                                </label>
                                            </div>
                                            </div>
                                            <div className="form-group">
                                            <div className="custom-control custom-radio">
                                                <input
                                                type="radio"
                                                id="import"
                                                name="customRadio"
                                                className="custom-control-input"
                                                />
                                                <label className="custom-control-label" htmlFor="import">
                                                Import my own database
                                                </label>
                                            </div>
                                            </div>
                                            <div className="form-group">
                                            <div className="custom-control custom-radio">
                                                <input
                                                type="radio"
                                                id="manual"
                                                name="customRadio"
                                                className="custom-control-input"
                                                onClick="switch_div(2)"
                                                />
                                                <label className="custom-control-label" htmlFor="manual">
                                                Enter Contacts Manually
                                                </label>
                                            </div>
                                            </div>
                                            <div id="show_1">
                                                <div className="row justify-content-md-between">
                                                    <div className="form-group col-md-6">
                                                    <label htmlFor className="mb-1 tx-com">
                                                        Age Group
                                                    </label>
                                                    <select id="ageRange" className="form-control">
                                                        <option value />
                                                        <option value={13}>13-24</option>
                                                        <option value={25}>25-34</option>
                                                        <option value={35}>35-44</option>
                                                    </select>
                                                    {/* <select class="custom-select">
                                                        <option selected>Select Age Range</option>
                                                        <option value="1">20-30</option>
                                                        <option value="2">30-40</option>
                                                        <option value="3">40-50</option>
                                                        </select> */}
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                    <label htmlFor className="mb-1 tx-com">
                                                        Gender
                                                    </label>
                                                    <select id="gender" className="form-control">
                                                        <option value />
                                                        <option value="m">Male</option>
                                                        <option value="f">Female</option>
                                                        <option value="b">Both</option>
                                                    </select>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                    <label htmlFor className="mb-1 tx-com">
                                                        State
                                                    </label>
                                                    <select className="custom-select">
                                                        <option selected>Select Target State</option>
                                                        <option value={1}>Ogun</option>
                                                        <option value={2}>Lagos</option>
                                                        <option value={2}>Lagos</option>
                                                        <option value={2}>Lagos</option>
                                                    </select>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                    <label htmlFor className="mb-1 tx-com">
                                                        LGA
                                                    </label>
                                                    <select className="custom-select">
                                                        <option selected>Select Target LGA</option>
                                                        <option value={1}>Eti Osa</option>
                                                        <option value={2}>Lekki</option>
                                                        <option value={2}>Lekki</option>
                                                        <option value={2}>Lekki</option>
                                                        <option value={2}>Lekki</option>
                                                    </select>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                    <label htmlFor className="mb-1 tx-com">
                                                        ARPU Band
                                                    </label>
                                                    <select id="band" className="form-control">
                                                        <option value />
                                                        <option value="m">0-1000</option>
                                                        <option value="f">1001-5000</option>
                                                        <option value="b">5001-10000</option>
                                                    </select>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                    <label htmlFor className="mb-1 tx-com">
                                                        Interest
                                                    </label>
                                                    <select className="custom-select">
                                                        <option selected>Select Interest</option>
                                                        <option value={1}>Music</option>
                                                        <option value={2}>Comedy</option>
                                                    </select>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                    <label htmlFor className="mb-1 tx-com">
                                                        Device Type
                                                    </label>
                                                    <select className="custom-select">
                                                        <option selected>Select the kind of device</option>
                                                        <option value={1}>Android</option>
                                                        <option value={2}>IOS</option>
                                                    </select>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                    <label htmlFor className="mb-1 tx-com">
                                                        Device Brand
                                                    </label>
                                                    <select className="custom-select">
                                                        <option selected>Select Device Brand</option>
                                                        <option value={1}>Nokia</option>
                                                        <option value={2}>Iphone</option>
                                                    </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hide" id="show_2">
                                                <div className="row justify-content-md-between">
                                                    <div className="form-group col-md-6">
                                                    <label htmlFor className="mb-1 tx-com">
                                                        Enter Number (you can separate your contact with comma (,)
                                                    </label>
                                                    <textarea
                                                        name
                                                        className="form-control"
                                                        id
                                                        rows={4}
                                                        placeholder="Enter Number"
                                                        defaultValue={""}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </form>
                                        <div className="col-md-5 pd-x-0 mg-y-40">
                                        <div className="d-flex">
                                            <Link to="/app/campaign/preview" className="btn btn-primary w-100 ">
                                            Filter
                                            </Link>
                                            <Link
                                            to="/app/campaign/sms"
                                            className="btn btn-outline-primary w-100 mg-l-20"
                                            >
                                            Go Back
                                            </Link>
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

export default TargetAudience