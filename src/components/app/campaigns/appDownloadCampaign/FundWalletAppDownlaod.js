import React, { Fragment, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
// import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";
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

const FundWalletSMS = ({ prevStep, values }) => {
  // const alert = useAlert();
  const setScheduleDate = (initialDate, endDate) => {
    let day1 = new Date(initialDate);
    let day2 = new Date(endDate);

    const difference = Math.abs(day2 - day1);
    const days = difference / (1000 * 3600 * 24);

    if (values.scheduleOption !== "recurrent" || days < 1 || !days) {
      return 1;
    } else if (values.scheduleOption === "recurrent") {
      return days;
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { confirmFund, filteredContactList } = useSelector((state) => state);
  const { wallet } = useSelector((state) => state.wallet);
  const [amount, setAmountToPay] = useState(
    values.targetAudienceOption === "mysogidb" &&
      values.channel !== "display_ads"
      ? Math.ceil(
          values.limit
            ? values.limit *
                5 *
                setScheduleDate(values.scheduleFrom, values.scheduleTo) -
                wallet.balance
            : filteredContactList.filteredContactList.count *
                5 *
                setScheduleDate(values.scheduleFrom, values.scheduleTo) -
                wallet.balance
        )
      : Math.ceil(
          values.price *
            setScheduleDate(values.scheduleFrom, values.scheduleTo) -
            wallet.balance
        )
  );
  const { fundWallet, loading, error } = useSelector(
    (state) => state.fundWallet
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const makePaymentHandler = (e) => {
    e.preventDefault();
    const obj = JSON.parse(`{"amount": ${amount < 50 ? 50 : amount}}`);

    dispatch(fundUserWallet(obj));
    // setAmountToPay("");
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

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
    prevStep();
    dispatch({ type: FUND_WALLET_RESET });
    dispatch({ type: CONFIRM_FUNDING_RESET });
  };

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    const cancelPayment = (e) => {
      e.preventDefault();
      prevStep();
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
    } else if (
      confirmFund.confirmFund &&
      confirmFund.confirmFund.status === "success"
    ) {
      dispatch(getWallet());
      toast.success(confirmFund.confirmFund.message);
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
    toast,
    loading,
    error,
    fundWallet,
    isAuthenticated,
    prevStep,
    confirmFund,
    user,
    navigate,
  ]);

  return (
    <Fragment>
      {loading || confirmFund.confirmFundloading ? (
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
                                  How much would you like to fund your wallet
                                  with?
                                </label>

                                <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  placeholder="Enter amount (NGN)"
                                  id="email_field"
                                  name="amount"
                                  defaultValue={amount < 50 ? 50 : amount}
                                  onChange={(e) =>
                                    setAmountToPay(e.target.value)
                                  }
                                />
                              </div>
                              <button
                                className="btn btn-primary mg-t-10 mg-md-t-30"
                                name="fundWallet"
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

export default FundWalletSMS;
