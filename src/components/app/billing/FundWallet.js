import React, { Fragment, useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'

import MetaData from '../../layout/MetaData'
import Loader from '../../loader'
import { fundUserWallet, getWallet, clearErrors } from '../../../actions/billingActions'
import NumberFormat from 'react-number-format'

const FundWallet = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    // dispatch(getWallet())
    const navigate = useNavigate();

    const [amountToPay, setAmountToPay] = useState({payAmount:''})
    const {amount} = amountToPay
    const { fundWallet, loading, error } = useSelector(state => state.fundWallet)
    const { wallet } = useSelector(state => state.wallet)
    const { isAuthenticated, user } = useSelector(state => state.auth)

    console.log(fundWallet)
    const onChange = e => {
        if(e.target.name === 'avatar') {

        } else {
            setAmountToPay({ ...amountToPay, [e.target.name]: e.target.value })
            
        }
    }

    const makePaymentHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('amount', amount);

        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var amountToPay = JSON.stringify(object);

        dispatch(fundUserWallet(amountToPay))
        e.target.value = ''
        e.target.name = ''
    }

    useEffect( () => {

        if (!isAuthenticated || user === null) {
            navigate('/login')
        }else if(!loading && fundWallet.status === "success") {
            alert.success(fundWallet.message)
            navigate('/app/billing')
            console.log(fundWallet.message)
        }

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        // dispatch({ 
        //     type: GET_WALLET_SUCCESS
        // })
        dispatch(getWallet())
    }, [dispatch, alert, loading, error, fundWallet])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Sender ID"} />
                        <div className="content-body">
                            <div className="container pd-x-0">
                                <div className="row justify-content-between">
                                    <div className="col-md-6 mg-b-20 mg-md-b-0">
                                    <Link to="/app/billing" className="tx-black">
                                        <div className="d-flex">
                                        <div>
                                            <i className="fa fa-angle-left mg-r-10 pd-t-15 tx-18" />
                                        </div>
                                        <div>
                                            <p className="tx-28 tx-bold mb-0">Billing</p>
                                        </div>
                                        </div>
                                    </Link>
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
                                            <p className="tx-32 tx-semibold tx-green">
                                                + <NumberFormat value={wallet.balance} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                                            </p>
                                            <form onSubmit={makePaymentHandler}>
                                            <div className="form-group mg-t-40">
                                            <label className="tx-blac mb-1">
                                                How much would you like to fund your wallet with?
                                            </label>
                                            
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter amount (NGN)"
                                                    id="email_field"
                                                    name="amount"
                                                    value={amount}
                                                    onChange={onChange}
                                                />
                                                </div>
                                                <button
                                                    className="btn btn-primary mg-t-10 mg-md-t-30"
                                                    name=""
                                                    type="submit"
                                                    disabled={ loading ? true : false }
                                                >
                                                {" "}
                                                Fund Wallet{" "}
                                                </button>
                                            </form>
                                        </div>
                                        <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
                                            <img src="../../../assets/img/Promote_Offers.svg" className="img-fluid" alt srcSet />
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