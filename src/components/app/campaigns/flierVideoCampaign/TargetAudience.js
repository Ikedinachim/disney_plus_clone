import React, { Fragment, useEffect, useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../layout/MetaData";
import { toast } from "react-toastify";
import NaijaStates from "naija-state-local-government";
// import { saveAs } from "file-saver";

import {
  getFilteredContactList,
  clearErrors,
} from "../../../../actions/campaignActions";

import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { CSVLink } from "react-csv";

const TargetAudience = ({
  prevStep,
  nextStep,
  handleChange,
  handleManualImport,
  numbers,
  filterOptions,
  values,

  getCsvRawData,
}) => {
  // const alert = useAlert();
  const dispatch = useDispatch();

  const { filteredContactList, error, loading } = useSelector(
    (state) => state.filteredContactList || []
  );

  const [status, setStatus] = useState(3);
  const radioHandler = (status) => {
    setStatus(status);
  };

  // const [assetType, setAssetType] = useState("image");
  // const assetTypeHandler = (asset) => {
  //   setStatus(asset);
  // };

  // const [csvFile, setCsvFile] = useState();
  // const [csvArray, setCsvArray] = useState([]);

  // const processCSV = (str, delim = ",") => {
  //   const headers = str.slice(0, str.indexOf("\n")).split(delim);
  //   const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  //   const newArray = rows.map((row) => {
  //     const values = row.split(delim);
  //     const eachObject = headers.reduce((obj, header, i) => {
  //       obj[header] = values[i];
  //       return obj;
  //     }, {});
  //     return eachObject;
  //   });

  //   setCsvArray(newArray);
  // };

  // const submit = () => {
  //   const file = csvFile;
  //   const reader = new FileReader();

  //   reader.onload = function (e) {
  //     const text = e.target.result;
  //     console.log(text);
  //     processCSV(text);
  //   };

  //   getCsvArray(csvArray);

  //   reader.readAsText(file);
  // };

  const csvData = [
    ["Numbers"],
    ["234890xxxxxxxx"],
    ["234890xxxxxxxx"],
    ["234890xxxxxxxx"],
  ];

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
    if (
      values.targetAudienceOption === "mysogidb" &&
      values.channel !== "display_ads"
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

  const lga = NaijaStates.lgas(filterOptions.state);

  ////
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [csvName, setCsvName] = useState();

  const parseFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setParsedCsvData(results.data);
        setCsvName(file.name);
        // console.log(parsedCsvData);
      },
    });
    // console.log(parsedCsvData);
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

  // const setCsvAsset = () => {
  //   fetch("#")
  //     .then((res) => res.blob())
  //     .then((blob) => saveAs(blob, "fileName"));
  // };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // console.log(parsedCsvData);
    getCsvRawData(parsedCsvData);
  }, [dispatch, error, toast, parsedCsvData]);

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
              <div>
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
                            // htmlFor
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
                            {NaijaStates.states().map((selectState, i) => (
                              <option value={selectState} key={i}>
                                {selectState}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            // htmlFor
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
                            {lga.lgas.map((selectLga, i) => (
                              <option value={selectLga} key={i}>
                                {selectLga}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            // htmlFor
                            className="mb-1 tx-com d-flex align-items-center"
                          >
                            Budget
                            <i className="tx-6 fa fa-star tx-primary mg-l-2" />
                          </label>
                          {/* ₦ */}
                          <input
                            type="text"
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
                        {values.budget >= 10000 && (
                          <div className="form-group col-md-6 mb-0 align-items-center d-flex">
                            <div>
                              <span>{values.budget / 5}</span>
                              {" - "}
                              <span>
                                {values.budget / 2} Estimated Reach{" "}
                                <i className="tx-15 fa fa-users" />
                              </span>
                            </div>
                          </div>
                        )}
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
                              <select
                                className="form-control"
                                defaultValue={filterOptions.ageRange}
                                onChange={handleChange("ageRange")}
                              >
                                {selectAgeRanges.map((selectAgeRange, i) => (
                                  <option value={selectAgeRange.value} key={i}>
                                    {selectAgeRange.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                // htmlFor
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
                              <select
                                className="custom-select"
                                defaultValue={filterOptions.state}
                                onChange={handleChange("state")}
                              >
                                {NaijaStates.states().map((selectState, i) => (
                                  <option value={selectState} key={i}>
                                    {selectState}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label
                                // htmlFor
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
                                {lga.lgas.map((selectLga, i) => (
                                  <option value={selectLga} key={i}>
                                    {selectLga}
                                  </option>
                                ))}
                              </select>
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
                            <div className="form-group col-md-6">
                              <label className="mb-1 tx-com">
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
                      {values.targetAudienceOption === "manual_import" && (
                        <div className="hide" id="show_2">
                          <div className="row justify-content-md-between">
                            <div className="form-group col-md-6 d-flex flex-column">
                              <label className="mb-1 tx-com">
                                Upload CSV Containing Phone Numbers
                              </label>
                              <button className="btn tx-primary pd-x-0 pd-t-0">
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
                                  {/* <p className="mb-0 pointer">
                                    Download Sample
                                  </p> */}
                                </div>
                              </button>
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
                                <p className="mb-0">{csvName}</p>
                                {/* <CSVReader
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
                              </CSVReader> */}
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
                      {values.targetAudienceOption === "manual" && (
                        <div className="hide" id="show_3">
                          <div className="row justify-content-md-between">
                            <div className="form-group col-md-6">
                              <label className="mb-1 tx-com">
                                Enter Number (you can separate your contact with
                                comma (,)
                              </label>
                              <textarea
                                // name
                                className="form-control"
                                id="numbers"
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
                      disabled={values.budget < 10000 ? true : false}
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
