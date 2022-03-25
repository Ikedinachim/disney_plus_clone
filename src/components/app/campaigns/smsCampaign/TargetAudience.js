import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select from "react-select";
import { CSVLink } from "react-csv";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import NaijaStates from "naija-state-local-government";
import NumberFormat from "react-number-format";

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
  audience,
  arrayLga,
  ageRangeFrom,
  ageRangeTo,
}) => {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.filteredContactList || []);

  const filter2 = useMemo((filterOptions) => {
    if (filterOptions) {
      return filterOptions;
    }
  }, []);

  const filter = useCallback(
    (filterOptions) => {
      filterOptions();
      dispatch(getFilteredContactList(filterOptions));
    },
    [filterOptions]
  );

  useEffect(() => {
    console.log(filterOptions);
    dispatch(getFilteredContactList(filterOptions));
  }, [dispatch, filterOptions, values]);

  const [selectedState, setSelectedState] = useState(null);
  const [selectedLga, setSelectedLga] = useState(null);
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [csvName, setCsvName] = useState();
  const { filteredContactList, fcLoading } = useSelector(
    (state) => state.filteredContactList || []
  );

  const csvData = [
    ["Numbers"],
    ["234890xxxxxxxx"],
    ["234890xxxxxxxx"],
    ["234890xxxxxxxx"],
  ];

  const options = NaijaStates.states().map((state) => {
    return { value: state, label: state };
  });

  const allLga =
    arrayState &&
    arrayState
      .map((value) => NaijaStates.lgas(value.value))
      .map((lga) => lga.lgas);

  const mergedLga =
    allLga &&
    [].concat.apply([], allLga).map((lga) => {
      return { value: lga, label: lga };
    });

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

  const setPrice = () => {
    if (values.targetAudienceOption !== "mysogidb") {
      return parseInt(values.price);
    } else if (values.limit !== "") {
      return parseInt(values.limit) * 5;
    } else {
      return filteredContactList ? filteredContactList.count * 5 : 0;
    }
  };

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

  // const validateNumber = (inputtxt) => {
  //   var phoneno = /^\d{13}(,\d{13})*$/;
  //   if (inputtxt.value.match(phoneno)) {
  //     return true;
  //   } else {
  //     alert("message");
  //     return false;
  //   }
  // };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    getCsvRawData(parsedCsvData);
  }, [dispatch, error, parsedCsvData]);

  const stateOnChange = (e) => {
    handleStateChange(e);
    // function runMeFirst(callback) {
    //   handleStateChange(e);
    //   console.log(typeof callback);
    //   if (typeof callback == "function") callback();
    // }

    // function anotherFunc() {
    //   console.log(filter);
    //   dispatch(getFilteredContactList(filterOptions));
    // }
    // runMeFirst(anotherFunc);
    // handleStateChange(e);
    // console.log(
    //   "🚀 ~ file: TargetAudience.js ~ line 173 ~ returnnewPromise ~ values.filterParameters",
    //   values
    // );
    // setTimeout(() => {
    //   dispatch(getFilteredContactList(filterOptions));
    // }, 2000);
    // dispatch(getFilteredContactList(filterOptions));
    // function first() {
    //   return new Promise((resolve) => {
    //     handleStateChange(e);
    //     console.log(
    //       "🚀 ~ file: TargetAudience.js ~ line 173 ~ returnnewPromise ~ values.filterParameters",
    //       values
    //     );
    //     resolve();
    //   });
    // }

    // function second() {
    //   return new Promise((resolve) => {
    //     dispatch(getFilteredContactList(filter));
    //     resolve();
    //   });
    // }

    // first().then(second());
  };

  const lgaOnChange = async (e) => {
    function first() {
      return new Promise((resolve) => {
        handleLgaChange(e);
        resolve();
      });
    }

    function second() {
      return new Promise((resolve) => {
        // filter;
        resolve(dispatch(getFilteredContactList(filterOptions)));
      });
    }

    first().then(second());
  };

  // console.log(values);

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
                              // onClick={(e) => radioHandler(1)}
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
                                {filteredContactList
                                  ? filteredContactList.count
                                  : "loading"}{" "}
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
                        {/* {values.targetAudienceOption !== "mysogidb" && (
                          <div className="mg-b-20 mg-md-b-10">
                            <p className="tx-18 tx-com tx-semibold mb-0">
                              Pricing
                            </p>
                            <div className="form-group mg-t-15">
                              <label className="tx-14 tx-gray mb-1 tx-medium">
                                Potential Audience Based on Manual Input
                              </label>
                              <p className="tx-18 tx-com tx-bold mb-0">
                                {audience}{" "}
                                <span className="tx-14 tx-gray tx-medium">
                                  number(s) loaded
                                </span>
                              </p>
                            </div>
                            <div className="form-row mg-t-15 pd-x-0">
                              <div className=" col-md-2 d-flex align-items-center">
                                <p className="tx-18 tx-com tx-bold mb-0">
                                  Amount:
                                </p>{" "}
                                <NumberFormat
                                  className="badge tx-green tx-bold tx-18 tx-amt w-100 mt-0"
                                  value={parseInt(setPrice())}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                />
                              </div>
                            </div>
                          </div>
                        )} */}
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
                              onChange={stateOnChange}
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
                              onChange={lgaOnChange}
                              options={mergedLga}
                              isMulti
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label className="mb-1 tx-com">Money Spent</label>
                            <select id="band" className="form-control">
                              <option value />
                              <option value="m">0-1000</option>
                              <option value="f">1001-5000</option>
                              <option value="b">5001-10000</option>
                            </select>
                          </div>
                          <div className="form-group col-md-6">
                            <label className="mb-1 tx-com">Interest</label>
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
                          {/* <div className="form-group col-md-6">
                            <label className="mb-1 tx-com">Device Brand</label>
                            <select className="custom-select">
                              <option selected>Select Device Brand</option>
                              <option value={1}>Nokia</option>
                              <option value={2}>Iphone</option>
                            </select>
                          </div> */}
                        </div>
                      </div>
                    )}
                    {values.targetAudienceOption === "manual_import" && (
                      <div className="hide" id="show_2">
                        <div className="row justify-content-md-between">
                          <div className="form-group col-sm-12 col-md-5 d-flex flex-column">
                            <label className="mb-1 tx-com">
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
                            <label className="mb-1 tx-com">
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
