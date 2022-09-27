import React, { Fragment, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";

import MetaData from "../components/layout/MetaData";
import Loader from "../components/loader";
// import FeatherIcon from "feather-icons-react";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
// import NumberFormat from "react-number-format";

import { MDBDataTable } from "mdbreact";
import {
  getAllInfluencerCampaign,
  getInfluencerDetails,
  getAllPoviderCampaign,
  clearErrors,
} from "../actions/campaignActions";

import { getUser } from "../actions/authActions";

const Dashboard = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { loading, influencerCampaignList } = useSelector(
    (state) => state.influencerCampaignList
  );

  const { providerCampaignList, billboardLoading } = useSelector(
    (state) => state.providerCampaignList
  );
  // const combineBillbordCampaign = [...providerCampaignList?.approved, ...providerCampaignList?.rejected];
  const { idLoading } = useSelector((state) => state.influencerDetails);
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.wallet);

  // const [isActive, setActive] = useState("false");

  // const ToggleClass = (e) => {
  //   setActive(!isActive);
  //   e.preventDefault();
  // };

  // const resetPropagation = (e) => {
  //     e.stopPropagation()
  //     e.preventDefault()
  //  }

  // const [datatable, setDatatable] = useState();

  const setAllCampaigns = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          // sort: "desc",
        },
        // {
        //   label: "CAMPAIGN NAME",
        //   field: "campaignName",
        //   // sort: "desc",
        // },
        {
          label: "CHANNEL",
          field: "channel",
          // sort: "desc",
        },
        {
          label: "DATE CREATED",
          field: "dateCreated",
          // sort: "desc",
        },
        {
          label: "STATUS",
          field: "status",
          // sort: "desc",
        },
        {
          label: "ACTIONS",
          field: "actions",
          // sort: "desc",
        },
      ],
      rows: [],
    };

    let reverseInfluencerCampaignList = [...influencerCampaignList.reverse()];
    // let reverseproviderCampaignList = [
    //   ...providerCampaignList.boards.reverse(),
    // ];

    reverseInfluencerCampaignList.forEach((campaign) => {
      data.rows.push({
        id: campaign.id,
        // campaignName: campaign.name,
        channel: campaign.platforms,
        dateCreated: DateTime.fromJSDate(new Date(campaign.createdAt)).toFormat(
          "dd MMM, yyyy"
        ),
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
            {
              // (!campaign.isApproved ? "Pending" : "Approved")
              campaign.isApproved &&
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
                : null

              // if (campaign.marketingData.isApproved && !campaign.marketingData.isPublished && !campaign.marketingData.isRejected) {
              //   return "Approved"
              // }
            }
          </span>
        ),
        actions: (
          <Fragment>
            <div className="tx-black tx-14">
              <Link
                to={`/influencer/view-campaign/${campaign.influenceMarketingId}`}
                className="d-flex"
              >
                <i className="fa fa-eye tx-orange pd-t-4 mg-r-5"></i>
                {campaign.isApproved &&
                !campaign.isPublished &&
                !campaign.isRejected
                  ? "Confirm"
                  : "View"}
              </Link>
            </div>
          </Fragment>
        ),
      });
    });
    return data;
  };

  const setAllBillbordCampaigns = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          // sort: "desc",
        },
        // {
        //   label: "CAMPAIGN NAME",
        //   field: "campaignName",
        //   // sort: "desc",
        // },
        {
          label: "BILLBOARD",
          field: "billboard",
          // sort: "desc",
        },
        {
          label: "RATE TYPE",
          field: "rateType",
          // sort: "desc",
        },
        {
          label: "PRICE",
          field: "price",
          // sort: "desc",
        },
        {
          label: "DATE CREATED",
          field: "dateCreated",
          // sort: "desc",
        },
        {
          label: "START DATE",
          field: "startDate",
          // sort: "desc",
        },
        {
          label: "END DATE",
          field: "endDate",
          // sort: "desc",
        },
        {
          label: "STATUS",
          field: "status",
          // sort: "desc",
        },
        {
          label: "ACTIONS",
          field: "actions",
          // sort: "desc",
        },
      ],
      rows: [],
    };

    let reverseProviderCampaignList = providerCampaignList?.approved
      ? providerCampaignList?.approved.sort(
          (a, b) => b.billBoardCampaignId - a.billBoardCampaignId
        )
      : [];

    reverseProviderCampaignList.forEach((campaign) => {
      data.rows.push({
        id: campaign.id,
        // campaignName: campaign.name,
        rateType: <span className="text-capitalize">{campaign.rateType}</span>,
        billboard: campaign.board_detail.title,
        price: (
          <NumberFormat
            value={parseInt(campaign.totalCost)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₦"}
          />
        ),
        dateCreated: DateTime.fromJSDate(new Date(campaign.createdAt)).toFormat(
          "dd MMM, yyyy"
        ),
        startDate: DateTime.fromJSDate(new Date(campaign.startDate)).toFormat(
          "dd MMM, yyyy"
        ),
        endDate: DateTime.fromJSDate(new Date(campaign.endDate)).toFormat(
          "dd MMM, yyyy"
        ),
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
            <div className="tx-black tx-14">
              <Link
                to={`/billboard/view-campaign/${campaign.billBoardCampaignId}`}
                className="d-flex"
              >
                <i className="fa fa-eye tx-orange pd-t-4 mg-r-5"></i>
                {campaign.isApproved &&
                !campaign.isPublished &&
                !campaign.isRejected
                  ? "Confirm"
                  : "View"}
              </Link>
            </div>
          </Fragment>
        ),
      });
    });
    return data;
  };

  useEffect(() => {
    if (user && user.user.role === "influencer") {
      dispatch(getAllInfluencerCampaign(user.user.influencer_id));
      dispatch(getInfluencerDetails(user.user.influencer_id));
      dispatch(getUser());
    } else if (user && user.user.role === "billboard_provider") {
      dispatch(getAllPoviderCampaign(user.user.billboard_provider_id));
      dispatch(getUser());
    } else if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, user]);

  return (
    <Fragment>
      {loading || idLoading || billboardLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Dashboard"} />
          <div className="content-body">
            <div className="container-fluid">
              <div className="row justify-content-between">
                <div className="col-md-6 col-6">
                  <p className="mg-b-0 tx-26 tx-bold">Overview</p>
                </div>
                <div className="col-12 col-md-4 col-xl-3 pd-xl-l-0">
                  <div className="d-flex justify-content-end"></div>
                </div>
              </div>
              {user && user.user.role === "influencer" && (
                <>
                  <div className="row row-xs">
                    <div className="col-sm-6 col-xs-6 col-lg-3 mg-t-10">
                      <div className="card card-body p-3 rounded bd-0 shadow-sm analytics-card">
                        <div className="d-flex d-lg-block d-xl-flex">
                          <span>
                            <img
                              className="icon img-fluid"
                              src="../assets/img/Total_Ads_Played.svg"
                              alt="Total Campaign"
                            />
                          </span>
                          <div className="ml-3">
                            <p className="tx-bold tx-bold tx-28 mg-b-0 lh-1 white">
                              {influencerCampaignList &&
                              influencerCampaignList?.length
                                ? influencerCampaignList?.length
                                : 0}
                              {influencerCampaignList?.length > 1000 ? "k" : ""}
                            </p>
                            <p className="tx-gray tx-12 tx-14 mb-0">
                              Total Campaigns
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* col */}
                    <div className="col-sm-6 col-xs-6 col-lg-3 mg-t-10">
                      <div className="card card-body p-3 rounded bd-0 shadow-sm analytics-card">
                        <div className="d-flex d-lg-block d-xl-flex">
                          <span>
                            <img
                              className="icon img-fluid"
                              src="../assets/img/my2.svg"
                              alt="Approved Campaign"
                            />
                          </span>
                          <div className="ml-3">
                            <p className="tx-bold tx-bold tx-28 mg-b-0 lh-1 white">
                              {influencerCampaignList
                                ? influencerCampaignList &&
                                  influencerCampaignList.filter(
                                    (x) =>
                                      x.isRejected === false &&
                                      x.isApproved === true &&
                                      x.isPublished === true
                                  )?.length
                                : 0}
                              {influencerCampaignList?.length > 1000 ? "k" : ""}
                            </p>
                            <p className="tx-gray tx-12 tx-14 mb-0">
                              Published Campaigns
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* col */}
                    <div className="col-sm-6 col-xs-6 col-lg-3 mg-t-10">
                      <div className="card card-body p-3 rounded bd-0 shadow-sm analytics-card">
                        <div className="d-flex d-lg-block d-xl-flex">
                          <span>
                            <img
                              className="icon img-fluid"
                              src="../assets/img/my3.svg"
                              alt="Pending Campaign"
                            />
                          </span>
                          <div className="ml-3">
                            <p className="tx-bold tx-bold tx-28 mg-b-0 lh-1 white">
                              {influencerCampaignList
                                ? influencerCampaignList &&
                                  influencerCampaignList.filter(
                                    (x) =>
                                      x.isRejected === false &&
                                      x.isApproved === false &&
                                      x.isPublished === false
                                  )?.length
                                : 0}
                              {influencerCampaignList?.length > 1000 ? "k" : ""}
                            </p>
                            <p className="tx-gray tx-12 tx-14 mb-0">
                              Pending Campaigns
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* col */}
                    <div className="col-sm-6 col-xs-6 col-lg-3 mg-t-10">
                      <div className="card card-body p-3 rounded bd-0 shadow-sm analytics-card">
                        <div className="d-flex d-lg-block d-xl-flex">
                          <span>
                            <img
                              className="icon img-fluid"
                              src="../assets/img/Reported_Ads.svg"
                              alt="Rejected Campaign"
                            />
                          </span>
                          <div className="ml-3">
                            <p className="tx-bold tx-bold tx-28 mg-b-0 lh-1 white">
                              {influencerCampaignList
                                ? influencerCampaignList &&
                                  influencerCampaignList.filter(
                                    (x) => x.isRejected === true
                                  )?.length
                                : 0}
                              {influencerCampaignList?.length > 1000 ? "k" : ""}
                            </p>
                            <p className="tx-gray tx-12 tx-14 mb-0">
                              Rejected Campaigns
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* col */}
                  </div>
                  <div className="card rounded bd-0 shadow-sm mg-t-40">
                    <div className="card-body pd-md-x-30 pd-t- mg-t-20 mg-md-t-0">
                      <MDBDataTable
                        responsive
                        data={setAllCampaigns()}
                        className="px-3 scroll"
                        bordered
                        striped
                        hover
                        barReverse
                      />
                    </div>
                  </div>
                </>
              )}
              {user && user.user.role === "billboard_provider" && (
                <>
                  <div className="row row-xs">
                    <div className="col-sm-6 col-xs-6 col-lg-3 mg-t-10">
                      <div className="card card-body p-3 rounded bd-0 shadow-sm analytics-card">
                        <div className="d-flex d-lg-block d-xl-flex">
                          <span>
                            <img
                              className="icon img-fluid"
                              src="../assets/img/Total_Ads_Played.svg"
                              alt="Total Campaign"
                            />
                          </span>
                          <div className="ml-3">
                            <p className="tx-bold tx-bold tx-28 mg-b-0 lh-1 white">
                              {providerCampaignList?.approved?.length
                                ? providerCampaignList?.approved?.length
                                : 0}
                              {providerCampaignList?.approved.length > 1000
                                ? "k"
                                : ""}
                            </p>
                            <p className="tx-gray tx-12 tx-14 mb-0">
                              Total Campaigns
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* col */}
                    <div className="col-sm-6 col-xs-6 col-lg-3 mg-t-10">
                      <div className="card card-body p-3 rounded bd-0 shadow-sm analytics-card">
                        <div className="d-flex d-lg-block d-xl-flex">
                          <span>
                            <img
                              className="icon img-fluid"
                              src="../assets/img/my2.svg"
                              alt="Approved Campaign"
                            />
                          </span>
                          <div className="ml-3">
                            <p className="tx-bold tx-bold tx-28 mg-b-0 lh-1 white">
                              {providerCampaignList?.approved?.length
                                ? providerCampaignList?.approved?.filter(
                                    (x) =>
                                      x.isRejected === false &&
                                      x.isApproved === true &&
                                      x.isPublished === true
                                  )?.length
                                : 0}
                              {providerCampaignList?.approved?.length > 1000
                                ? "k"
                                : ""}
                            </p>
                            <p className="tx-gray tx-12 tx-14 mb-0">
                              Published Campaigns
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* col */}
                    <div className="col-sm-6 col-xs-6 col-lg-3 mg-t-10">
                      <div className="card card-body p-3 rounded bd-0 shadow-sm analytics-card">
                        <div className="d-flex d-lg-block d-xl-flex">
                          <span>
                            <img
                              className="icon img-fluid"
                              src="../assets/img/my3.svg"
                              alt="Pending Campaign"
                            />
                          </span>
                          <div className="ml-3">
                            <p className="tx-bold tx-bold tx-28 mg-b-0 lh-1 white">
                              {providerCampaignList
                                ? providerCampaignList?.approved?.filter(
                                    (x) =>
                                      x.isRejected === false &&
                                      x.isApproved === false &&
                                      x.isPublished === false
                                  )?.length
                                : 0}
                              {providerCampaignList?.approved?.length > 1000
                                ? "k"
                                : ""}
                            </p>
                            <p className="tx-gray tx-12 tx-14 mb-0">
                              Pending Campaigns
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* col */}
                    <div className="col-sm-6 col-xs-6 col-lg-3 mg-t-10">
                      <div className="card card-body p-3 rounded bd-0 shadow-sm analytics-card">
                        <div className="d-flex d-lg-block d-xl-flex">
                          <span>
                            <img
                              className="icon img-fluid"
                              src="../assets/img/Reported_Ads.svg"
                              alt="Rejected Campaign"
                            />
                          </span>
                          <div className="ml-3">
                            <p className="tx-bold tx-bold tx-28 mg-b-0 lh-1 white">
                              {providerCampaignList
                                ? providerCampaignList?.rejected?.filter(
                                    (x) => x.isRejected === true
                                  )?.length
                                : 0}
                              {providerCampaignList?.rejected?.length > 1000
                                ? "k"
                                : ""}
                            </p>
                            <p className="tx-gray tx-12 tx-14 mb-0">
                              Rejected Campaigns
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* col */}
                  </div>
                  <div className="card rounded bd-0 shadow-sm mg-t-40">
                    <div className="card-body pd-md-x-30 pd-t- mg-t-20 mg-md-t-0">
                      <MDBDataTable
                        responsive
                        data={setAllBillbordCampaigns()}
                        className="px-3 scroll"
                        bordered
                        striped
                        hover
                        barReverse
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
