import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import { getTransactionHistory, getWallet, clearErrors } from '../../../actions/billingActions'

const BillingOverview = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { wallet, loading, error } = useSelector(state => state.wallet)

    useEffect( () => {

    }, [dispatch, alert, loading, error, user, wallet])

    dispatch(getTransactionHistory())

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Sender ID"} />
                        <div className="content-body">
                            <div className="container pd-x-0">
                                <div className="row justify-content-between">
                                    <div className="col-md-6 col-12">
                                    <p className="tx-26 tx-bold">Billing Overview</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-7 col-12">
                                    <div className="card rounded bd-0 shadow-sm">
                                        <div className="card-body">
                                        <p className="tx-18">Billing Information</p>
                                        <div className="row">
                                            <div className="col-md-6 col-12">
                                            <p className="tx-uppercase mb-0 tx-16">Current Balance</p>
                                            <p className="tx-32 tx-semibold tx-green">+ &#8358;{wallet.balance}</p>
                                            <Link
                                                to="/app/billing/fund-wallet"
                                                className="btn btn-primary mg-t-10 mg-md-t-30"
                                            >
                                                {" "}
                                                <i className="fa fa-plus mg-r-5" /> Fund Wallet{" "}
                                            </Link>
                                            </div>
                                            <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
                                            <p className="mb-1 tx-16">Auto recharge</p>
                                            <div className="custom-control custom-switch mg-t-10">
                                                <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="customSwitch1"
                                                />
                                                <label
                                                className="custom-control-label tx-blac"
                                                htmlFor="customSwitch1"
                                                >
                                                Disabled
                                                </label>
                                            </div>
                                            <div className="mg-t-20">
                                                <p className="tx-16 mb-1">Invoice</p>
                                                <p className="tx-12 tx-blac">
                                                Your next invoice will be ready on 12th Sept. 2021
                                                </p>
                                                <div className="d-flex">
                                                <select className="col-7 custom-select mg-r-10">
                                                    <option selected>August 2021</option>
                                                    <option value={1}>August 2021</option>
                                                    <option value={2}>October 2021</option>
                                                    <option value={3}>March 2021</option>
                                                </select>
                                                <select className="w-100 custom-select">
                                                    <option selected>PDF</option>
                                                    <option value={1}>PDF</option>
                                                    <option value={2}>CSV</option>
                                                    <option value={3}>EXV</option>
                                                </select>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-md-5 col-12 mg-t-20 mg-md-t-0">
                                    <div className="card card-height rounded bd-0 shadow-sm">
                                        <div className="card-body">
                                        <p className="tx-18">Preferences</p>
                                        <p className="tx-16">Service Address (for taxation purposes)</p>
                                        <p className="tx-16">
                                            1 Asubiaro Street, <br />
                                            Jibowu Yaba, <br />
                                            Lagos
                                        </p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="row mg-t-30">
                                    <div className="col-md-7 col-12">
                                    <div className="row justify-content-between">
                                        <div className="col-md-4 col-12">
                                        <p className="mg-md-b-0 pd-t-10 tx-medium">Usauge Summary</p>
                                        </div>
                                        <div className="col-md-5 col-12">
                                        <div className="d-flex">
                                            <select className="col-8 custom-select col-7">
                                            <option selected>August 2021</option>
                                            <option value={1}>August 2021</option>
                                            <option value={2}>October 2021</option>
                                            <option value={3}>March 2021</option>
                                            </select>
                                            <p className="mg-b-10 ml-auto pd-t-10">
                                            <a href className="tx-primary tx-medium">
                                                View All
                                            </a>
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="card rounded bd-0 shadow-sm">
                                        <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-borderless" id="campaig">
                                            <thead className="tx-uppercase tx-medium">
                                                <tr>
                                                <th scope="col">Product</th>
                                                <th scope="col" className="tx-right">
                                                    Cost
                                                </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="tx-medium">
                                                <td>Total</td>
                                                <td className="tx-right">&#8358;250,000</td>
                                                </tr>
                                                <tr>
                                                <td>Enterprise Table</td>
                                                <td className="tx-right">&#8358;250,000</td>
                                                </tr>
                                                <tr>
                                                <td>HOR Campaign</td>
                                                <td className="tx-right">&#8358;250,000</td>
                                                </tr>
                                                <tr>
                                                <td>Art Campaign</td>
                                                <td className="tx-right">&#8358;250,000</td>
                                                </tr>
                                                <tr>
                                                <td>Art Campaign</td>
                                                <td className="tx-right">&#8358;250,000</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-md-5 col-12 mg-md-t-0 mg-t-20">
                                    <div className="d-flex justify-content-between mg-b-10">
                                        <p className="mg-b-0 pd-t-10 tx-medium">Payment History</p>
                                        <a href className="pd-t-10 tx-primary tx-medium">
                                        View all transactions
                                        </a>
                                    </div>
                                    <div className="card bg-transparent card-height  bd-0">
                                        <div className="card rounded bd-0 shadow-sm">
                                        <div className="card-body pd-y-5">
                                            <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="mb-0"> Card Payment </p>
                                                <p className="tx-gray mb-0"> 22 Jun 2018</p>
                                            </div>
                                            <p className="tx-green-light pd-t-10">&#8358;100.00</p>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="card mg-t-10 rounded bd-0 shadow-sm">
                                        <div className="card-body pd-y-5">
                                            <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="mb-0"> Card Payment </p>
                                                <p className="tx-gray mb-0"> 22 Jun 2018</p>
                                            </div>
                                            <p className="tx-green-light pd-t-10">&#8358;100.00</p>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="card mg-t-10 rounded bd-0 shadow-sm">
                                        <div className="card-body pd-y-5">
                                            <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="mb-0"> Fund Wallet </p>
                                                <p className="tx-gray mb-0"> 22 Jun 2018</p>
                                            </div>
                                            <p className="tx-green-light pd-t-10">&#8358;100.00</p>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="card mg-t-10 rounded bd-0 shadow-sm">
                                        <div className="card-body pd-y-5">
                                            <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="mb-0"> Fund Wallet </p>
                                                <p className="tx-gray mb-0"> 22 Jun 2018</p>
                                            </div>
                                            <p className="tx-green-light pd-t-10">&#8358;100.00</p>
                                            </div>
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

export default BillingOverview