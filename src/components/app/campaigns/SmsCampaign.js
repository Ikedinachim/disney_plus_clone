import React, { Fragment, useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'

import MetaData from '../../layout/MetaData'
import Loader from '../../loader'
import { fundUserWallet, getWallet, clearErrors } from '../../../actions/billingActions'
import NumberFormat from 'react-number-format'
import { FUND_WALLET_RESET } from '../../../constants/billingConstants'

const SmsCampaign = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    // dispatch(getWallet())
    const navigate = useNavigate();

    const [amount, setAmountToPay] = useState('')
    // const {amount} = amountToPay
    const { fundWallet, loading, error } = useSelector(state => state.fundWallet)
    const { wallet } = useSelector(state => state.wallet)
    const { isAuthenticated, user } = useSelector(state => state.auth)


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
                                <div className="d-flex justify-content-between">
                                    <p className="tx-18 mb-0">60%</p>
                                    <p className="tx-18 mb-0">2 out of 3</p>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-primary progress-bar-striped progress-bar-animated wd-60p" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                                <div className="pd-md-y-20">
                                    <div className="col-lg-11 pd-x-0">
                                    <form>
                                        <div>
                                        <p className="tx-24 tx-bold mb-1 tx-com">Flash SMS / SMS</p>
                                        <p className="tx-14">Provide all requested details to help complete the campaign creation</p>
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                            <label htmlFor className="mb-1">Sender ID</label>
                                            <input type="text" className="form-control" id placeholder="Enter Sender ID" />
                                            </div>
                                            <div className="form-group col-md-6">
                                            <div className="form-group">
                                                <label htmlFor className="mb-1">Select Channel</label>
                                                <select className="custom-select">
                                                <option selected>Select Channel</option>
                                                <option value={1}>Smart SMS</option>
                                                <option value={2}>Display Ads</option>
                                                </select>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor className="mb-1">Campaign Message</label>
                                            <textarea name id className="form-control" rows={3} placeholder="Type your ad message here e.g Get up to 50% discount on first purchase" defaultValue={""} />
                                        </div>
                                        </div>
                                    </form>
                                    <div className="col-md-5 col-xl-4 pd-x-0 mg-y-50">
                                        <div className="d-flex">
                                        <Link to="/app/campaign/audience" className="btn btn-primary w-100 mg-b-15 ">Proceed</Link>
                                        <Link to="/app/campaign/create" className="btn btn-outline-primary w-100 mg-l-20 mg-b-15">Go Back</Link>
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

export default SmsCampaign