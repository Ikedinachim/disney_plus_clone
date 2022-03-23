import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  updateInfluencerProfile,
  updatingInfluencerCost,
  getUser,
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
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { updateInfluencer, loading, error } = useSelector(
    (state) => state.updateInfluencerProfile || []
  );
  const { updateInfluencerCost, influencerDetails, userDetails } = useSelector(
    (state) => state || []
  );
  const { user } = useSelector((state) => state.auth || []);

  const influencer = useMemo(() => {
    return {
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
    };
  }, [user]);

  const [updateCost, setUpdateCost] = useState({});

  const [profile, setProfile] = useState({});

  const [profileImage, setProfileImage] = useState(null);
  const [progressIncrement, setProgress] = useState(null);
  const [isUploading, setIsUploading] = useState(null);

  const getBase64Image = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      let width = "";
      let height = "";

      const MAX_WIDTH = 1600;
      const MAX_HEIGHT = 1600;

      const img = new Image();

      img.style.imageOrientation = "from-image";

      img.src = event.target.result;

      img.onload = () => {
        width = img.width;
        height = img.height;

        if (width / MAX_WIDTH > height / MAX_HEIGHT) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        canvas.style.imageOrientation = "from-image";
        ctx.fillStyle = "rgba(255,255,255,0.0)";
        ctx.fillRect(0, 0, 700, 600);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(img, 0, 0, width, height);

        const data = ctx.canvas.toDataURL("image/jpeg");
        callback(data);
      };
    };
    reader.onerror = function (error) {
      // console.log("Error: ", error);
    };
  };

  const onInputChange = (event) => {
    setIsUploading(true);

    for (const file of event.target.files) {
      const url = process.env.REACT_APP_CLOUDINARY_URL;

      getBase64Image(file, (base64Value) => {
        const data = {
          // upload_preset: uploadPreset,
          upload_preset: "mysogi",
          file: base64Value,
        };

        const config = {
          // onUploadProgress: function (progressEvent) {
          //   const progress = Math.round(
          //     (progressEvent.loaded * 100) / progressEvent.total
          //   );
          //   setProgress(progress);
          // },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);

            if (percent < 100) {
              setProgress({
                uploadPercentage: percent,
              });
            }
          },
        };

        axios
          .post(url, data, config)
          .then((response) => {
            setIsUploading(false);
            setProfileImage({
              ...profileImage,
              imageUrl: response.data.url,
              selectedFileName: file.name,
              imageAlt: `An image of ${file.name}`,
            });
            setProfile((prevState) => ({
              ...prevState,
              imageUrl: response.data.secure_url,
            }));
          })

          .catch((error) => {
            // console.log(error);
            setIsUploading(false);
          });
      });
    }
  };

  // const imagePosition = (url) => {
  //   const arr = new URL(url).href.split("/");
  //   const transformation = "w_1080,h_1080,c_thumb,g_face/w_1000";

  //   arr.splice(6, 0, transformation);
  //   const joinedArr = arr.join("/");

  //   return joinedArr;
  // };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateInfluencerProfile(payload));
    setProfile({});
    setUpdateCost([]);
    setProfileImage({});
  };

  const handleCostSubmit = (e) => {
    e.preventDefault();
    dispatch(updatingInfluencerCost(payload));
    setProfile({});
    setUpdateCost("");
    setProfileImage({});
  };

  const setImagePreview = () => {
    if (profileImage && profileImage.imageUrl) {
      return profileImage.imageUrl;
    } else if (influencer.imageUrl) {
      return influencer.imageUrl;
    } else if (userDetails.user.imageUrl) {
      return userDetails.user.imageUrl;
    } else {
      return (
        influencerDetails.influencerDetails.imagePath &&
        influencerDetails.influencerDetails.imagePath
      );
    }
  };

  let payload = {
    id: influencer.id,
    profile,
    updatedCosts: {
      updatedCosts: Object.entries(updateCost).map(([k, v]) => ({ [k]: v })),
    },
  };
  useEffect(() => {
    // let plaformCost;
    // plaformCost = Object.entries(updateCost).map(([k, v]) => ({ [k]: v }));

    // payload = {
    //   id: influencer.id,
    //   profile,
    //   updatedCosts: { updatedCosts: plaformCost },
    // };

    if (updateInfluencer && updateInfluencer.statusCode === 100) {
      toast.success(updateInfluencer.message);
      dispatch({ type: UPDATE_INFLUENCER_PROFILE_RESET });
      dispatch(getInfluencerDetails(influencer.id));
      dispatch(getUser());
    }
    if (
      updateInfluencerCost.updateCosts &&
      updateInfluencerCost.updateCosts.statusCode === 100
    ) {
      toast.success(updateInfluencerCost.updateCosts.message);
      dispatch({ type: UPDATE_INFLUENCER_COST_RESET });
      dispatch(getInfluencerDetails(influencer.id));
      dispatch(getUser());
    }
    if (error || updateInfluencerCost.updateCosts.error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }

    // return payload;
  }, [
    dispatch,
    updateCost,
    updateInfluencerCost,
    profile,
    error,
    influencerDetails,
    profileImage,
    updateInfluencer,
    user,
    influencer,
  ]);

  return (
    <Fragment>
      {loading ||
      updateInfluencerCost.loading ||
      influencerDetails.idLoading ||
      userDetails.loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Influencer Settings"} />
          <div className="content-body">
            <div className="container-fluid">
              <p className="tx-28 tx-com tx-bold">Settings</p>
              <div className="card card-body rounded bd-0 shadow-sm pd-lg-x-0 pd-lg-y-30">
                <div className="pd-md-y-20">
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <div className="pd-md-x-30 pd-xl-x-50">
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
                                      src={setImagePreview()}
                                      className="img-fluid wd-100 ht-100 pro-image"
                                      alt={`${userDetails.user.firstName} display`}
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
                                    // onChange={(e) => handleImageUpload(e)}
                                    onChange={onInputChange}
                                  />
                                  {isUploading &&
                                    progressIncrement &&
                                    progressIncrement.uploadPercentage > 0 && (
                                      <span className="mt-2">
                                        <ProgressBar
                                          now={
                                            progressIncrement.uploadPercentage
                                          }
                                          // active
                                          label={`${progressIncrement.uploadPercentage}%`}
                                        />
                                      </span>
                                    )}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pd-md-x-30 pd-xl-x-50">
                          <div className="row justify-content-md-between">
                            <div className="form-group col-md-6">
                              <label className="mb-1 tx-com">First Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={userDetails.user.firstName}
                                name="firstName"
                                defaultValue={userDetails.user.firstName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="mb-1 tx-com">Last Name</label>
                              <input
                                name="lastName"
                                type="text"
                                className="form-control"
                                placeholder={userDetails.user.lastName}
                                defaultValue={userDetails.user.lastName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="mb-1 tx-com">User Name</label>
                              <input
                                name="username"
                                type="text"
                                className="form-control"
                                placeholder={userDetails.user.username}
                                defaultValue={userDetails.user.username}
                                onChange={handleChange}
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="mb-1 tx-com">
                                Email Address
                              </label>
                              <input
                                name="email"
                                type="text"
                                className="form-control"
                                placeholder={userDetails.user.email}
                                defaultValue={userDetails.user.email}
                                // onChange={handleChange}
                                disabled
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="mb-1 tx-com">Password</label>
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
                              <label className="mb-1 tx-com">Occupation</label>
                              <select
                                name="kind"
                                className="custom-select"
                                // value="select channel"
                                defaultValue={
                                  influencerDetails.influencerDetails &&
                                  influencerDetails.influencerDetails.kind
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
                        <div className="pd-md-x-30 pd-xl-x-50">
                          <p className="tx-20 tx-com tx-bold mg-t-30">
                            Pricing
                          </p>
                          <div className="row justify-content-md-between">
                            <div className="form-group col-md-6">
                              <label className="mb-1 tx-com">
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
                              <label className="mb-1 tx-com">Amount</label>
                              <input
                                name="instagram"
                                type="text"
                                defaultValue={
                                  (influencerDetails.influencerDetails &&
                                    influencerDetails.influencerDetails.costs.find(
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
                              <label className="mb-1 tx-com">
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
                              <label className="mb-1 tx-com">Amount</label>
                              <input
                                name="twitter"
                                type="text"
                                defaultValue={
                                  (influencerDetails.influencerDetails &&
                                    influencerDetails.influencerDetails.costs.find(
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
                              <label className="mb-1 tx-com">
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
                              <label className="mb-1 tx-com">Amount</label>
                              <input
                                name="snapchat"
                                type="text"
                                defaultValue={
                                  (influencerDetails.influencerDetails &&
                                    influencerDetails.influencerDetails.costs.find(
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
                              <label className="mb-1 tx-com">
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
                              <label className="mb-1 tx-com">Amount</label>
                              <input
                                name="facebook"
                                type="text"
                                defaultValue={
                                  (influencerDetails.influencerDetails &&
                                    influencerDetails.influencerDetails.costs.find(
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
