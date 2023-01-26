import { DateTime } from "luxon";
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrors,
  getAdminSenderID,
  UpdateAdminSenderId,
} from "../../actions/senderIDActions";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../loader";
import { UPDATE_ADMIN_SENDERID_RESET } from "../../constants/senderIDConstants";

const AdminDashboard = () => {
  const { loading, error, adminSenderID } = useSelector(
    (state) => state.AdminSenderId || []
  );
  const { updateError, updateAdminSenderID } = useSelector(
    (state) => state.UpdateSenderId || []
  );

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    const things = { id: id, status: value };
    dispatch(UpdateAdminSenderId(things));
  };

  useEffect(() => {
    if (updateAdminSenderID && updateAdminSenderID.status === "success") {
      toast.success(updateAdminSenderID.message);
      dispatch(getAdminSenderID());
      dispatch({ type: UPDATE_ADMIN_SENDERID_RESET });
    } else if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  }, [dispatch, updateAdminSenderID, updateError]);
  // console.log(updateAdminSenderID)

  useEffect(() => {
    dispatch(getAdminSenderID());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setSenderID = () => {
    const data = {
      columns: [
        {
          label: "SENDER ID",
          field: "senderId",
          sort: "asc",
        },
        {
          label: "DATE CREATED",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "STATUS",
          field: "status",
        },
        {
          label: "ID",
          field: "Id",
        },
        {
          label: "TELCO",
          field: "telcoStatus",
        },
        {
          label: "AIRTEL",
          field: "airtelStatus",
        },
        {
          label: "MTN",
          field: "mtnStatus",
        },
        {
          label: "GLO",
          field: "gloStatus",
        },
        {
          label: "9mobile",
          field: "nineMobileStatus",
        },
        {
          label: "ACTION",
          field: "actionPerformed",
        },
      ],
      rows: [],
    };

    adminSenderID &&
      adminSenderID.forEach((senderids) => {
        data.rows.push({
          senderId: senderids.senderId,

          createdAt: DateTime.fromJSDate(
            new Date(senderids.createdAt)
          ).toFormat("dd MMM yyyy"),

          status: (
            <span
              className={`badge d-flex-center ${
                senderids.status === null || senderids.status === "pending"
                  ? "badge-pink"
                  : ""
              } ${senderids.status === "approved" ? "badge-active" : ""} ${
                senderids.status === "declined" ? "badge-primary" : ""
              }`}
            >
              {senderids.status === "pending" || senderids.status === null
                ? "Pending"
                : null || senderids.status === "declined"
                ? "Declined"
                : null || senderids.status === "approved"
                ? "Approved"
                : null}
            </span>
          ),

          Id: senderids.id,

          telcoStatus: (
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
          airtelStatus: (
            <span
              className={`badge d-flex-center ${
                senderids.airtelStatus === null ||
                senderids.airtelStatus === "pending"
                  ? "badge-pink"
                  : ""
              } ${
                senderids.airtelStatus === "approved" ? "badge-active" : ""
              } ${
                senderids.airtelStatus === "declined" ? "badge-primary" : ""
              }`}
            >
              {senderids.airtelStatus === "pending" ||
              senderids.airtelStatus === null
                ? "Pending"
                : null || senderids.airtelStatus === "declined"
                ? "Declined"
                : null || senderids.airtelStatus === "approved"
                ? "Approved"
                : null}
            </span>
          ),

          mtnStatus: (
            <span
              className={`badge d-flex-center ${
                senderids.mtnStatus === null ||
                senderids.mtnStatus === "pending"
                  ? "badge-pink"
                  : ""
              } ${senderids.mtnStatus === "approved" ? "badge-active" : ""} ${
                senderids.mtnStatus === "declined" ? "badge-primary" : ""
              }`}
            >
              {senderids.mtnStatus === "pending" || senderids.mtnStatus === null
                ? "Pending"
                : null || senderids.mtnStatus === "declined"
                ? "Declined"
                : null || senderids.mtnStatus === "approved"
                ? "Approved"
                : null}
            </span>
          ),

          gloStatus: (
            <span
              className={`badge d-flex-center ${
                senderids.gloStatus === null ||
                senderids.gloStatus === "pending"
                  ? "badge-pink"
                  : ""
              } ${senderids.gloStatus === "approved" ? "badge-active" : ""} ${
                senderids.gloStatus === "declined" ? "badge-primary" : ""
              }`}
            >
              {senderids.gloStatus === "pending" || senderids.gloStatus === null
                ? "Pending"
                : null || senderids.gloStatus === "declined"
                ? "Declined"
                : null || senderids.gloStatus === "approved"
                ? "Approved"
                : null}
            </span>
          ),
          nineMobileStatus: (
            <span
              className={`badge d-flex-center ${
                senderids.nineMobileStatus === null ||
                senderids.nineMobileStatus === "pending"
                  ? "badge-pink"
                  : ""
              } ${
                senderids.nineMobileStatus === "approved" ? "badge-active" : ""
              } ${
                senderids.nineMobileStatus === "declined" ? "badge-primary" : ""
              }`}
            >
              {senderids.nineMobileStatus === "pending" ||
              senderids.nineMobileStatus === null
                ? "Pending"
                : null || senderids.nineMobileStatus === "declined"
                ? "Declined"
                : null || senderids.nineMobileStatus === "approved"
                ? "Approved"
                : null}
            </span>
          ),
          actionPerformed: (
            <select
              id={senderids.id}
              value={senderids.status}
              onChange={handleChange}
            >
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
              <option value="pending">Pending</option>
            </select>
          ),
        });
      });

    return data;
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"All Sender IDs"} />
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
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AdminDashboard;
