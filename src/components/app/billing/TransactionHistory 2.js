import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import TransactionCard from "./TransactionCard";
import { getTransactionHistory } from "../../../actions/billingActions";
import { useSelector, useDispatch } from "react-redux";

const TransactionHistory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionHistory());
  }, []);

  const {
    tnxHistory: { reverseTnxHistory },
  } = useSelector((state) => state);
  return (
    <Fragment>
      <div className="d-flex justify-content-between mg-b-10">
        <p className="mg-b-0 pd-t-10 tx-medium">Payment History</p>
        <Link to="/app/billing" className="pd-t-10 tx-primary tx-medium">
          View all transactions
        </Link>
      </div>
      <div className="card bg-transparent card-height  bd-0">
        {reverseTnxHistory.slice(0, 5).map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </Fragment>
  );
};

export default TransactionHistory;
