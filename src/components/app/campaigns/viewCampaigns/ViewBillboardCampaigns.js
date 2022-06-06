import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
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
          label: "CAMPAIGN NAME",
          field: "campaignName",
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
      billBoardCampaigns.forEach((campaign) => {
        data.rows.push({
          checkBoxes: (
            <Fragment>
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck1"
                />
                <label class="custom-control-label" for="customCheck1"></label>
              </div>
            </Fragment>
          ),
          campaignName: campaign.campaignType,
          cost: (
            <NumberFormat
              value={parseInt(campaign.cost)}
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
                campaign.isApproved &&
                !campaign.isPublished &&
                !campaign.isRejected
                  ? "badge-pending"
                  : ""
              } ${
                campaign.isApproved &&
                campaign.isPublished &&
                !campaign.isRejected
                  ? "badge-active"
                  : ""
              } ${
                !campaign.isApproved &&
                !campaign.isPublished &&
                campaign.isRejected
                  ? "badge-primary"
                  : ""
              }
             ${
               !campaign.isApproved &&
               !campaign.isPublished &&
               !campaign.isRejected
                 ? "badge-pink"
                 : ""
             }`}
            >
              {campaign.isApproved &&
              !campaign.isPublished &&
              !campaign.isRejected
                ? "Unpublished"
                : null ||
                  (campaign.isApproved &&
                    campaign.isPublished &&
                    !campaign.isRejected)
                ? "Published"
                : null ||
                  (!campaign.isApproved &&
                    !campaign.isPublished &&
                    campaign.isRejected)
                ? "Rejected"
                : null ||
                  (!campaign.isApproved &&
                    !campaign.isPublished &&
                    !campaign.isRejected)
                ? "Pending"
                : null}
            </span>
          ),
          actions: (
            <Fragment>
              <div class="tx-black tx-14">
                <div class="d-flex">
                  <Link to={`../campaign/single-billboard/${campaign.id}`}>
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
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={"SMS Campaigns"} />
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setBillboardCampaigns()}
          className="px-3 scroll"
          bordered
          striped
          hover
          checkboxFirstColumn
          responsive
        />
      )}
    </Fragment>
  );
};

export default ViewBillboardCampaign;
