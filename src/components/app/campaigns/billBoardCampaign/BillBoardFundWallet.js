import React, { Fragment, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";

import MetaData from "../../../layout/MetaData";
import Loader from "../../../loader";
import {
  fundUserWallet,
  getWallet,
  confirmFunding,
  clearErrors,
} from "../../../../actions/billingActions";
import NumberFormat from "react-number-format";
import {
  FUND_WALLET_RESET,
  CONFIRM_FUNDING_RESET,
} from "../../../../constants/billingConstants";

const InfluencerFundWallet = ({ prevStep, values, price }) => {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wallet } = useSelector((state) => state.wallet);
  const { fundWallet, loading, error } = useSelector(
    (state) => state.fundWallet
  );
  const { confirmFund } = useSelector((state) => state.confirmFund);
  const [amount, setAmountToPay] = useState(
    price - parseInt(wallet.balance) + 2000
  );
  // const [priceToPay, setPriceToPay] = useState(0);
  // const [applicableFee, setApplicableFee] = useState(0);
  // const [charge, setApplicableFee] = useState(0);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const makePaymentHandler = (e) => {
    e.preventDefault();

    const obj = amount && JSON.parse(`{"amount": ${amount}}`);

    dispatch(fundUserWallet(obj));
    // setAmountToPay("");
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  // useEffect(() => {
  //   let decimalFee = 0.015;
  //   let applicableFee = decimalFee * amount + (amount > 2500 ? 100 : 0);
  //   let feeCap = 2000;
  //   let finalAmount = 0;

  //   // let transactionCharge = 0.015;

  //   console.log("amount", parseInt(amount) + applicableFee);

  //   if (amount >= 2500) {
  //     if (applicableFee > feeCap) {
  //       console.log("high fee");
  //       setApplicableFee(feeCap);
  //       finalAmount = parseInt(amount) + feeCap;
  //       setPriceToPay(Math.round(finalAmount));
  //     } else {
  //       setApplicableFee(Math.round(applicableFee));
  //       console.log("less fee");
  //       finalAmount = parseInt(amount) + Math.round(applicableFee);
  //       // finalAmount = parseInt(amount) / (1 - decimalFee) + 0.01 + 100;
  //       setPriceToPay(Math.round(finalAmount));
  //     }
  //   } else {
  //     if (applicableFee > feeCap) {
  //       console.log("high fee; cap fee not 2500");
  //       setApplicableFee(feeCap);
  //       finalAmount = parseInt(amount) + feeCap;
  //       setPriceToPay(Math.round(finalAmount));
  //     } else {
  //       setApplicableFee(Math.round(applicableFee));
  //       console.log("less fee; cap fee not 2500");
  //       // finalAmount = parseInt(amount) / (1 - decimalFee) + 0.01;
  //       finalAmount = parseInt(amount) + Math.round(applicableFee);
  //       setPriceToPay(Math.round(finalAmount));
  //     }
  //   }
  // }, [amount]);

  // console.log("applicableFee", applicableFee, "priceToPay", priceToPay);

  const config = {
    reference:
      Object.keys(fundWallet).length > 0 ? fundWallet.data.reference : "",
    email: user.user.email,
    amount:
      Object.keys(fundWallet).length > 0
        ? parseInt(fundWallet.data.amount) * 100
        : 0,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    // console.log(reference);
    dispatch(confirmFunding(reference.reference));
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // console.log("closed");
    dispatch({ type: FUND_WALLET_RESET });
    dispatch({ type: CONFIRM_FUNDING_RESET });
  };

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    const cancelPayment = (e) => {
      e.preventDefault();
      dispatch({ type: FUND_WALLET_RESET });
      dispatch({ type: CONFIRM_FUNDING_RESET });
    };
    // setAmountToPay("");
    return (
      <div>
        <div className="form-group mg-t-40">
          <label className="tx-blac mb-1">Complete Payment on Paystack</label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter amount (NGN)"
            id="confirmAmount"
            name="confirmAmount"
            defaultValue={fundWallet.data.amount}
            disabled
            onChange={(e) => setAmountToPay(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary mg-t-10 mg-md-t-30"
          // ref={paymentButton}
          id="payment-button"
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          Pay{" "}
          <NumberFormat
            value={fundWallet.data.amount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₦"}
          />
        </button>
        <button
          className="btn btn-outline-primary mg-l-10 mg-t-10 mg-md-t-30"
          onClick={cancelPayment}
        >
          Cancel Payment
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (!isAuthenticated || user === null) {
      navigate("/login");
    } else if (confirmFund && confirmFund.status === "success") {
      dispatch(getWallet());
      toast.success(confirmFund.message);
      dispatch({ type: FUND_WALLET_RESET });
      dispatch({ type: CONFIRM_FUNDING_RESET });
      prevStep();
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [
    dispatch,
    loading,
    error,
    fundWallet,
    isAuthenticated,
    user,
    confirmFund,
    navigate,
    amount,
    prevStep,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Fund Wallet"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="row justify-content-between">
                <div className="col-md-6 mg-b-20 mg-md-b-0">
                  <div className="tx-black" onClick={Previous}>
                    <div className="d-flex">
                      <div className="pointer">
                        <i className="fa fa-angle-left mg-r-10 pd-t-15 tx-18" />
                      </div>
                      <div>
                        <p className="tx-28 tx-bold mb-0">Target Audience</p>
                      </div>
                    </div>
                  </div>
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
                          +{" "}
                          <NumberFormat
                            value={parseInt(wallet.balance)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₦"}
                          />
                        </p>
                        <form onSubmit={makePaymentHandler}>
                          {Object.keys(fundWallet).length <= 0 && (
                            <>
                              <div className="form-group mg-t-40">
                                <label className="tx-blac mb-1">
                                  How much would you like to credit your wallet
                                  with?
                                </label>

                                <input
                                  type="number"
                                  className="form-control form-control-lg"
                                  placeholder="Enter amount (NGN)"
                                  id="email_field"
                                  name="amount"
                                  value={amount}
                                  onChange={(e) =>
                                    setAmountToPay(parseInt(e.target.value))
                                  }
                                  min="2000"
                                />
                              </div>
                              <p className="mg-0 tx-12 tx-italic tx-bold tx-gray-500">
                                <span className="tx-danger tx-14">Note* </span>
                                <br />
                                {/* <span className="tx-bold tx-14">
                                  Flat Transaction Rate -{" "}
                                </span>{" "}
                                {applicableFee}
                                <br /> */}
                                <span className="tx-bold tx-14">
                                  Flat Transaction Rate -{" "}
                                </span>{" "}
                                <NumberFormat
                                  className=""
                                  value={2000}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                />
                              </p>
                              <button
                                className="btn btn-primary mg-t-10 mg-md-t-30"
                                name=""
                                type="submit"
                                disabled={loading ? true : false}
                              >
                                Fund Wallet
                              </button>
                            </>
                          )}
                          {Object.keys(fundWallet).length > 0 &&
                            fundWallet.status === "success" && (
                              <>
                                <PaystackHookExample />
                              </>
                            )}
                        </form>
                      </div>
                      <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
                        <img
                          src="../../../assets/img/atm.jpg"
                          className="img-fluid"
                          alt=""
                        />
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
  );
};

export default InfluencerFundWallet;
