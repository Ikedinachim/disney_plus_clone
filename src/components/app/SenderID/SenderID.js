import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { DateTime } from "luxon";

import Loader from "../../loader";
import MetaData from "../../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import { getSenderID, clearErrors } from "../../../actions/senderIDActions";

const SenderID = () => {
  const { loading, error, senderID } = useSelector(
    (state) => state.senderID || []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSenderID());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setSenderID = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "USER",
          field: "user",
          sort: "asc",
        },
        {
          label: "SENDER ID",
          field: "senderId",
          sort: "asc",
        },
        {
          label: "DATE REQUESTED",
          field: "dataRequested",
          sort: "asc",
        },
        {
          label: "STATUS",
          field: "status",
        },
        {
          label: "TELCO STATUS",
          field: "telcoStatus",
        },
        {
          label: "ADDITIONAL INFO",
          field: "additionalInfo",
        },
        {
          label: "ACTION",
          field: "actions",
        },
      ],
      rows: [],
    };

    senderID.forEach((senderids) => {
      data.rows.push({
        id: senderids._id,
        name: senderids.name,
        senderId: senderids.senderId,
        dataRequested: DateTime.fromJSDate(
          new Date(senderids.createdAt)
        ).toFormat("dd MMM yyyy"),
        status: (
          <span
            className={`badge d-flex-center ${
              senderids.telcoStatus === null ||
              senderids.telcoStatus === "pending"
                ? "badge-pink"
                : ""
            } ${senderids.telcoStatus === "approved" ? "badge-active" : ""} ${
              senderids.telcoStatus === "declined" ? "badge-primary" : ""
            }`}
          >
            {senderids.telcoStatus === "pending" ||
            senderids.telcoStatus === null
              ? "Pending"
              : null || senderids.telcoStatus === "declined"
              ? "Declined"
              : null || senderids.telcoStatus === "approved"
              ? "Approved"
              : null}
          </span>
        ),
        telcoStatus: (
          <span
            className={`{"badge" ${
              senderids.status === null || senderids.telcoStatus === "pending"
                ? "badge-pink"
                : "badge-active"
            }`}
          >
            {senderids.status === null || senderids.telcoStatus === "pending"
              ? "Pending"
              : "Approved"}
          </span>
        ),
        additionalInfo: senderids.additionalInfo,
        actions: (
          <Fragment>
            <div className="dropdown">
              <span
                className
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </span>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="./view-sender.html">
                  {" "}
                  <i
                    data-feather="eye"
                    className="favourite-icon mr-2 wd-15 ht-15"
                  />
                  View
                </a>
                <a className="dropdown-item" href>
                  {" "}
                  <i
                    data-feather="edit"
                    className="favourite-icon mr-2 wd-15 ht-15"
                  />
                  Edit
                </a>
                <a className="dropdown-item" href="#">
                  <i
                    data-feather="trash-2"
                    className="favourite-icon mr-2 wd-15 ht-15"
                  />
                  Delete
                </a>
              </div>
            </div>
          </Fragment>
        ),
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
                  <p className="mg-b-0 tx-26 tx-bold">Sender ID</p>
                </div>
                <div className="col-md-2 col-6">
                  <p>
                    <Link
                      to="/app/request-sender-id"
                      className="btn btn-primary w-100"
                    >
                      {" "}
                      New Sender ID
                    </Link>
                  </p>
                </div>
              </div>
              <div className="card card rounded bd-0 shadow-sm">
                <div className="card-header bd-b-0 pd-b-0 pd-t-40 pd-md-x-30"></div>
                <div className="card-body pd-md-x-30 pd-t- mg-t-20 mg-md-t-0">
                  <MDBDataTable
                    responsive
                    data={setSenderID()}
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

export default SenderID;
