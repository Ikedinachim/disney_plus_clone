import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DateTime } from "luxon";
import NumberFormat from "react-number-format";

import MetaData from "../../layout/MetaData";
import Loader from "../../loader";
import { getSenderID } from "../../../actions/senderIDActions";
import { getAllCampaign } from "../../../actions/campaignActions";
import TransactionHistory from "./TransactionHistory";
import CampaignCard from "./CampaignCard";

const BillingOverview = () => {
  const dispatch = useDispatch();

  const {
    allCampaign: { reverseAllCampaign, loading: campaignLoading },
    wallet: { wallet },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getSenderID());
    dispatch(getAllCampaign());
  }, [dispatch]);

  const [filteredItems, setfilteredItems] = useState(reverseAllCampaign);

  // to set filtereditems initially to reverseAllCampaign
  useEffect(() => {
    setfilteredItems(reverseAllCampaign);
  }, [reverseAllCampaign]);

  const filterItem = (createdAt) => {
    if (!createdAt) {
      return setfilteredItems(reverseAllCampaign);
    }
    let newItem = reverseAllCampaign.filter(
      (campaign) =>
        DateTime.fromJSDate(new Date(campaign.createdAt)).toFormat(
          "yyyy-MM"
        ) === createdAt
    );
    setfilteredItems(newItem);
  };

  return (
    <Fragment>
      {campaignLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Billing Overview"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="row justify-content-between">
                <div className="col-md-6 col-12 ">
                  <p className="tx-28 tx-bold billing-info ">
                    Billing Overview
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-12 billing-info">
                  <div className="card rounded bd-0 shadow-sm">
                    <div className="card-body">
                      <p className="tx-18 billing-info-bold">
                        Billing Information
                      </p>
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <p className="tx-uppercase mb-0 tx-16">
                            Current Balance
                          </p>
                          <p className="tx-32 tx-semibold tx-green">
                            +{" "}
                            <NumberFormat
                              value={parseInt(wallet && wallet.balance)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₦"}
                            />
                          </p>
                          <Link
                            to="/app/billing/fund-wallet"
                            className="btn btn-primary mg-t-10 mg-md-t-30"
                          >
                            <i className="fa fa-plus mg-r-5" /> Fund Wallet{" "}
                          </Link>
                        </div>
                        <div className="col-md-6 col-12 mg-t-20 mg-md-t-0">
                          <p className="mb-1 tx-16">Auto recharge</p>
                          <div className="custom-control custom-switch mg-t-10">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitch1"
                              disabled
                            />
                            <label
                              className="custom-control-label tx-blac"
                              htmlFor="customSwitch1"
                            >
                              Disabled
                            </label>
                          </div>
                          {/* <div className="mg-t-20">
                            <p className="tx-16 mb-1">Invoice</p>
                            <p className="tx-12 tx-blac">
                              Your next invoice will be ready on 12th Sept. 2021
                            </p>
                            <div className="d-flex">
                              <select className="col-7 custom-select mg-r-10">
                                <option selected>August 2021</option>
                                <option value={1}>August 2021</option>
                                <option value={2}>October 2021</option>
                                <option value={3}>March 2021</option>
                              </select>
                              <select className="w-100 custom-select">
                                <option selected>PDF</option>
                                <option value={1}>PDF</option>
                                <option value={2}>CSV</option>
                                <option value={3}>EXV</option>
                              </select>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-12 mg-t-20 mg-md-t-0 d-none">
                  <div className="card card-height rounded bd-0 shadow-sm">
                    <div className="card-body">
                      <p className="tx-18">Preferences</p>
                      <p className="tx-16">
                        Service Address (for taxation purposes)
                      </p>
                      <p className="tx-16">
                        1 Asubiaro Street, <br />
                        Jibowu Yaba, <br />
                        Lagos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mg-t-30">
                <div className="col-md-7 col-12">
                  <div className="row justify-content-between mg-b-5">
                    <div className="col-md-4 col-12">
                      <p className="mg-md-b-0 pd-t-10 tx-medium billing-info-bold">
                        Usage Summary
                      </p>
                    </div>
                    <div className="col-md-5 col-12">
                      <div className="d-flex">
                        <input
                          type={"month"}
                          className="col-8 custom-select col-7"
                          min="2021-03"
                          id="myCalendar"
                          pattern="[0-9]{4}-[0-9]{2}"
                          onChange={(e) => {
                            filterItem(e.target.value);
                          }}
                        ></input>

                        <p className="mg-b-10 ml-auto pd-t-10">
                          <Link
                            to="../campaigns"
                            className="tx-primary tx-medium"
                          >
                            View All
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card rounded bd-0 shadow-sm">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-borderless" id="campaig">
                          <thead className="tx-uppercase tx-medium">
                            <tr>
                              <th scope="col">Product</th>
                              <th scope="col" className="tx-right">
                                Cost
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredItems &&
                              filteredItems
                                .slice(0, 4)
                                .map((allCampaign) => (
                                  <CampaignCard
                                    key={allCampaign.id}
                                    campaign={allCampaign}
                                  />
                                ))}
                            {/* <tr className="tx-medium">
                              <td>Total</td>
                              <td className="tx-right">&#8358;250,000</td>
                            </tr> */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-12 mg-md-t-0 mg-t-20">
                  <TransactionHistory />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BillingOverview;
