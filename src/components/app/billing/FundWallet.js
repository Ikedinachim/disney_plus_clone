import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import { getTransactionHistory, getWallet, clearErrors } from '../../../actions/billingActions'

const FundWallet = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { wallet, loading, error } = useSelector(state => state.wallet)

    useEffect( () => {

    }, [dispatch, alert, loading, error, getTransactionHistory])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Sender ID"} />
                        <div className="content-body">
                            <div className="container pd-x-0">
                                <div className="row justify-content-between">
                                    <div className="col-md-6 mg-b-20 mg-md-b-0">
                                    <a href="./billing.html" className="tx-black">
                                        <div className="d-flex">
                                        <div>
                                            <i className="fa fa-angle-left mg-r-10 pd-t-15 tx-18" />
                                        </div>
                                        <div>
                                            <p className="tx-28 tx-bold mb-0">Billing</p>
                                        </div>
                                        </div>
                                    </a>
                                    </div>
                                </div>
                                <div className="pd-md-y-20">
                                    <div className="card rounded card-scrolll bd-0 shadow-sm">
                                    <div className="card-body pd-lg-50">
                                        <p className="tx-24 tx-com tx-bold">Fund Wallet</p>
                                        <div className="row justify-content-between">
                                        <div className="col-md-5 col-12">
                                            <p className="tx-uppercase mb-0 tx-16 tx-blac tx-bold tx-com">
                                            Current Balance
                                            </p>
                                            <p className="tx-32 tx-semibold tx-green">+ N245,000.00</p>
                                            <div className="form-group mg-t-40">
                                            <label htmlFor className="tx-blac mb-1">
                                                How much would you like to fund your wallet with?
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Enter amount (NGN)"
                                            />
                                            </div>
                                            <a
                                            href="./wallet.html"
                                            className="btn btn-primary mg-t-10 mg-md-t-30"
                                            >
                                            {" "}
                                            Fund Wallet{" "}
                                            </a>
                                        </div>
                                        <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
                                            <img src="./assets/img/atm.jpg" className="img-fluid" alt srcSet />
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

export default FundWallet