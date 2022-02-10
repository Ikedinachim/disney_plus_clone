import React, { Fragment, useEffect, useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import NaijaStates from "naija-state-local-government";
import MetaData from "../../../layout/MetaData";

import {
  getFilteredContactList,
  clearErrors,
} from "../../../../actions/campaignActions";

import { useDropzone } from "react-dropzone";
import Papa from "papaparse";

const TargetAudience = ({
  prevStep,
  nextStep,
  handleChange,
  numbers,
  filterOptions,
  values,
  getCsvRawData,
}) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { filteredContactList, error, loading } = useSelector(
    (state) => state.filteredContactList || []
  );

  const [status, setStatus] = useState(3);
  const radioHandler = (status) => {
    setStatus(status);
  };

  const selectGenders = [
    {
      label: "Select Gender",
      value: "",
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

  const selectAgeRanges = [
    {
      label: "Select Age Group",
      value: "",
    },
    {
      label: "13-24",
      value: "13-24",
    },
    {
      label: "25-34",
      value: "25-34",
    },
    {
      label: "35-44",
      value: "35-44",
    },
  ];

  const Continue = (e) => {
    e.preventDefault();
    if (values.targetAudienceOption === "mysogidb") {
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

  const lga = NaijaStates.lgas(filterOptions.state);

  ////
  const [parsedCsvData, setParsedCsvData] = useState([]);

  const parseFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setParsedCsvData(results.data);
        // console.log(parsedCsvData);
      },
    });
    console.log(parsedCsvData);
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      parseFile(acceptedFiles[0]);
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
    accept: ".csv, application/vnd.ms-excel, text/csv",
    skipEmptyLines: "greedy",
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    console.log(parsedCsvData);
    getCsvRawData(parsedCsvData);
  }, [dispatch, error, alert, parsedCsvData]);

  return (
    <Fragment>
      <MetaData title={"Target Audience"} />
      <div className="content-body">
        <div className="container-fluid">
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
              <div className>
                <form>
                  {values.channel === "display_ads" ? (
                    <div>
                      <p className="tx-22 tx-com tx-bold mb-1">
                        Select Campaign Budget
                      </p>
                      <p className="tx-14 tx-blac">
                        Minimum amount to spend is ₦10,000
                      </p>
                      <div className="row justify-content-md-between">
                        <div className="form-group col-md-6">
                          <label
                            htmlFor
                            className="mb-1 tx-com d-flex align-items-center"
                          >
                            Budget
                            <i className="tx-6 fa fa-star tx-primary mg-l-2" />
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Amount to Spend"
                            defaultValue={values.budget}
                            onBlur={handleChange("budget")}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
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
                            defaultChecked
                            checked={status === 1}
                            onClick={(e) => radioHandler(1)}
                            value={"mysogidb"}
                            onChange={handleChange("targetAudienceOption")}
                          />
                          <label className="custom-control-label" htmlFor="db">
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
                            checked={status === 2}
                            onClick={(e) => radioHandler(2)}
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
                            checked={status === 3}
                            onClick={(e) => radioHandler(3)}
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
                      {status === 1 && (
                        <div id="show_1">
                          <div className="row justify-content-md-between">
                            <div className="form-group col-md-6">
                              <label
                                htmlFor
                                className="mb-1 tx-com d-flex align-items-center"
                              >
                                Age Group
                                <i className="tx-6 fa fa-star tx-primary mg-l-2" />
                              </label>
                              <select
                                className="form-control"
                                defaultValue={filterOptions.ageRange}
                                onChange={handleChange("ageRange")}
                              >
                                {selectAgeRanges.map((selectAgeRange) => (
                                  <option value={selectAgeRange.value}>
                                    {selectAgeRange.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                htmlFor
                                className="mb-1 tx-com d-flex align-items-center"
                              >
                                Gender
                                <i className="tx-6 fa fa-star tx-primary mg-l-2" />
                              </label>
                              <select
                                className="form-control"
                                defaultValue={filterOptions.gender}
                                onChange={handleChange("gender")}
                              >
                                {selectGenders.map((selectGender) => (
                                  <option value={selectGender.value}>
                                    {selectGender.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                htmlFor
                                className="mb-1 tx-com d-flex align-items-center"
                              >
                                State
                                <i className="tx-6 fa fa-star tx-primary mg-l-2" />
                              </label>
                              <select
                                className="custom-select"
                                defaultValue={filterOptions.state}
                                onChange={handleChange("state")}
                              >
                                {NaijaStates.states().map((selectState) => (
                                  <option value={selectState}>
                                    {selectState}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                htmlFor
                                className="mb-1 tx-com d-flex align-items-center"
                              >
                                LGA
                                <i className="tx-6 fa fa-star tx-primary mg-l-2" />
                              </label>
                              <select
                                className="custom-select"
                                defaultValue={filterOptions.lga}
                                onChange={handleChange("lga")}
                              >
                                <option value="">Select L.G.A</option>
                                {lga.lgas.map((selectLga) => (
                                  <option value={selectLga}>{selectLga}</option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                ARPU Band
                              </label>
                              <select id="band" className="form-control">
                                <option value />
                                <option value="m">0-1000</option>
                                <option value="f">1001-5000</option>
                                <option value="b">5001-10000</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Interest
                              </label>
                              <select className="custom-select">
                                <option selected>Select Interest</option>
                                <option value={1}>Music</option>
                                <option value={2}>Comedy</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Device Type
                              </label>
                              <select className="custom-select">
                                <option selected>
                                  Select the kind of device
                                </option>
                                <option value={1}>Android</option>
                                <option value={2}>IOS</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Device Brand
                              </label>
                              <select className="custom-select">
                                <option selected>Select Device Brand</option>
                                <option value={1}>Nokia</option>
                                <option value={2}>Iphone</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                      {status === 2 && (
                        <div className="hide" id="show_2">
                          <div className="row justify-content-md-between">
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Upload CSV Containing Phone Numbers
                              </label>
                              <div className="form-group">
                                <div
                                  {...getRootProps({
                                    className: `dropzone 
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
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {status === 3 && (
                        <div className="hide" id="show_3">
                          <div className="row justify-content-md-between">
                            <div className="form-group col-md-6">
                              <label htmlFor className="mb-1 tx-com">
                                Enter Number (you can separate your contact with
                                comma (,)
                              </label>
                              <textarea
                                name
                                className="form-control"
                                id
                                rows={4}
                                onChange={handleChange("numbers")}
                                placeholder="Enter Number(s) +234080xxxxxxxx, +234080xxxxxxxx"
                                defaultValue={numbers}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </form>
                <div className="col-md-5 pd-x-0 mg-y-40">
                  <div className="d-flex">
                    <button
                      className="btn btn-primary w-100 "
                      onClick={Continue}
                      type="submit"
                      variant="contained"
                      // disabled={
                      //   numbers === "" && filterOptions.gender === ""
                      //     ? true
                      //     : false
                      // }
                    >
                      Filter
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
