import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getAllInfluencers } from "../../../../actions/campaignActions";
import Loader from "../../../loader";
import MetaData from "../../../layout/MetaData";
import InfluencerCard from "./InfluencerCard";
import InfluencerModal from "./InfluencerModal";

const InfluencerCampaign = ({
  nextStep,
  values,
  handleImageUpload,
  handleInfluencerChange,
  handleCheck,
  selectedInfluencer,
  showModal,
  activeItemId,
  handleCheckedState,
}) => {
  const dispatch = useDispatch();

  const { Influencers, loading } = useSelector(
    (state) => state.allInfluencers || []
  );

  const [checkedInfluencer, setCheckedInfluencer] = useState(null);

  // const ref = useRef();
  const [closeModal, setCloseModal] = useState(false);
  const [influencerId, setInfluencerId] = useState("");

  const Continue = (e) => {
    nextStep();
  };

  const toggleHandler = (item) => (e) => {
    const isChecked = e.target.checked;
    let singleInfluencer = Influencers.find((el) => el.id === item.id);
    if (isChecked) {
      setCloseModal(true);
      setInfluencerId(e.target.value);
      singleInfluencer.platforms = [];
      setCheckedInfluencer(singleInfluencer);
    } else {
      setCloseModal(false);
    }

    // setPayloadData((state) => ({
    //   ...state,
    //   [item.id]: state[item.id] ? null : singleInfluencer,
    // }));
    // handleCheckedState(checkedInfluencer);
  };

  const handlePlatformOnChange = (item) => (e) => {
    const isChecked = e.target.checked;
    const influencer = { ...checkedInfluencer };
    let platforms = influencer.platforms;

    if (!isChecked) {
      if (item !== "all") {
        const platformIndex = platforms.findIndex(
          (x) => x.id === item.platform
        );
        platforms.splice(platformIndex, 1);
        let allIndex = platforms.findIndex((el) => el.id === "all");
        if (allIndex !== -1) platforms.splice(allIndex, 1);
      } else {
        const platformIndex = platforms.findIndex((x) => x.id === item);
        platforms.splice(platformIndex, 1);
      }
      setCheckedInfluencer((state) => ({
        ...state,
        platforms: [...platforms],
      }));
    } else {
      platforms.push({
        id: item !== "all" ? item.platform : item,

        cost: item !== "all" ? item.cost : influencer.allCost,
      });
      if (item === "all") {
        platforms = checkedInfluencer.costs.map((el) => {
          return {
            id: el.platform,
            cost: el.cost,
          };
        });
        platforms.push({
          id: "all",
          cost: checkedInfluencer.allCost,
        });
      }
      setCheckedInfluencer((state) => ({
        ...state,
        platforms: [...platforms],
      }));
    }
  };

  useEffect(() => {
    dispatch(getAllInfluencers());
  }, [dispatch]);

  useEffect(() => {
    if (checkedInfluencer !== null) {
      handleCheckedState(checkedInfluencer);
    }
  }, [handleCheckedState, checkedInfluencer]);

  // console.log("This is the payload data", payloadData);
  // console.log("This is the checkedInfluencer data", checkedInfluencer);

  // const customFilter = (object, key, value) => {
  //   if (Array.isArray(object)) {
  //     for (const obj of object) {
  //       const result = customFilter(obj, key, value);
  //       if (result) {
  //         return obj;
  //       }
  //     }
  //   } else {
  //     if (object.hasOwnProperty(key) && object[key] === value) {
  //       return object;
  //     }

  //     for (const k of Object.keys(object)) {
  //       if (typeof object[k] === "object") {
  //         const o = customFilter(object[k], key, value);
  //         if (o !== null && typeof o !== "undefined") return o;
  //       }
  //     }

  //     return null;
  //   }
  // };

  const sortIcon = (icon) => {
    if (icon.platform === "instagram") {
      return (
        <i
          className="fab fa-instagram mg-r-5 social-media"
          aria-hidden="true"
        />
      );
    } else if (icon.platform === "twitter") {
      return (
        <i className="fab fa-twitter mg-r-5 social-media" aria-hidden="true" />
      );
    } else if (icon.platform === "facebook") {
      return (
        <i
          className="fab fa-facebook-square  mg-r-5 social-media"
          aria-hidden="true"
        />
      );
    } else if (icon.platform === "snapchat") {
      return (
        <i className="fab fa-snapchat mg-r-5 social-media" aria-hidden="true" />
      );
    }
  };

  // const convertToArray = (arr1) => {
  //   Object.entries(arr1);
  // };

  // const mergeArrayObjects = (arr1, arr2) => {
  //   return arr1.map((item, i) => {
  //     if (item.id === arr2[i].influencerId) {
  //       //merging two objects
  //       return Object.assign({}, item, arr2[i]);
  //     }
  //   });
  // };

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
                {Influencers &&
                  Influencers.map((influencer) => (
                    <InfluencerCard
                      key={influencer.id}
                      influencer={influencer}
                      toggleHandler={toggleHandler}
                      show={selectedInfluencer}
                    />
                  ))}
              </div>
              <div className="col-md-2 col-xl-2 col-sm-12 pd-x-0 mg-y-50">
                <div className="d-flex">
                  <Link
                    to="/app/campaign/create"
                    className="btn btn-outline-primary w-100 mg-b-15"
                  >
                    Go Back
                  </Link>
                </div>
              </div>
              <InfluencerModal
                title="My Modal"
                // onClose={closePlatFormModal(false)}
                onClose={() => setCloseModal(false)}
                show={closeModal}
                influencerId={influencerId}
                singleInfluencer={checkedInfluencer}
                sortIcon={sortIcon}
                handlePlatformOnChange={handlePlatformOnChange}
                // handleAllCostSelection={handleAllCostSelection}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default InfluencerCampaign;
