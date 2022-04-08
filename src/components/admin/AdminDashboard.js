import { DateTime } from 'luxon';
import React, {Fragment, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { clearErrors, getAdminSenderID } from '../../actions/senderIDActions';

const AdminDashboard = () => {
  const { loading, error, senderID } = useSelector((state) => state.senderID || []);

  const dispatch = useDispatch();

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
          label: "USER ID",
          field: "userId",
        },
        {
          label: "TELCO STATUS",
          field: "telcoStatus",
        },
        {
          label: "AIRTEL STATUS",
          field: "airtelStatus",
        },
        {
          label: "MTN STATUS",
          field: "mtnStatus",
        },
        {
          label: "GLO STATUS",
          field: "gloStatus",
        },
        {
          label: "9mobile STATUS",
          field: "nineMobileStatus",
        },
      ],
      rows: [],
    };

    senderID.forEach((senderids) => {
      data.rows.push({
        senderId: senderids.senderId,

        createdAt: DateTime.fromJSDate(new Date(senderids.createdAt)).toFormat(
          "dd MMM yyyy"
        ),

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

        userId: senderids.user_id,

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

        mtnStatus: (
          <span
            className={`badge d-flex-center ${
              senderids.mtnStatus === null || senderids.mtnStatus === "pending"
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
              senderids.gloStatus === null || senderids.gloStatus === "pending"
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
      });
    });

    return data;
  }
  return (<div>
    things that should be here
  </div>)
};

export default AdminDashboard;