import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import {
  updateInfluencerProfile,
  updateInfluencerCost,
} from "../actions/authActions";

import MetaData from "../components/layout/MetaData";
import Loader from "../components/loader";
import axios from "axios";
import {
  CLEAR_ERRORS,
  UPDATE_INFLUENCER_PROFILE_RESET,
  UPDATE_INFLUENCER_COST_RESET,
} from "../constants/authConstants";
import { getInfluencerDetails } from "../actions/campaignActions";
import { ProgressBar } from "react-bootstrap";

const InfluencerSettings = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { updateInfluencer, loading, error } = useSelector(
    (state) => state.updateInfluencerProfile || []
  );
  const { updateCosts } = useSelector(
    (state) => state.updateInfluencerCost || []
  );
  const { influencerDetails } = useSelector(
    (state) => state.influencerDetails || []
  );
  const { user } = useSelector((state) => state.auth || []);

  const [influencer, setInfluencer] = useState({
    id: user.user.influencer_id,
    firstName: user.user.firstName,
    lastName: user.user.lastName,
    username: user.user.userName,
    email: user.user.email,
    password: "",
    occupation: "",
    selectedFileName: "",
    imageUrl: null,
    imageAlt: "",
    uploadPercentage: 0,
    updatedCosts: [],
  });

  const [updateCost, setUpdateCost] = useState({});

  const [profile, setProfile] = useState({});

  const [profileImage, setProfileImage] = useState({});
  console.log(profileImage);

  const handleImageUpload = async (e) => {
    let files = e.target.files[0];
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "mysogi");

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);

        if (percent < 100) {
          setProfileImage({
            ...profileImage,
            uploadPercentage: percent,
          });
        }
      },
    };

    try {
      await axios
        .post(
          "https://api.Cloudinary.com/v1_1/mysogi/image/upload",
          formData,
          options
        )
        .then((res) => {
          setProfileImage(
            {
              ...profileImage,
              imageUrl: res.data.secure_url,
              uploadPercentage: 100,
              selectedFileName: files.name,
              imageAlt: `An image of ${files.name}`,
            },
            () => {
              setTimeout(() => {
                setProfileImage({
                  ...profileImage,
                  uploadPercentage: 0,
                });
              }, 1000);
            }
          );
          setProfileImage({
            ...profileImage,
            uploadPercentage: 0,
          });
          setProfile((prevState) => ({
            ...prevState,
            imageUrl: res.data.secure_url,
          }));
        });
    } catch (err) {}
  };

  const isEmpty = (object) => {
    for (const property in object) {
      return false;
    }
    return true;
  };

  const setImage = (query) => {
    if (isEmpty(query)) {
      setProfile((prevState) => ({
        ...prevState,
        imageUrl: profileImage.imageUrl,
      }));
    }
  };

  const occupations = [
    {
      label: "Choose Occupation",
      value: "",
    },
    {
      label: "Artist",
      value: "artist",
    },
    {
      label: "Comedian",
      value: "comedian",
    },
    {
      label: "Actor",
      value: "actor",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCostChange = (e) => {
    const { name, value } = e.target;
    setUpdateCost((updateCost) => ({
      ...updateCost,
      [name]: value,
    }));
    // let query = { [name]: value };
    // setUpdateCost({ ...updateCost.updateCost, query });
  };
  let payload = {};

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateInfluencerProfile(payload));
    setProfile({});
    setUpdateCost([]);
    setProfileImage({});
  };

  const handleCostSubmit = (e) => {
    e.preventDefault();
    dispatch(updateInfluencerCost(payload));
    setProfile({});
    setUpdateCost("");
    setProfileImage({});
  };

  // const handlePricingSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(profileImage);
  //   dispatch(updateInfluencerProfile(payload.updatedCosts));
  //   setProfile({});
  //   setUpdateCost([]);
  // };

  // const setCost = (query) => {
  //   (influencerDetails &&
  //     influencerDetails.influencerDetails.costs.find(
  //       (c) => c.platform === query
  //     )?.cost) ||
  //     0;
  // };

  useEffect(() => {
    let plaformCost;
    plaformCost = Object.entries(updateCost).map(([k, v]) => ({ [k]: v }));

    payload = {
      id: influencer.id,
      profile,
      updatedCosts: { updatedCosts: plaformCost },
    };

    if (updateInfluencer && updateInfluencer.statusCode === 100) {
      alert.success(updateInfluencer.message);
      dispatch({ type: UPDATE_INFLUENCER_PROFILE_RESET });
      dispatch(getInfluencerDetails(influencer.id));
    }
    if (updateCosts && updateCosts.statusCode === 100) {
      alert.success(updateCosts.message);
      dispatch({ type: UPDATE_INFLUENCER_COST_RESET });
      dispatch(getInfluencerDetails(influencer.id));
    }
    if (error || updateCosts.error) {
      alert.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [
    dispatch,
    updateCost,
    updateCosts,
    profile,
    payload,
    profileImage,
    updateInfluencer,
  ]);

  console.log(influencerDetails);

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
                    <form onSubmit={handleSubmit}>
                      <div>
                        <div id className="pd-md-x-30 pd-xl-x-50">
                          <p
                            className="tx-22 tx-com tx-bold mb-2"
                            htmlFor="customFile"
                          >
                            Personal Details
                          </p>
                          <p className="tx-14 tx-blac">
                            View your setup details here
                          </p>
                          <div className="form-drop col-md-4 pd-x-0 ">
                            <div className="drop-zone-form pd-b-40">
                              <div className="cell">
                                <label
                                  htmlFor="photo-upload"
                                  className="custom-file-upload"
                                >
                                  <div className="d-flex">
                                    <img
                                      htmlFor="photo-upload"
                                      src={
                                        influencerDetails &&
                                        influencerDetails.imagePath
                                      }
                                      className="img-fluid wd-100 ht-100 pro-image"
                                      alt={`${influencer.firstName} display picture`}
                                    />
                                    <p
                                      htmlFor="photo-upload"
                                      className="p-14 mg-t-20 tx-primary mg-l-15"
                                    >
                                      Click to change photo <br /> (Not more
                                      than 1mb)
                                    </p>
                                  </div>
                                  <input
                                    type="file"
                                    name="file"
                                    // className="drop-zone__input"
                                    accept="image/png, image/jpeg, image/gif, image/jpg"
                                    className="custom-file-input"
                                    id="photo-upload"
                                    onChange={(e) => handleImageUpload(e)}
                                  />
                                  {profileImage.uploadPercentage > 0 && (
                                    <span className="mt-2">
                                      <ProgressBar
                                        now={profileImage.uploadPercentage}
                                        // active
                                        label={`${profileImage.uploadPercentage}%`}
                                      />
                                    </span>
                                  )}
                                </label>
                                {/* <input
                                  type="file"
                                  name="file"
                                  // className="drop-zone__input"
                                  accept="image/png, image/jpeg, image/gif, image/jpg"
                                  className="custom-file-input"
                                  id="photo-upload"
                                  onChange={(e) => handleImageUpload(e)}
                                /> */}
                              </div>
                            </div>
                            {/* <label
                              htmlFor="photo-upload"
                              className="custom-file-upload fas"
                            >
                              <div className="img-wrap img-upload">
                                <img for="photo-upload" src={src} />
                              </div>
                              <input
                                id="photo-upload"
                                type="file"
                                onChange={onChange}
                              />
                            </label> */}
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
                                placeholder={influencer.firstName}
                                name="firstName"
                                defaultValue={influencer.firstName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Last Name
                              </label>
                              <input
                                name="lastName"
                                type="text"
                                className="form-control"
                                placeholder={influencer.lastName}
                                defaultValue={influencer.lastName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                User Name
                              </label>
                              <input
                                name="username"
                                type="text"
                                className="form-control"
                                placeholder={influencer.username}
                                defaultValue={influencer.username}
                                onChange={handleChange}
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Email Address
                              </label>
                              <input
                                name="email"
                                type="text"
                                className="form-control"
                                placeholder={influencer.email}
                                defaultValue={influencer.email}
                                // onChange={handleChange}
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Password
                              </label>
                              <input
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="********"
                                value={influencer.password}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Occupation
                              </label>
                              <select
                                name="kind"
                                className="custom-select"
                                // value="select channel"
                                defaultValue={
                                  influencerDetails && influencerDetails.kind
                                }
                                onChange={handleChange}
                              >
                                {occupations.map((occupation, i) => (
                                  <option value={occupation.value} key={i}>
                                    {occupation.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          {/* <p className="tx-20 tx-com tx-bold mg-t-30">
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
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Amount
                              </label>
                              <input
                                name="instagram"
                                type="text"
                                className="form-control"
                                placeholder="N500,000.00"
                                onBlur={handleCostChange}
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
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Amount
                              </label>
                              <input
                                name="twitter"
                                type="text"
                                className="form-control"
                                placeholder="N500,000.00"
                                onBlur={handleCostChange}
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
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Amount
                              </label>
                              <input
                                name="snapchat"
                                type="text"
                                className="form-control"
                                placeholder="N500,000.00"
                                onBlur={handleCostChange}
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
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Amount
                              </label>
                              <input
                                name="facebook"
                                type="text"
                                className="form-control"
                                placeholder="N500,000.00"
                                onBlur={handleCostChange}
                              />
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div className="col-md-4 pd-x-0 pd-md-l-30 pd-xl-l-50 mg-y-40">
                        <div className="d-flex">
                          <button
                            type="submit"
                            className="btn btn-primary "
                            // onSubmit={handleSubmit}
                          >
                            Save Changes
                          </button>
                          {/* <button
                            type="button"
                            className="btn btn-outline-primary w-100 mg-l-20"
                          >
                            Cancel
                          </button> */}
                        </div>
                      </div>
                    </form>
                    <form onSubmit={handleCostSubmit}>
                      <div>
                        {/* <div id className="pd-md-x-30 pd-xl-x-50">
                          <p
                            className="tx-22 tx-com tx-bold mb-2"
                            htmlFor="customFile"
                          >
                            Personal Details
                          </p>
                          <p className="tx-14 tx-blac">
                            View your setup details here
                          </p>
                          <div className="form-drop col-md-4 pd-x-0 ">
                            <div className="drop-zone-form pd-b-40">
                              <div className="cell">
                                <label
                                  htmlFor="photo-upload"
                                  className="custom-file-upload"
                                >
                                  <div className="d-flex">
                                    <img
                                      htmlFor="photo-upload"
                                      src={
                                        influencerDetails &&
                                        influencerDetails.imagePath
                                      }
                                      className="img-fluid wd-100 ht-100 pro-image"
                                      alt={`${influencer.firstName} display picture`}
                                    />
                                    <p
                                      htmlFor="photo-upload"
                                      className="p-14 mg-t-20 tx-primary mg-l-15"
                                    >
                                      Click to change photo <br /> (Not more
                                      than 1mb)
                                    </p>
                                  </div>
                                  <input
                                    type="file"
                                    name="file"
                                    // className="drop-zone__input"
                                    accept="image/png, image/jpeg, image/gif, image/jpg"
                                    className="custom-file-input"
                                    id="photo-upload"
                                    onChange={(e) => handleImageUpload(e)}
                                  />
                                  {profileImage.uploadPercentage > 0 && (
                                    <span className="mt-2">
                                      <ProgressBar
                                        now={profileImage.uploadPercentage}
                                        // active
                                        label={`${profileImage.uploadPercentage}%`}
                                      />
                                    </span>
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <div id className="card-scroll pd-md-x-30 pd-xl-x-50">
                          {/* <div className="row justify-content-md-between">
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={influencer.firstName}
                                name="firstName"
                                defaultValue={influencer.firstName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Last Name
                              </label>
                              <input
                                name="lastName"
                                type="text"
                                className="form-control"
                                placeholder={influencer.lastName}
                                defaultValue={influencer.lastName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                User Name
                              </label>
                              <input
                                name="username"
                                type="text"
                                className="form-control"
                                placeholder={influencer.username}
                                defaultValue={influencer.username}
                                onChange={handleChange}
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Email Address
                              </label>
                              <input
                                name="email"
                                type="text"
                                className="form-control"
                                placeholder={influencer.email}
                                defaultValue={influencer.email}
                                onChange={handleChange}
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Password
                              </label>
                              <input
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="********"
                                value={influencer.password}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Occupation
                              </label>
                              <select
                                name="kind"
                                className="custom-select"
                                // value="select channel"
                                defaultValue={
                                  influencerDetails && influencerDetails.kind
                                }
                                onChange={handleChange}
                              >
                                {occupations.map((occupation, i) => (
                                  <option value={occupation.value} key={i}>
                                    {occupation.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div> */}
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
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Amount
                              </label>
                              <input
                                name="instagram"
                                type="text"
                                defaultValue={
                                  (influencerDetails &&
                                    influencerDetails.costs.find(
                                      (c) => c.platform === "instagram"
                                    )?.cost) ||
                                  0
                                }
                                className="form-control"
                                placeholder="N500,000.00"
                                onBlur={handleCostChange}
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
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Amount
                              </label>
                              <input
                                name="twitter"
                                type="text"
                                defaultValue={
                                  (influencerDetails &&
                                    influencerDetails.costs.find(
                                      (c) => c.platform === "twitter"
                                    )?.cost) ||
                                  0
                                }
                                className="form-control"
                                placeholder="N500,000.00"
                                onBlur={handleCostChange}
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
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Amount
                              </label>
                              <input
                                name="snapchat"
                                type="text"
                                defaultValue={
                                  (influencerDetails &&
                                    influencerDetails.costs.find(
                                      (c) => c.platform === "snapchat"
                                    )?.cost) ||
                                  0
                                }
                                className="form-control"
                                placeholder="N500,000.00"
                                onBlur={handleCostChange}
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
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Amount
                              </label>
                              <input
                                name="facebook"
                                type="text"
                                defaultValue={
                                  (influencerDetails &&
                                    influencerDetails.costs.find(
                                      (c) => c.platform === "facebook"
                                    )?.cost) ||
                                  ""
                                }
                                className="form-control"
                                placeholder="N500,000.00"
                                onBlur={handleCostChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pd-x-0 pd-md-l-30 pd-xl-l-50 mg-y-40">
                        <div className="d-flex">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            // onSubmit={handleSubmit}
                          >
                            Save Changes
                          </button>
                          {/* <button
                            type="button"
                            className="btn btn-outline-primary w-100 mg-l-20"
                          >
                            Cancel
                          </button> */}
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
