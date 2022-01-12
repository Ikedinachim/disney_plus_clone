import React, { Fragment, useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import { getAllInfluencers } from "../../../../actions/campaignActions";

import Loader from "../../../loader";
import MetaData from "../../../layout/MetaData";
import InfluencerCard from "./InfluencerCard";
import InfluencerPlatformModal from "./InfluencerPlatformModal";
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
  closePlatFormModal,
}) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { Influencers, loading } = useSelector(
    (state) => state.allInfluencers || []
  );

  // console.log(Influencers);

  let invalidEntries = 0;

  function filterByID(item) {
    if (Number.isFinite(item.id) && item.id !== 0) {
      return true;
    }
    invalidEntries++;
    return false;
  }

  // console.log(singleInfluencer);

  const [checkedInfluencer, setCheckedInfluencer] = useState({});

  const ref = useRef();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [influencerId, setInfluencerId] = useState("");
  // console.log(influencerId);

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

  const toggleHandler = (item) => (e) => {
    // console.log(item);
    const isChecked = e.target.checked;
    if (isChecked) {
      setCloseModal(true);
      setInfluencerId(e.target.value);
    } else {
      setCloseModal(false);
    }
    setCheckedInfluencer((state) => ({
      ...state,
      [item.id]: state[item.id]
        ? null
        : {
            id: item.id,
          },
    }));
    // influencerPlatform(item);
  };

  useEffect(() => {
    dispatch(getAllInfluencers());
    // const singleInfluencer = Influencers.filter(filterByID);
    // console.log("singleInfluencer" + " " + singleInfluencer);
  }, [
    dispatch,
    // checkedInfluencer,
    // isMenuOpen,
  ]);

  // const influencerPlatform = (item) => {
  //   Influencers.filter((influencer) => influencer.id === item.id).map(
  //     (influencer) => influencer.costs
  //   );
  // };
  // console.log(influencerPlatform);

  // const influencerPlatform = (filter) => {
  //   Influencers?.find((Influencers) => Influencers.id === filter.id);
  // };

  // function findById(source, id) {
  //   return source.filter(function (obj) {
  //     // coerce both obj.id and id to numbers
  //     // for val & type comparison
  //     return +obj.id === +id;
  //   })[0];
  // }

  // var influencerPlatform = findById(Influencers, 2);

  // console.log(influencerPlatform);

  console.log(checkedInfluencer);

  // const influencerPlatformDetails = Influencers.map((influencer) =>
  //   influencer.costs.map((platform) => platform)
  // );

  let data = [
    {
      id: 1,
      name: "Yusuf Oguntola",
      kind: "blogger",
      reach: 200,
      imageUrl: "1/excel_exploration.png",
      imagePath: "https://mysogi.uat.com.ng/1/excel_exploration.png",
      allCost: "3500.00",
      createdAt: "2022-01-10T13:33:36.325Z",
      updatedAt: "2022-01-10T13:37:32.145Z",
      costs: [
        {
          id: 1,
          influencerId: 1,
          platform: "twitter",
          cost: "1000.00",
          createdAt: "2022-01-10T13:36:40.248Z",
          updatedAt: "2022-01-10T13:36:40.248Z",
        },
        {
          id: 2,
          influencerId: 1,
          platform: "instagram",
          cost: "1000.00",
          createdAt: "2022-01-10T13:36:49.534Z",
          updatedAt: "2022-01-10T13:36:49.534Z",
        },
        {
          id: 3,
          influencerId: 1,
          platform: "facebook",
          cost: "1000.00",
          createdAt: "2022-01-10T13:36:57.429Z",
          updatedAt: "2022-01-10T13:36:57.429Z",
        },
        {
          id: 4,
          influencerId: 1,
          platform: "snapchat",
          cost: "1000.00",
          createdAt: "2022-01-10T13:37:08.545Z",
          updatedAt: "2022-01-10T13:37:08.545Z",
        },
      ],
    },
    {
      id: 2,
      name: "Ixoria",
      kind: "blogger",
      reach: 10000000,
      imageUrl: "2/Blogger.PNG",
      imagePath: "https://mysogi.uat.com.ng/2/Blogger.PNG",
      allCost: "50000.00",
      createdAt: "2022-01-10T19:49:55.990Z",
      updatedAt: "2022-01-10T19:49:56.011Z",
      costs: [
        {
          id: 5,
          influencerId: 2,
          platform: "instagram",
          cost: "200000.00",
          createdAt: "2022-01-10T23:00:45.097Z",
          updatedAt: "2022-01-10T23:00:45.097Z",
        },
        {
          id: 6,
          influencerId: 2,
          platform: "facebook",
          cost: "20000.00",
          createdAt: "2022-01-10T23:01:26.790Z",
          updatedAt: "2022-01-10T23:01:26.790Z",
        },
      ],
    },
    {
      id: 3,
      name: "Lexy",
      kind: "blogger",
      reach: 9000000,
      imageUrl: "3/Blogger.JPG",
      imagePath: "https://mysogi.uat.com.ng/3/Blogger.JPG",
      allCost: "23300.00",
      createdAt: "2022-01-10T19:55:37.647Z",
      updatedAt: "2022-01-10T19:55:37.658Z",
      costs: [],
    },
  ];

  // const influencerPlatform2 = data.filter(
  //   (selectedInfluencerPlatform) =>
  //     selectedInfluencerPlatform.id === parseInt(influencerId)
  // );
  //
  // const influencerPlatform = data.filter((selectedInfluencerPlatform) =>
  //   (selectedInfluencerPlatform.id === parseInt(influencerId)).map(
  //     (selectedInfluencerPlatform) => selectedInfluencerPlatform.costs
  //   )
  // );

  const influencerPlatform = data
    .filter(function (selectedInfluencerPlatform) {
      return selectedInfluencerPlatform.id === parseInt(influencerId);
    })
    .map(function (selectedInfluencerPlatform) {
      return selectedInfluencerPlatform.costs;
    });

  console.log(influencerPlatform);

  const singleInfluencer = data.find(function (influencer) {
    return influencer.id == parseInt(influencerId);
  });

  const sortIcon = (icon) => {
    if (icon.platform === "instagram") {
      return (
        <i className="fa fa-instagram mg-r-5 social-media" aria-hidden="true" />
      );
    } else if (icon.platform === "twitter") {
      return (
        <i className="fa fa-twitter mg-r-5 social-media" aria-hidden="true" />
      );
    } else if (icon.platform === "facebook") {
      return (
        <i className="fa fa-facebook mg-r-5 social-media" aria-hidden="true" />
      );
    } else if (icon.platform === "snapchat") {
      return (
        <i className="fa fa-snapchat mg-r-5 social-media" aria-hidden="true" />
      );
    }
  };

  console.log(singleInfluencer && singleInfluencer.costs);
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
                    // checkedInfluencer={checkedInfluencer}
                    toggleHandler={toggleHandler}
                    // handleInfluencerChange={handleInfluencerChange}
                    // handleCheck={handleCheck}
                    show={selectedInfluencer}
                    // setShow={setShow}
                    // onClick={() => setShow(true)}
                  />
                  // <div key={influencer.id}>
                  //   <input
                  //     name={influencer.name}
                  //     value={influencer.name}
                  //     checked={show}
                  //     onChange={(e) => (e.target.checked = setShow(!show))}
                  //     type="checkbox"
                  //   />
                  // </div>
                ))}
              </div>
              {/* <button onClick={() => setCloseModal(true)}>Show Modal</button> */}
              {/*side Modal */}
              {/* {influencer.cost.map((platform) => ( */}
              {/* <InfluencerPlatformModal
              // key={platform.id}
              // platform={platform}
              // influencerPlatformDetails={influencerPlatformDetails}
              /> */}
              {/* ))} */}
              <InfluencerModal
                title="My Modal"
                // onClose={closePlatFormModal(false)}
                onClose={() => setCloseModal(false)}
                show={closeModal}
                influencerId={influencerId}
                influencerPlatform={influencerPlatform}
                singleInfluencer={singleInfluencer}
                sortIcon={sortIcon}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default InfluencerCampaign;
