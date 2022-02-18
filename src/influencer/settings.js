import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import { updateInfluencerPassword } from "../actions/authActions";

import Loader from "../influencer/components/layout/Loader";
import MetaData from "../influencer/components/layout/MetaData";
import axios from "axios";

const InfluencerSettings = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { updateInfluencer, loading } = useSelector(
    (state) => state.updateInfluencerProfile || []
  );
  const { user } = useSelector((state) => state.auth || []);
  console.log(user.user.email);

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

  const [influencerDetails, setInfluencerDetails] = useState({
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

  const [updateCost, setUpdateCost] = useState([]);

  const [platformCost, setPlatformCost] = useState([]);

  const handleImageUpload = async (e) => {
    let files = e.target.files[0];
    // console.log(files);
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "mysogi");

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        // console.log(`${loaded}kb of ${total}kb | ${percent}%`);

        if (percent < 100) {
          setInfluencerDetails({
            ...influencerDetails,
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
          // console.log(res);
          setInfluencerDetails(
            {
              ...influencerDetails,
              imageUrl: res.data.secure_url,
              uploadPercentage: 100,
              selectedFileName: files.name,
              imageAlt: `An image of ${res.original_filename}`,
            },
            () => {
              setTimeout(() => {
                setInfluencerDetails({
                  ...influencerDetails,
                  uploadPercentage: 0,
                });
              }, 1000);
            }
          );
        });
    } catch (err) {
      // return console.log(err);
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
    setUpdateCost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCostChange = (e) => {
    const { name, value } = e.target;
    setInfluencerDetails((prevState) => ({
      ...prevState,
      payload: { [name]: value },
    }));
  };

  console.log(influencerDetails);

  useEffect(() => {
    // dispatch(getAllInfluencers());
    console.log(influencerDetails.imageUrl);
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
                                  name="file"
                                  // className="drop-zone__input"
                                  accept="image/png, image/jpeg, image/gif, image/jpg"
                                  className="custom-file-input"
                                  id="customFile"
                                  onChange={(e) => handleImageUpload(e)}
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
                                placeholder={influencerDetails.firstName}
                                name="firstName"
                                defaultValue={influencerDetails.firstName}
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
                                placeholder={influencerDetails.lastName}
                                defaultValue={influencerDetails.lastName}
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
                                placeholder={influencerDetails.username}
                                defaultValue={influencerDetails.username}
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
                                placeholder={influencerDetails.email}
                                defaultValue={influencerDetails.email}
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
                                value={influencerDetails.password}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Occupation
                              </label>
                              {/* <select id="gender" className="form-control">
                                <option value />
                                <option value="m">Artiste</option>
                                <option value="f">Comedian</option>
                                <option value="b">Actor</option>
                              </select> */}
                              <select
                                name="occupation"
                                className="custom-select"
                                // value="select channel"
                                defaultValue={influencerDetails.occupation}
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
                                className="form-control"
                                placeholder="N500,000.00"
                                value={}
                                onChange={handleCostChange}
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
                                disabled
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
                                disabled
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
