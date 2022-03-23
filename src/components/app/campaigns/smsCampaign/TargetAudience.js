import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NaijaStates from "naija-state-local-government";
import { CSVLink } from "react-csv";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import Select from "react-select";

import MetaData from "../../../layout/MetaData";
import {
  getFilteredContactList,
  clearErrors,
} from "../../../../actions/campaignActions";

const TargetAudience = ({
  prevStep,
  nextStep,
  handleChange,
  handleStateChange,
  handleLgaChange,
  phoneNumber,
  filterOptions,
  values,
  getCsvRawData,
  arrayState,
  arrayLga,
  ageRangeFrom,
  ageRangeTo,
}) => {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.filteredContactList || []);

  const [selectedState, setSelectedState] = useState(null);
  const [selectedLga, setSelectedLga] = useState(null);
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [csvName, setCsvName] = useState();

  const csvData = [
    ["Numbers"],
    ["234890xxxxxxxx"],
    ["234890xxxxxxxx"],
    ["234890xxxxxxxx"],
  ];

  const options = NaijaStates.states().map((state) => {
    return { value: state, label: state };
  });

  // const optionsValue =
  //   selectedState && selectedState.map((value) => value.value);

  const allLga =
    arrayState &&
    arrayState
      .map((value) => NaijaStates.lgas(value.value))
      .map((lga) => lga.lgas);

  const allLga2 =
    arrayState &&
    arrayState.map((value) => {
      return { state: value.value, lga: NaijaStates.lgas(value.value).lgas };
    });

  const mergedLga =
    allLga &&
    [].concat.apply([], allLga).map((lga) => {
      return { value: lga, label: lga };
    });

  // const mergedLga2 =
  //   allLga &&
  //   [].concat.apply([], allLga2).map((lga) => {
  //     return { value: lga, label: lga };
  //   });

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

  ////

  const parseFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        // console.log(file);
        setParsedCsvData(results.data);
        setCsvName(file.name);
      },
    });
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

  const validateNumber = (inputtxt) => {
    var phoneno = /^\d{13}(,\d{13})*$/;
    if (inputtxt.value.match(phoneno)) {
      return true;
    } else {
      alert("message");
      return false;
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    getCsvRawData(parsedCsvData);
  }, [dispatch, error, parsedCsvData]);

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
                  <div>
                    <p className="tx-22 tx-com tx-bold mb-1">
                      Select Target Audience
                    </p>
                    <p className="tx-14 tx-blac">
                      Let’s narrow down your target audience to help boost sales
                    </p>
                    <div className="form-group">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="db"
                          name="customRadio"
                          className="custom-control-input"
                          checked={values.targetAudienceOption === "mysogidb"}
                          // onClick={(e) => radioHandler(1)}
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
                          checked={
                            values.targetAudienceOption === "manual_import"
                          }
                          // onClick={(e) => radioHandler(2)}
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
                          checked={values.targetAudienceOption === "manual"}
                          // onClick={(e) => radioHandler(3)}
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
                    {values.targetAudienceOption === "mysogidb" && (
                      <div id="show_1">
                        <div className="row justify-content-md-between">
                          <div className="form-group col-md-6">
                            <label
                              // htmlFor
                              className="mb-1 tx-com d-flex align-items-center"
                            >
                              Age Group
                              <i className="tx-6 fa fa-star tx-primary mg-l-2" />
                            </label>
                            {/* <select
                              className="form-control"
                              defaultValue={filterOptions.ageRange}
                              onChange={handleChange("ageRange")}
                            >
                              {selectAgeRanges.map((selectAgeRange, i) => (
                                <option value={selectAgeRange.value} key={i}>
                                  {selectAgeRange.label}
                                </option>
                              ))}
                            </select> */}
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
                                    placeholder="18"
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
                                    placeholder="50"
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
                              Gender
                              <i className="tx-6 fa fa-star tx-primary mg-l-2" />
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
                              <i className="tx-6 fa fa-star tx-primary mg-l-2" />
                            </label>
                            <Select
                              defaultValue={selectedState}
                              onChange={handleStateChange}
                              options={options}
                              isMulti
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label className="mb-1 tx-com d-flex align-items-center">
                              LGA
                              <i className="tx-6 fa fa-star tx-primary mg-l-2" />
                            </label>
                            <Select
                              defaultValue={selectedLga}
                              onChange={handleLgaChange}
                              options={mergedLga}
                              isMulti
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label className="mb-1 tx-com">ARPU Band</label>
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
                            <label className="mb-1 tx-com">Device Type</label>
                            <select className="custom-select">
                              <option selected>
                                Select the kind of device
                              </option>
                              <option value={1}>Android</option>
                              <option value={2}>IOS</option>
                            </select>
                          </div>
                          <div className="form-group col-md-6">
                            <label className="mb-1 tx-com">Device Brand</label>
                            <select className="custom-select">
                              <option selected>Select Device Brand</option>
                              <option value={1}>Nokia</option>
                              <option value={2}>Iphone</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    {values.targetAudienceOption === "manual_import" && (
                      <div className="hide" id="show_2">
                        <div className="row justify-content-md-between">
                          <div className="form-group col-sm-12 col-md-5 d-flex flex-column">
                            <label htmlFor className="mb-1 tx-com">
                              Upload CSV Containing Phone Numbers
                            </label>
                            <button className="btn tx-primary pd-x-0 pd-t-0 justify-content-start">
                              <div className="d-flex pd-t-3">
                                <div>
                                  <i className="fa fa-download tx-primary mg-r-5" />
                                  <CSVLink
                                    filename={"mysogi-number-format"}
                                    data={csvData}
                                  >
                                    Download Sample
                                  </CSVLink>
                                </div>
                                {/* <p className="mb-0 pointer">Download Sample</p> */}
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
                              name="phoneNumber"
                              className="form-control"
                              id="phoneNumber"
                              rows={4}
                              onBlur={handleChange("phoneNumber")}
                              placeholder="23480xxxxxxxx,23480xxxxxxxx"
                              defaultValue={phoneNumber}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
                <div className="col-md-5 pd-x-0 mg-y-30">
                  <div className="d-flex">
                    <button
                      className="btn btn-primary w-100 "
                      onClick={Continue}
                      type="submit"
                      variant="contained"
                      // disabled={phoneNumber === "" ? true : false}
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
