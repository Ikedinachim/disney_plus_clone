import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { DateTime } from "luxon";
import NumberFormat from "react-number-format";

import Loader from "../../../loader";
import MetaData from "../../../layout/MetaData";

// import { getWallet } from '../../../actions/billingActions'
import { MDBDataTable } from "mdbreact";
import {
  getViewFlierVideosCampaigns,
  clearErrors,
  getAllCampaign,
} from "../../../../actions/campaignActions";

const ViewFlierVideosCampaigns = () => {
  const { vfLoading, error, viewFlierVideosCampaigns } = useSelector(
    (state) => state.viewFlierVideosCampaign || {}
  );
  const dispatch = useDispatch();
  const alert = useAlert();

  // useEffect(() => {
  //     dispatch(getViewFlierVideosCampaigns())
  //     if(error) {
  //         alert.error(error)
  //         dispatch(clearErrors())
  //     }
  //     // dispatch(getWallet())

  // }, [dispatch, alert, error])

  const { allCampaign } = useSelector((state) => state.allCampaign || {});

  const setViewFlierVideosCampaigns = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "CAMPAIGN NAME",
          field: "campaignName",
          sort: "asc",
        },
        {
          label: "AD TYPE",
          field: "adType",
          sort: "asc",
        },
        {
          label: "REVENUE",
          field: "revenue",
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

    allCampaign &&
      allCampaign.forEach((campaign) => {
        if (campaign.campaignType === "flier_video") {
          data.rows.push({
            id: campaign.id,
            campaignName: campaign.name,
            adType: campaign.channel,
            revenue: (
              <NumberFormat
                value={0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            ),
            cost: (
              <NumberFormat
                value={campaign.price}
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
                className={`{"badge" ${
                  !campaign.isApproved ? "badge-pink" : "badge-active"
                }`}
              >
                {!campaign.isApproved ? "Pending" : "Approved"}
              </span>
            ),
            actions: (
              <Fragment>
                {/* <div className="dropdown">
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
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="./view-sender.html">
                            {" "}
                            <i data-feather="eye" className="favourite-icon mr-2 wd-15 ht-15" />
                            View
                            </a>
                            <a className="dropdown-item" href>
                            {" "}
                            <i data-feather="edit" className="favourite-icon mr-2 wd-15 ht-15" />
                            Edit
                            </a>
                            <a className="dropdown-item" href="#">
                            <i data-feather="trash-2" className="favourite-icon mr-2 wd-15 ht-15" />
                            Delete
                            </a>
                        </div>
                    </div> */}
                <div class="tx-black tx-14">
                  <div class="d-flex">
                    <Link to={`../campaign/details/${campaign.id}`}>
                      <i className="fa fa-eye tx-orange pd-t-4 mg-r-5" /> View{" "}
                    </Link>
                  </div>
                </div>
              </Fragment>
            ),
          });
        }
      });
    return data;
  };

  return (
    <Fragment>
      {/* <MetaData title={"SMS Campaigns"} /> */}
      {vfLoading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setViewFlierVideosCampaigns()}
          className="px-3 scroll"
          bordered
          striped
          hover
          checkboxFirstColumn
        />
      )}
    </Fragment>
  );
};

export default ViewFlierVideosCampaigns;
