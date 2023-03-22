import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// import NaijaStates from "naija-state-local-government";
import { toast } from "react-toastify";
import Select from "react-select";
import NumberFormat from "react-number-format";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { CSVLink } from "react-csv";

import MetaData from "../../../layout/MetaData";
import {
  getFilteredContactList,
  clearErrors,
} from "../../../../actions/campaignActions";

import NaijaStates from "../../../../_helpers/NaijaStates/NaijaStates.js";

const TargetAudience = ({
  prevStep,
  nextStep,
  handleChange,
  handleStateChange,
  handleLgaChange,
  handleAreaChange,
  handleInterestChange,
  numbers,
  personalUpload,
  filterOptions,
  values,
  getCsvRawData,
  ageRangeFrom,
  ageRangeTo,
  arrayState,
  arrayInterest,
  rawLga,
  rawArea,
}) => {
  // const alert = useAlert();
  const dispatch = useDispatch();

  const { filteredContactList, error, fcLoading } = useSelector(
    (state) => state.filteredContactList || []
  );

  useEffect(() => {
    if (values.targetAudienceOption === "mysogidb") {
      dispatch(getFilteredContactList(filterOptions));
    }
  }, [dispatch, filterOptions, values]);

  // Set scheduling date
  let date = new Date();
  let endingDate = new Date(
    values.scheduleFrom !== "" ? values.scheduleFrom : date
  );
  // add 2 day
  date.setDate(date.getDate() + 0);
  endingDate.setDate(date.getDate() + 1);

  const csvData = [
    ["Numbers"],
    ["234890xxxxxxxx"],
    ["234890xxxxxxxx"],
    ["234890xxxxxxxx"],
  ];

  const options = NaijaStates.states().map((state) => {
    return { value: state.name, label: state.name };
  });

  const allLga =
    arrayState &&
    arrayState
      .map((value) => NaijaStates.lgas(value.value))
      .map((lga) => lga.lgas);

  const allArea =
    rawLga &&
    rawLga !== [] &&
    rawLga
      .map((value) => NaijaStates.areas(value.label))
      .map((lga) => lga.areas);

  const mergedLga =
    allLga &&
    [].concat.apply([], allLga).map((lga) => {
      return { value: lga.name, label: lga.name };
    });

  const mergedArea =
    allArea &&
    [].concat.apply([], allArea).map((area) => {
      return { value: area.name, label: area.name };
    });

  const selectGenders = [
    {
      label: "Select Gender",
      value: "B",
    },
    {
      label: "Male",
      value: "M",
    },
    {
      label: "Female",
      value: "F",
    },
    {
      label: "Both",
      value: "B",
    },
  ];

  const revenueBand = [
    {
      id: 1,
      name: "Choose Audience Monthly Spend",
      value: "",
    },
    {
      id: 2,
      name: "Low",
      value: "BELOW 5K",
    },
    {
      id: 3,
      name: "Medium",
      value: "BTW 5K AND 10K",
    },
    {
      id: 4,
      name: "High",
      value: "ABOVE 10K",
    },
  ];

  const propellerAge = [
    {
      label: "Select Age",
      value: "",
    },
    {
      label: "18-29",
      value: "18-29",
    },
    {
      label: "30-49",
      value: "30-49",
    },
    {
      label: "50+",
      value: "50",
    },
  ];

  const timeSelection = [
    {
      label: "Select time for campaign run",
      value: "",
    },
    // {
    //   label: "Day (5am - 7pm)",
    //   value: "Day",
    // },
    // {
    //   label: "Night (8pm - 4am)",
    //   value: "Night",
    // },
    {
      label: "All day",
      value: "All_Time",
    },
  ];

  const propellerInterest = [
    {
      label: "Select Interest",
      value: "",
    },
    {
      label: "Sports",
      value: "Sports",
    },
    {
      label: "Finance",
      value: "Finance",
    },
    {
      label: "Shopping",
      value: "Shopping",
    },
    {
      label: "iGaming",
      value: "iGaming",
    },
    {
      label: "Giveaways",
      value: "Giveaways",
    },
    {
      label: "Dating",
      value: "Dating",
    },
    {
      label: "Utilities",
      value: "Utilities",
    },
  ];

  const googleInterest = [
    { value: 3, label: "Arts & Entertainment" },
    { value: 47, label: "Autos & Vehicles" },
    { value: 44, label: "Beauty & Fitness" },
    { value: 22, label: "Books & Literature" },
    { value: 12, label: "Business & Industrial" },
    { value: 5, label: "Computers & Electronics" },
    { value: 7, label: "Finance" },
    { value: 71, label: "Food & Drink" },
    { value: 8, label: "Games" },
    { value: 45, label: "Health" },
    { value: 65, label: "Hobbies & Leisure" },
    { value: 11, label: "Home & Garden" },
    { value: 13, label: "Internet & Telecom" },
    { value: 958, label: "Jobs & Education" },
    { value: 19, label: "Law & Government" },
    { value: 16, label: "News" },
    { value: 299, label: "Online Communities" },
    { value: 14, label: "People & Society" },
    { value: 66, label: "Pets & Animals" },
    { value: 29, label: "Real Estate" },
    { value: 533, label: "Reference" },
    { value: 174, label: "Science" },
    { value: 18, label: "Shopping" },
    { value: 20, label: "Sports" },
    { value: 67, label: "Travel & Transportation" },
    { value: 5000, label: "World Localities" },
  ];

  const Continue = (e) => {
    e.preventDefault();
    // if (
    //   values.channel !== "display_ads" &&
    //   values.targetAudienceOption === "mysogidb" &&
    //   filterOptions.ageRange === ""
    // ) {
    //   toast.error("Set a Valid Age Range");
    // } else if (
    //   values.channel !== "display_ads" &&
    //   values.targetAudienceOption === "mysogidb" &&
    //   filterOptions.gender === ""
    // ) {
    //   toast.error("Set Gender");
    // } else if (
    //   (values.targetAudienceOption === "mysogidb" ||
    //     values.channel === "display_ads") &&
    //   (filterOptions.state === "" || filterOptions.state === undefined)
    // ) {
    //   toast.error("Choose a State");
    // } else if (
    //   (values.targetAudienceOption === "mysogidb" ||
    //     values.channel === "display_ads") &&
    //   (filterOptions.lga === "" || filterOptions.lga === undefined)
    // ) {
    //   toast.error("Choose an LGA");
    // } else
    if (
      values.channel !== "display_ads" &&
      values.targetAudienceOption === "manual_import" &&
      personalUpload.length < 1
    ) {
      toast.error("Upload Audience Base");
    } else if (
      values.channel !== "display_ads" &&
      values.targetAudienceOption === "manual" &&
      values.targetAudience.length < 2 &&
      values.targetAudience.includes("")
    ) {
      toast.error("Audience Cannot be Empty");
    } else if (values.channel === "display_ads" && values.scheduleFrom === "") {
      toast.error("Set duration start date");
    } else if (values.channel === "display_ads" && values.scheduleTo === "") {
      toast.error("Set duration end date");
    } else if (values.channel === "display_ads" && values.budget === "") {
      toast.error("Set a Budget");
    } else if (values.channel === "display_ads" && values.budget < 20000) {
      toast.error("insufficient Budget");
    } else if (
      values.targetAudienceOption === "mysogidb" &&
      values.channel !== "display_ads"
      // &&
      // filterOptions.gender !== "" &&
      // (filterOptions.state !== "" || filterOptions.state !== undefined) &&
      // (filterOptions.lga !== "" || filterOptions.lga !== undefined)
    ) {
      dispatch(getFilteredContactList(filterOptions));
      nextStep();
    } else {
      nextStep();
    }
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  ////
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [uploadFileType, setUploadFileType] = useState("");
  const [csvName, setCsvName] = useState();

  const parseFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setParsedCsvData(results.data);
        setUploadFileType("csv");
        setCsvName(file.name);
      },
    });
  };

  const showFile = (files) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const result = text.trim().split(",").join("").trim().split(/\s+/);
      // const result = text.trim().split(/\r?\n/);
      setParsedCsvData(result);
      setCsvName(files[0].name);
      setUploadFileType("txt");
    };
    reader.readAsText(files[0]);
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length && acceptedFiles[0].type === "text/csv") {
      parseFile(acceptedFiles[0]);
    } else {
      showFile(acceptedFiles);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: ".csv, application/vnd.ms-excel, text/csv, text/plain,",
    skipEmptyLines: "greedy",
  });

  // const setCsvAsset = () => {
  //   fetch("#")
  //     .then((res) => res.blob())
  //     .then((blob) => saveAs(blob, "fileName"));
  // };

  const previewUploadedNumbers = values.targetAudience.slice(
    0,
    values.targetAudience.length
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    getCsvRawData(parsedCsvData, uploadFileType);
  }, [dispatch, error, parsedCsvData, uploadFileType]);

  // console.log(values);

  return (
    <Fragment>
      <MetaData title={"Target Audience"} />
      <div className="content-body">
        <div className="container pd-x-0">
          <div className="card card-body rounded bd-0 shadow-sm pd-lg-x-50 pd-lg-y-30">
            <div className="d-flex justify-content-between">
              <p className="tx-18 mb-0">100%</p>
              <p className="tx-18 mb-0">3 out of 3</p>
            </div>
            <div className="progress">
              <div
                className="progress-bar bg-primary progress-bar-striped progress-bar-animated wd-100p"
                role="progressbar"
                aria-valuenow={40}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="pd-md-y-20">
              <div>
                <form>
                  {values.channel === "display_ads" ? (
                    <div>
                      <p className="tx-22 tx-com tx-bold mb-1">
                        Select Campaign Budget
                      </p>
                      <p className="tx-14 tx-blac">
                        Minimum amount to spend is ₦20,000
                      </p>
                      <div className="row justify-content-md-between">
                        <div className="form-group col-md-6">
                          <label
                            // htmlFor
                            className="mb-1 tx-com d-flex align-items-center"
                          >
                            State
                            <i className="tx-6 fa fa-star tx-primary mg-l-2" />
                          </label>
                          <Select
                            defaultValue={arrayState}
                            onChange={handleStateChange}
                            options={options}
                            isMulti
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            // htmlFor
                            className="mb-1 tx-com d-flex align-items-center"
                          >
                            LGA
                            {/* <i className="tx-6 fa fa-star tx-primary mg-l-2" /> */}
                          </label>
                          <Select
                            defaultValue={rawLga}
                            onChange={handleLgaChange}
                            options={mergedLga}
                            isMulti
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label className="mb-1 tx-com d-flex align-items-center">
                            Area
                            {/* <i className="tx-6 fa fa-star tx-primary mg-l-2" /> */}
                          </label>
                          <Select
                            defaultValue={rawArea}
                            onChange={handleAreaChange}
                            options={mergedArea}
                            isMulti
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            // htmlFor
                            className="mb-1 tx-com d-flex align-items-center"
                          >
                            Gender
                          </label>
                          <select
                            className="form-control"
                            defaultValue={values.gender}
                            onChange={handleChange("gender")}
                          >
                            {selectGenders.map((selectGender, i) => (
                              <option value={selectGender.value} key={i}>
                                {selectGender.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            // htmlFor
                            className="mb-1 tx-com d-flex align-items-center"
                          >
                            Age
                          </label>
                          <div className="form-row">
                            <div className="form-group col-md-6 mg-b-0">
                              <div className="input-group mg-b-10">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">From</span>
                                </div>
                                <input
                                  type="number"
                                  id="age-from"
                                  min="18"
                                  max="50"
                                  className="form-control"
                                  aria-describedby="basic-addon1"
                                  defaultValue={ageRangeFrom}
                                  onChange={handleChange("ageRangeFrom")}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-6 mg-b-0">
                              <div className="input-group mg-b-10">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">To</span>
                                </div>
                                <input
                                  type="number"
                                  id="age-to"
                                  min="18"
                                  max="50"
                                  className="form-control"
                                  aria-describedby="basic-addon1"
                                  defaultValue={ageRangeTo}
                                  onChange={handleChange("ageRangeTo")}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <label className="mb-1 tx-com d-flex align-items-center">
                            Interest
                          </label>
                          <Select
                            defaultValue={arrayInterest}
                            onChange={handleInterestChange}
                            options={googleInterest}
                            isMulti
                          />
                        </div>
                        <div className="form-group col-md-12">
                          <label
                            // htmlFor
                            className="mb-1 tx-com d-flex align-items-center"
                          >
                            Campaign schedule
                          </label>
                          <select
                            className="form-control"
                            defaultValue={values.campaignSchedule}
                            onChange={handleChange("campaignSchedule")}
                          >
                            {timeSelection.map((time, i) => (
                              <option value={time.value} key={i}>
                                {time.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-6">
                          <label className="mb-1">
                            Duration
                            <i className="tx-6 fa fa-star tx-primary mg-l-2" />
                          </label>
                          <div className="input-group mg-b-0">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Start</span>
                            </div>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="scheduleFrom"
                              aria-label="scheduleFrom"
                              aria-describedby="basic-addon1"
                              defaultValue={values.scheduleFrom}
                              onChange={handleChange("scheduleFrom")}
                              min={date.toISOString().split("T")[0]}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <label />
                          <div className="input-group mg-b-10 mg-t-5">
                            <div className="input-group-prepend">
                              <span className="input-group-text">End</span>
                            </div>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="scheduleTo"
                              aria-label="scheduleTo"
                              aria-describedby="basic-addon1"
                              defaultValue={values.scheduleTo}
                              onChange={handleChange("scheduleTo")}
                              min={
                                values.scheduleFrom !== ""
                                  ? new Date(
                                      new Date(values.scheduleFrom).setDate(
                                        new Date(
                                          values.scheduleFrom
                                        ).getDate() + 1
                                      )
                                    )
                                      .toISOString()
                                      .split("T")[0]
                                  : date.toISOString().split("T")[0]
                              }
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            htmlFor="budget"
                            className="mb-1 tx-com d-flex align-items-center"
                          >
                            Budget
                            <i className="tx-6 fa fa-star tx-primary mg-l-2" />
                          </label>
                          <input
                            type="text"
                            name="budget"
                            className="form-control"
                            placeholder="Enter Amount to Spend"
                            defaultValue={values.budget}
                            onChange={handleChange("budget")}
                          />
                          {values.budget < 10000 && (
                            <p className="text-danger p-0 m-0 mt-2">
                              insufficient budget
                            </p>
                          )}
                        </div>
                        {values.budget >= 20000 && (
                          <div className="form-group col-md-6 mb-0 align-items-center d-flex">
                            <div>
                              <span>
                                {Math.ceil((values.budget * 1000) / 720)}
                              </span>
                              {" - "}
                              <span>
                                {Math.ceil((values.budget * 1000) / 720) * 1.5}{" "}
                                Estimated Reach{" "}
                                <i className="tx-15 fa fa-users" />
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="row justify-content-md-between">
                        <div className="col-md-6 p-0">
                          <p className="tx-22 tx-com tx-bold mb-1">
                            Select Target Audience
                          </p>
                          <p className="tx-14 tx-blac">
                            Let’s narrow down your target audience to help boost
                            sales
                          </p>
                          <div className="form-group">
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="db"
                                name="customRadio"
                                className="custom-control-input"
                                checked={
                                  values.targetAudienceOption === "mysogidb"
                                }
                                value={"mysogidb"}
                                onChange={handleChange("targetAudienceOption")}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="db"
                              >
                                Use Mysogi Database
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="import"
                                name="customRadio"
                                className="custom-control-input"
                                checked={
                                  values.targetAudienceOption ===
                                  "manual_import"
                                }
                                value={"manual_import"}
                                onChange={handleChange("targetAudienceOption")}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="import"
                              >
                                Import My Own Database
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="manual"
                                name="customRadio"
                                className="custom-control-input"
                                checked={
                                  values.targetAudienceOption === "manual"
                                }
                                defaultValue={"manual"}
                                onChange={handleChange("targetAudienceOption")}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="manual"
                              >
                                Enter Contacts Manually
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          {values.targetAudienceOption === "mysogidb" && (
                            <div className="mg-b-20 mg-md-b-10">
                              <p className="tx-18 tx-com tx-semibold mb-0">
                                Audience
                              </p>
                              <div className="form-group mg-t-15">
                                <label className="tx-14 tx-gray mb-0 tx-medium">
                                  Potential Audience Based on filter
                                </label>
                                <p className="tx-18 tx-com tx-bold mb-1 mg-t-15">
                                  {filteredContactList && !fcLoading ? (
                                    <NumberFormat
                                      value={parseInt(
                                        filteredContactList.count
                                      )}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                    />
                                  ) : (
                                    "loading"
                                  )}{" "}
                                  <span className="tx-14">Audience</span>
                                </p>
                              </div>
                              <div className="form-row mg-t-15">
                                {/* <div className="form-group col-md-4">
                                <input
                                  type="number"
                                  onChange={handleChange("limit")}
                                  value={values.limit}
                                  className="form-control"
                                  placeholder="Enter your target audience number to get price"
                                />
                              </div> */}
                                {/* <div className="form-group">
                                <NumberFormat
                                  className="badge badge-pink  tx-18 mg-5 tx-amt w-100 mt-0"
                                  value={parseInt(setPrice())}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                />
                              </div> */}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {values.targetAudienceOption === "mysogidb" && (
                        <div id="show_1">
                          <div className="row justify-content-md-between">
                            <div className="form-group col-md-6">
                              <label
                                // htmlFor
                                className="mb-1 tx-com d-flex align-items-center"
                              >
                                Age Group
                              </label>
                              <div className="form-row">
                                <div className="form-group col-md-6 mg-b-0">
                                  <div className="input-group mg-b-10">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        From
                                      </span>
                                    </div>
                                    <input
                                      type="number"
                                      id="age-from"
                                      min="18"
                                      max="50"
                                      className="form-control"
                                      aria-describedby="basic-addon1"
                                      defaultValue={ageRangeFrom}
                                      onChange={handleChange("ageRangeFrom")}
                                    />
                                  </div>
                                </div>
                                <div className="form-group col-md-6 mg-b-0">
                                  <div className="input-group mg-b-10">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        To
                                      </span>
                                    </div>
                                    <input
                                      type="number"
                                      id="age-to"
                                      min="18"
                                      max="50"
                                      className="form-control"
                                      aria-describedby="basic-addon1"
                                      defaultValue={ageRangeTo}
                                      onChange={handleChange("ageRangeTo")}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                // htmlFor
                                className="mb-1 tx-com d-flex align-items-center"
                              >
                                Gender
                              </label>
                              <select
                                className="form-control"
                                defaultValue={filterOptions.gender}
                                onChange={handleChange("gender")}
                              >
                                {selectGenders.map((selectGender, i) => (
                                  <option value={selectGender.value} key={i}>
                                    {selectGender.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                // htmlFor
                                className="mb-1 tx-com d-flex align-items-center"
                              >
                                State
                                {/* <i className="tx-6 fa fa-star tx-primary mg-l-2" /> */}
                              </label>
                              <Select
                                defaultValue={arrayState}
                                onChange={handleStateChange}
                                options={options}
                                isMulti
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                // htmlFor
                                className="mb-1 tx-com d-flex align-items-center"
                              >
                                LGA
                                {/* <i className="tx-6 fa fa-star tx-primary mg-l-2" /> */}
                              </label>
                              <Select
                                defaultValue={rawLga}
                                onChange={handleLgaChange}
                                options={mergedLga}
                                isMulti
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="mb-1 tx-com d-flex align-items-center">
                                Area
                                {/* <i className="tx-6 fa fa-star tx-primary mg-l-2" /> */}
                              </label>
                              <Select
                                defaultValue={rawArea}
                                onChange={handleAreaChange}
                                options={mergedArea}
                                isMulti
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="mb-1 tx-com">
                                Monthly Spend
                              </label>
                              <select
                                className="form-control"
                                defaultValue={filterOptions.revenueBand}
                                onChange={handleChange("revenueBand")}
                              >
                                {revenueBand.map((band, i) => (
                                  <option value={band.value} key={i}>
                                    {band.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                      {values.targetAudienceOption === "manual_import" && (
                        <div className="hide" id="show_2">
                          <div className="row justify-content-md-between">
                            <div className="form-group col-sm-12 col-md-5 d-flex flex-column">
                              <label className="mb-1 tx-com">
                                Upload CSV/Text File Containing Phone Numbers
                              </label>
                              <button
                                className="btn tx-primary pd-x-0 pd-t-0 justify-content-start"
                                // onClick={setCsvAsset}
                              >
                                <div className="d-flex pd-t-3">
                                  <div>
                                    <i className="fa fa-download tx-primary mg-r-5" />
                                    <CSVLink
                                      filename={"mysogi-number-format"}
                                      data={csvData}
                                    >
                                      Download CSV Sample
                                    </CSVLink>
                                  </div>
                                </div>
                              </button>
                              <div className="form-group">
                                <div
                                  {...getRootProps({
                                    className: `dropzone w-100 tx-center
                                  ${isDragAccept && "dropzoneAccept"} 
                                  ${isDragReject && "dropzoneReject"}`,
                                  })}
                                >
                                  <input {...getInputProps()} />
                                  {isDragActive ? (
                                    <p>Drop the files here ...</p>
                                  ) : (
                                    <p>
                                      Drag 'n' drop some files here, or click to
                                      select files
                                    </p>
                                  )}
                                </div>
                                <p className="mb-0">{csvName}</p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              {values.targetAudience.length > 0 && (
                                <>
                                  <p className="tx-18 tx-com tx-semibold mb-0">
                                    Preview Phone Numbers
                                  </p>
                                  <textarea
                                    name="previewUploadedNumbers"
                                    className="form-control mb-0"
                                    defaultValue={previewUploadedNumbers.concat()}
                                    disabled
                                    // resize={false}
                                    rows={10}
                                    placeholder="Preview uploaded numbers"
                                  />
                                  <p className="mb-10">
                                    {values.targetAudience.length} numbers
                                    loaded
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {values.targetAudienceOption === "manual" && (
                        <div className="hide" id="show_3">
                          <div className="row justify-content-md-between">
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Enter msisdns separated by commas e.g.
                                23480xxxxxxxx,23480xxxxxxxx
                              </label>
                              <textarea
                                name="numbers"
                                className="form-control"
                                rows={4}
                                onChange={handleChange("numbers")}
                                placeholder="23480xxxxxxxx,23480xxxxxxxx"
                                defaultValue={numbers}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </form>
                <div className="col-md-5 pd-x-0 mg-y-30">
                  <div className="d-flex">
                    <button
                      className="btn btn-primary w-100 "
                      onClick={Continue}
                      type="submit"
                      variant="contained"
                      disabled={values.budget < 20000 ? true : false}
                    >
                      Next
                    </button>
                    <button
                      className="btn btn-outline-primary w-100 mg-l-20"
                      onClick={Previous}
                      type="submit"
                      variant="contained"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TargetAudience;
