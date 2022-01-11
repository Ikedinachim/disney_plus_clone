import React, { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import { getAllInfluencers } from "../../../../actions/campaignActions";

import Loader from "../../../loader";
import MetaData from "../../../layout/MetaData";
import InfluencerCard from "./InfluencerCard";
import InfluencerPlatformModal from "./InfluencerPlatformModal";

const FlierVideoCampaign = ({ nextStep, values, handleImageUpload }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { Influencers, loading } = useSelector(
    (state) => state.allInfluencers || []
  );

  const [checkedInfluencer, setCheckedInfluencer] = useState({});

  const Continue = (e) => {
    e.preventDefault();
    if (values.callToAction === "") {
      alert.error("Provide a call to action for users");
    } else if (values.channel === "") {
      alert.error("Choose a channel");
    } else if (values.campaignMessage === "") {
      alert.error("Create the campaign message");
    } else {
      nextStep();
      handleImageUpload();
    }
  };

  const toggleHandler = (item) => () => {
    setCheckedInfluencer((state) => ({
      ...state,
      [item.id]: state[item.id]
        ? null
        : {
            id: item.id,
          },
    }));
  };

  useEffect(() => {
    dispatch(getAllInfluencers());
    console.log(checkedInfluencer);
  }, [dispatch, checkedInfluencer]);

  // console.log(checkedInfluencer);

  // const influencerPlatformDetails = Influencers.map((influencer) =>
  //   influencer.costs.map((platform) => platform)
  // );

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Influencer Campaign"} />
          <div className="content-body">
            <div className="container pd-x-0">
              <div className="mg-b-20 mg-md-b-50">
                <div className="d-flex justify-content-between">
                  <p className="tx-18 mb-0 tx-com tx-bold">60%</p>
                  <p className="tx-18 mb-0 tx-com tx-bold">2 out of 3</p>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-primary progress-bar-striped progress-bar-animated wd-60p"
                    role="progressbar"
                    aria-valuenow={60}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col-md-5 col-12 mg-b-20">
                  <p className="tx-20 mb-1">Influencers</p>
                  <p className="tx-blac">
                    Select your choice influencer to help promote your business
                  </p>
                </div>
                <div className="col-md-5 col-12 mg-b-20">
                  <div className="d-flex float-md-right">
                    <div>
                      <div className="d-flex justify-content-end">
                        <form
                          id="searchExpanding"
                          className="search-form search-form-expanding bd-0"
                        >
                          <input
                            type="search"
                            className="form-control bd-0"
                            placeholder="Search"
                          />
                          <button className="btn bd-0 tx-primary" type="button">
                            <img src="../../assets/img/search.svg" alt="" />
                          </button>
                        </form>
                        {/* search-form */}
                      </div>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary pd-x-50 mg-l-10"
                        onClick={Continue}
                        type="submit"
                        variant="contained"
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {Influencers.map((influencer) => (
                  <InfluencerCard
                    key={influencer.id}
                    influencer={influencer}
                    checkedInfluencer={checkedInfluencer}
                    toggleHandler={toggleHandler}
                  />
                ))}
              </div>
              {/*side Modal */}
              <InfluencerPlatformModal
              // influencerPlatformDetails={influencerPlatformDetails}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default FlierVideoCampaign;
