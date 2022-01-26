import React, { Fragment, useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../layout/MetaData";
import { useAlert } from "react-alert";
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from "react-papaparse";
import NaijaStates from "naija-state-local-government";

import {
  getFilteredContactList,
  clearErrors,
} from "../../../../actions/campaignActions";

const TargetAudience = ({
  prevStep,
  nextStep,
  handleChange,
  handleManualImport,
  numbers,
  filterOptions,
  values,
  getCsvArray,

  handleOpenDialog,
  handleOnFileLoad,
  handleOnError,
  handleOnRemoveFile,
  handleRemoveFile,
  getButtonRef,
}) => {
  const GREY = "#CCC";
  const GREY_LIGHT = "rgba(255, 255, 255, 0.4)";
  const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
  const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
    DEFAULT_REMOVE_HOVER_COLOR,
    40
  );
  const GREY_DIM = "#686868";

  const styles = {
    zone: {
      alignItems: "center",
      border: `2px dashed ${GREY}`,
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "center",
      padding: 20,
    },
    file: {
      background: "linear-gradient(to bottom, #EEE, #DDD)",
      borderRadius: 20,
      display: "flex",
      height: 120,
      width: 120,
      position: "relative",
      zIndex: 10,
      flexDirection: "column",
      justifyContent: "center",
    },
    info: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      paddingLeft: 10,
      paddingRight: 10,
    },
    size: {
      backgroundColor: GREY_LIGHT,
      borderRadius: 3,
      marginBottom: "0.5em",
      justifyContent: "center",
      display: "flex",
    },
    name: {
      backgroundColor: GREY_LIGHT,
      borderRadius: 3,
      fontSize: 12,
      marginBottom: "0.5em",
    },
    progressBar: {
      bottom: 14,
      position: "absolute",
      width: "100%",
      paddingLeft: 10,
      paddingRight: 10,
    },
    zoneHover: {
      borderColor: GREY_DIM,
    },
    default: {
      borderColor: GREY,
    },
    remove: {
      height: 23,
      position: "absolute",
      right: 6,
      top: 6,
      width: 23,
    },
  };

  const ref = useRef();
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [csvData, setCsvData] = useState({});
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  // const { CSVReader } = useCSVReader();

  const { filteredContactList, error, loading } = useSelector(
    (state) => state.filteredContactList || []
  );

  const [status, setStatus] = useState(3);
  const radioHandler = (status) => {
    setStatus(status);
  };

  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);

  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });

    setCsvArray(newArray);
  };

  const submit = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      console.log(text);
      processCSV(text);
    };

    getCsvArray(csvArray);

    reader.readAsText(file);
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

  // const handleOnDrop = (data) => {
  //   console.log("---------------------------");
  //   console.log(data);
  //   console.log("---------------------------");
  // };

  // const handleOnError = (err, file, inputElem, reason) => {
  //   console.log(err);
  // };

  // const handleOnRemoveFile = (data) => {
  //   console.log("---------------------------");
  //   console.log(data);
  //   console.log("---------------------------");
  // };

  const Continue = (e) => {
    e.preventDefault();
    if (values.targetAudienceOption === "mysogidb") {
      dispatch(getFilteredContactList(filterOptions));
      nextStep();
      csvFile && submit();
    } else {
      nextStep();
    }
  };
  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // console.log(csvArray);
    console.log(csvData);
  }, [dispatch, error, alert]);

  const lga = NaijaStates.lgas(filterOptions.state);

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
                          Import my own database
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
                            <label htmlFor className="mb-1 tx-com">
                              Age Group *
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
                            <label htmlFor className="mb-1 tx-com">
                              Gender *
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
                            <label htmlFor className="mb-1 tx-com">
                              State *
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
                            <label htmlFor className="mb-1 tx-com">
                              LGA *
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
                          <div className="mg-t-20">
                            <p className="tx-24 tx-bold mb-1 tx-com">
                              Upload CSV Containing Phone NUmbers
                            </p>
                            <div className="form-group">
                              <CSVReader
                                ref={getButtonRef}
                                onFileLoad={handleOnFileLoad}
                                onError={handleOnError}
                                noClick
                                noDrag
                                onRemoveFile={handleOnRemoveFile}
                              >
                                {({ file }) => (
                                  <aside
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      marginBottom: 10,
                                    }}
                                  >
                                    <button
                                      type="button"
                                      onClick={handleOpenDialog}
                                      style={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        width: "40%",
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                      }}
                                    >
                                      Browe file
                                    </button>
                                    <div
                                      style={{
                                        borderWidth: 1,
                                        borderStyle: "solid",
                                        borderColor: "#ccc",
                                        height: 45,
                                        lineHeight: 2.5,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        paddingLeft: 13,
                                        paddingTop: 3,
                                        width: "60%",
                                      }}
                                    >
                                      {file && file.name}
                                    </div>
                                    <button
                                      style={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                      }}
                                      onClick={handleRemoveFile}
                                    >
                                      Remove
                                    </button>
                                  </aside>
                                )}
                              </CSVReader>
                              {/* <CSVReader
                                onUploadAccepted={(results) => {
                                  console.log("---------------------------");
                                  console.log(results);
                                  console.log("---------------------------");
                                  setZoneHover(false);
                                }}
                                onDragOver={(event) => {
                                  event.preventDefault();
                                  setZoneHover(true);
                                }}
                                onDragLeave={(event) => {
                                  event.preventDefault();
                                  setZoneHover(false);
                                }}
                              >
                                {({
                                  getRootProps,
                                  acceptedFile,
                                  ProgressBar,
                                  getRemoveFileProps,
                                  Remove,
                                }) => (
                                  <>
                                    <div
                                      {...getRootProps()}
                                      style={Object.assign(
                                        {},
                                        styles.zone,
                                        zoneHover && styles.zoneHover
                                      )}
                                    >
                                      {acceptedFile ? (
                                        <>
                                          <div style={styles.file}>
                                            <div style={styles.info}>
                                              <span style={styles.size}>
                                                {formatFileSize(
                                                  acceptedFile.size
                                                )}
                                              </span>
                                              <span style={styles.name}>
                                                {acceptedFile.name}
                                              </span>
                                            </div>
                                            <div style={styles.progressBar}>
                                              <ProgressBar />
                                            </div>
                                            <div
                                              {...getRemoveFileProps()}
                                              style={styles.remove}
                                              onMouseOver={(event) => {
                                                event.preventDefault();
                                                setRemoveHoverColor(
                                                  REMOVE_HOVER_COLOR_LIGHT
                                                );
                                              }}
                                              onMouseOut={(event) => {
                                                event.preventDefault();
                                                setRemoveHoverColor(
                                                  DEFAULT_REMOVE_HOVER_COLOR
                                                );
                                              }}
                                            >
                                              <Remove
                                                color={removeHoverColor}
                                              />
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        "Drop CSV file here or click to upload"
                                      )}
                                    </div>
                                  </>
                                )}
                              </CSVReader> */}

                              {/* <input
                                  type="file"
                                  accept=".csv"
                                  id="csvFile"
                                  className="custom-file-input"
                                  id="customFile"
                                  onChange={(e) => {
                                    setCsvFile(e.target.files[0]);
                                  }}
                                /> */}
                              {/* <label
                                  className="custom-file-label"
                                  htmlFor="customFile"
                                >
                                  Click to upload desired icon (if needed)
                                </label>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (csvFile) submit();
                                  }}
                                ></button> */}
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
                              id="numbers"
                              rows={4}
                              onChange={handleChange("numbers")}
                              placeholder="Enter Number"
                              defaultValue={numbers}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
                <div className="col-md-5 pd-x-0 mg-y-40">
                  <div className="d-flex">
                    <button
                      className="btn btn-primary w-100 "
                      onClick={Continue}
                      type="submit"
                      variant="contained"
                      // disabled={
                      //   numbers === "" ||
                      //   filterOptions.gender === "" ||
                      //   !csvFile
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
