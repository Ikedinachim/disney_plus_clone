import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import Loader from "../../loader";
import MetaData from "../../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import NumberFormat from "react-number-format";
import {
  getTransactionHistory,
  clearErrors,
} from "../../../actions/billingActions";

const Transactions = () => {
  const { loading, error, reverseTnxHistory } = useSelector(
    (state) => state.tnxHistory || []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionHistory());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setTransactionHistory = () => {
    const data = {
      columns: [
        {
          label: "AMOUNT PAID",
          field: "amount",
          sort: "asc",
        },
        {
          label: "INITIAL BALANCE",
          field: "currentBalance",
          sort: "asc",
        },
        {
          label: "NEW BALANCE",
          field: "newBalance",
          sort: "asc",
        },
        {
          label: "DATE",
          field: "date",
          sort: "asc",
        },
        {
          label: "TIME",
          field: "time",
          sort: "asc",
        },
      ],
      rows: [],
    };

    reverseTnxHistory &&
      reverseTnxHistory.forEach((txn) => {
        data.rows.push({
          amount: (
            <NumberFormat
              value={txn.amount}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          ),
          currentBalance: (
            <NumberFormat
              value={txn.currentBalance}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          ),
          newBalance: (
            <NumberFormat
              value={txn.newBalance}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          ),
          date: DateTime.fromJSDate(new Date(txn.timestamp)).toFormat(
            "dd MMM yyyy"
          ),
          time: DateTime.fromJSDate(new Date(txn.timestamp)).toFormat("HH:MM"),
        });
      });
    return data;
  };

  // const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //     [`&.${tableCellClasses.head}`]: {
  //       backgroundColor: theme.palette.common.black,
  //       color: theme.palette.common.white,
  //     },
  //     [`&.${tableCellClasses.body}`]: {
  //       fontSize: 14,
  //     },
  // }));

  // const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //     '&:nth-of-type(odd)': {
  //         backgroundColor: theme.palette.action.hover,
  //     },
  //     // hide last border
  //     '&:last-child td, &:last-child th': {
  //         border: 0,
  //     },
  // }));

  // function createData(name, calories, fat, carbs, protein) {
  //     return { name, calories, fat, carbs, protein };
  // }

  // const rows = [
  //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //     createData('Eclair', 262, 16.0, 24, 6.0),
  //     createData('Cupcake', 305, 3.7, 67, 4.3),
  //     createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  // const deleteProductHandler = (id) => {
  //     // dispatch(deleteProduct(id))
  // }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Sender ID"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="row justify-content-between">
                <div className="col-md-6 col-6">
                  <Link to={"/app/billing"} className="mg-b-0 tx-26 tx-bold">
                    Transaction History
                  </Link>
                </div>
                <div className="col-md-2 col-6">
                  <p>
                    <Link to="/app/campaigns" className="btn btn-primary w-100">
                      {" "}
                      Create Campaign
                    </Link>
                  </p>
                </div>
              </div>
              <div className="card card rounded bd-0 shadow-sm">
                <div className="card-header bd-b-0 pd-b-0 pd-t-40 pd-md-x-30"></div>
                <div className="card-body pd-md-x-30 pd-t- mg-t-20 mg-md-t-0">
                  <MDBDataTable
                    responsive
                    data={setTransactionHistory()}
                    className="px-3 scroll"
                    bordered
                    striped
                    hover
                    checkboxFirstColumn
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Transactions;
