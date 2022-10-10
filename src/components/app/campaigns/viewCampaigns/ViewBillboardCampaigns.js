import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import NumberFormat from "react-number-format";

import Loader from "../../../loader";
import MetaData from "../../../layout/MetaData";
import {
  getAllBillBoardCampaign,
  clearErrors,
} from "../../../../actions/campaignActions";

const ViewBillboardCampaign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, billBoardCampaigns } = useSelector(
    (state) => state.getBillBoardCampaign || {}
  );

  const setBillboardCampaigns = () => {
    const data = {
      columns: [
        {
          label: "",
          field: "checkBoxes",
          sort: "asc",
        },
        {
          label: "CAMPAIGN ID",
          field: "campaignId",
          sort: "asc",
        },
        {
          label: "COST",
          field: "cost",
          sort: "asc",
        },
        {
          label: "DATE CREATED",
          field: "dateCreated",
          sort: "asc",
        },
        {
          label: "STATUS",
          field: "status",
          sort: "asc",
        },
        {
          label: "ACTIONS",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    billBoardCampaigns &&
      billBoardCampaigns.reverse().forEach((campaign) => {
        data.rows.push({
          checkBoxes: (
            <Fragment>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customCheck1"
                ></label>
              </div>
            </Fragment>
          ),
          campaignId: campaign.billBoardCampaignId,
          cost: (
            <NumberFormat
              value={parseInt(campaign.totalCost)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          ),
          dateCreated: DateTime.fromJSDate(
            new Date(campaign.createdAt)
          ).toFormat("dd MMM, yyyy"),
          status: (
            <span
              className={`badge d-flex-center ${
                (!campaign.isAdminApproved || campaign.isAdminApproved) &&
                !campaign.isPublished &&
                (!campaign.isRejected || campaign.isRejected) &&
                !campaign.isApproved &&
                !campaign.isAdminRejected
                  ? "badge-pink"
                  : ""
              } 
              ${
                campaign.isAdminApproved &&
                campaign.isPublished &&
                !campaign.isRejected &&
                campaign.isApproved
                  ? "badge-active"
                  : ""
              }
              ${
                !campaign.isAdminApproved &&
                !campaign.isPublished &&
                campaign.isAdminRejected &&
                !campaign.isApproved
                  ? "badge-danger"
                  : ""
              }
              ${
                campaign.isAdminApproved &&
                !campaign.isPublished &&
                !campaign.isRejected &&
                campaign.isApproved
                  ? "badge-pending"
                  : ""
              }
              `}
            >
              {
                // campaign.isAdminApproved &&
                // campaign.isApproved &&
                // !campaign.isRejected &&
                // !campaign.isPublished
                //   ? "Approved"
                //   : null ||
                campaign.isAdminApproved &&
                !campaign.isPublished &&
                !campaign.isRejected &&
                campaign.isApproved
                  ? "Approved"
                  : null ||
                    ((!campaign.isAdminApproved || campaign.isAdminApproved) &&
                      !campaign.isPublished &&
                      (!campaign.isRejected || campaign.isRejected) &&
                      !campaign.isApproved &&
                      !campaign.isAdminRejected)
                  ? "Pending"
                  : null ||
                    (campaign.isAdminApproved &&
                      campaign.isPublished &&
                      !campaign.isRejected &&
                      campaign.isApproved)
                  ? "Published"
                  : null ||
                    (!campaign.isAdminApproved &&
                      !campaign.isPublished &&
                      !campaign.isApproved &&
                      campaign.isAdminRejected)
                  ? "Rejected"
                  : null
              }
            </span>
          ),
          actions: (
            <Fragment>
              <div className="tx-black tx-14">
                <div className="d-flex">
                  <Link
                    to={`../campaign/single-billboard/${campaign.billBoardCampaignId}`}
                  >
                    <i className="fa fa-eye tx-orange pd-t-4 mg-r-5" /> View{" "}
                  </Link>
                </div>
              </div>
            </Fragment>
          ),
        });
      });
    return data;
  };

  useEffect(() => {
    dispatch(getAllBillBoardCampaign());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      navigate("/app/campaigns");
    }
  }, [dispatch, error, navigate]);

  return (
    <Fragment>
      <MetaData title={"Billboard Campaigns"} />
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setBillboardCampaigns()}
          className="px-3 scroll"
          bordered
          striped
          hover
          responsive
        />
      )}
    </Fragment>
  );
};

export default ViewBillboardCampaign;
