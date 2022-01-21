import React, { Fragment, useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import { getAllInfluencers } from "../actions/campaignActions";

import Loader from "../influencer/components/layout/Loader";
import MetaData from "../influencer/components/layout/MetaData";

const InfluencerSettings = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { Influencers, loading } = useSelector(
    (state) => state.allInfluencers || []
  );

  //   const toggleHandler = (item) => (e) => {
  //     const isChecked = e.target.checked;
  //     if (isChecked) {
  //       setCloseModal(true);
  //       setInfluencerId(e.target.value);
  //     } else {
  //       setCloseModal(false);
  //     }
  //     // console.log();
  //     let singleInfluencer = Influencers.find((el) => el.id === item.id);
  //     singleInfluencer.platforms = [];
  //     setCheckedInfluencer(singleInfluencer);
  //     setPayloadData((state) => ({
  //       ...state,
  //       [item.id]: state[item.id]
  //         ? null
  //         : {
  //             id: item.id,
  //           },
  //     }));
  //     // handleCheckedState(checkedInfluencer);
  //   };

  useEffect(() => {
    dispatch(getAllInfluencers());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Influencer Settings"} />
          <div className="content-body">
            <div className="container-fluid">
              <p className="tx-28 tx-com tx-bold">Settings</p>
              <div className="card card-body rounded bd-0 shadow-sm pd-lg-x-0 pd-lg-y-30">
                <div className="pd-md-y-20">
                  <div className>
                    <form>
                      <div>
                        <div id className="pd-md-x-30 pd-xl-x-50">
                          <p className="tx-22 tx-com tx-bold mb-2">
                            Personal Details
                          </p>
                          <p className="tx-14 tx-blac">
                            View your setup details here
                          </p>
                          <div className="form-drop col-md-4 pd-x-0 ">
                            <div className="drop-zone-form pd-b-40">
                              <div className="cell">
                                <div className="drop-zone__prompt">
                                  <div className="d-flex">
                                    <img
                                      src="../assets/img/tiwa.jpeg"
                                      className="img-fluid wd-100 ht-100 pro-image"
                                      alt=""
                                      srcSet
                                    />
                                    <p className="p-14 mg-t-20 tx-primary mg-l-15">
                                      Click to change photo <br /> (Not more
                                      than 1mb)
                                    </p>
                                  </div>
                                </div>
                                <input
                                  type="file"
                                  name="myFile"
                                  className="drop-zone__input"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id className="card-scroll pd-md-x-30 pd-xl-x-50">
                          <div className="row justify-content-md-between">
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="John"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="John"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                User Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="JohnDoe"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Email Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="JohnDoe@gmail.com"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="********"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Occupation
                              </label>
                              <select id="gender" className="form-control">
                                <option value />
                                <option value="m">Artiste</option>
                                <option value="f">Comedian</option>
                                <option value="b">Actor</option>
                              </select>
                            </div>
                          </div>
                          <p className="tx-20 tx-com tx-bold mg-t-30">
                            Pricing
                          </p>
                          <div className="row justify-content-md-between">
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Instagram Handle
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="@tomedow"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Amount
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="N500,000.00"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Twitter Handle
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="@Johndoe"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Amount
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="N500,000.00"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Snapchat Handle
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="@tomedow"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Amount
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="N500,000.00"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Facebook Handle
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="@tomedow"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Amount
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="N500,000.00"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pd-x-0 pd-md-l-30 pd-xl-l-50 mg-y-40">
                        <div className="d-flex">
                          <button
                            type="button"
                            className="btn btn-primary w-100 "
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-primary w-100 mg-l-20"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default InfluencerSettings;
