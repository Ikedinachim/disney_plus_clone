import React, { Component, useCallback } from "react";
import FlierVideoCampaign from "./FlierVideoCampaign";
import TargetAudience from "./TargetAudience";
import PreviewCampaign from "./PreviewCampaign";
import FundWalletFlierVideo from "./FundWalletFlierVideo";
import { useDropzone } from "react-dropzone";

// const buttonRef = React.createRef();

export default class FlierVideoStepForm extends Component {
  state = {
    step: 1,
    senderId: "",
    channel: "",
    url: "",
    campaignMessage: "",
    targetAge: "21",
    location: ["Lagos"],
    interest: "business",
    phoneNumber: "",
    whatsAppNumber: "",
    numbers: "",
    ussd: "",
    smsNumber: "",
    callToAction: "",
    timeRangeFrom: "",
    timeRangeTo: "",
    campaignImage: "",
    attachment: "",
    attachmentPreview: "",
    targetAudience: "",
    uploadedImage: "",
    campaignType: "flier_video",
    targetAudienceOption: "manual",
    price: 0,
    limit: "",
    // csvFile: "",
    // csvArray: "",

    ageRange: "",
    gender: "",
    state: "abia",
    lga: "",
    deviceType: "LG",
    deviceBrand: "X210ZM",

    parsedCsvData: [],
  };

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  // Handle image change
  onChangeAttachment = (input) => (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        // console.log(reader.result);
        this.setState({ [input]: e.target.files[0] });
      }
      this.setState({ attachmentPreview: reader.result });
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  // setLimit = (input) => (e) => {
  //   this.setState({ [input]: e.target.files[0] });
  // };

  // handleManualImport = (input) => (e) => {

  // };

  handleImageUpload = async () => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "mysogi");
    const options = {
      method: "POST",
      // mode: "no-cors",
      body: formData,
    };

    try {
      const res = await fetch(
        "https://api.Cloudinary.com/v1_1/mysogi/image/upload",
        options
      );
      const res_1 = await res.json();
      this.setState({
        attachment: res_1.secure_url,
        imageAlt: `An image of ${res_1.original_filename}`,
      });
    } catch (err) {
      return console.log(err);
    }
  };

  // openWidget = () => {
  //   // create the widget
  //   const widget = window.cloudinary.createUploadWidget(
  //     {
  //       cloudName: 'mysogi',
  //       uploadPreset: 'mysogi',
  //     },
  //     (error, result) => {
  //       if (result.event === 'success') {
  //         this.setState({
  //           imageUrl: result.info.secure_url,
  //           imageAlt: `An image of ${result.info.original_filename}`
  //         })
  //       }
  //     },
  //   );
  //   widget.open(); // open up the widget after creation
  // };

  // getCsvArray = (data) => {
  //   this.setState({ csvArray: data });
  //   console.log(this.state.csvArray);
  // };

  // handleOpenDialog = (e) => {
  //   // Note that the ref is set async, so it might be null at some point
  //   if (buttonRef.current) {
  //     buttonRef.current.open(e);
  //   }
  // };

  // handleOnFileLoad = (data) => {
  //   console.log("---------------------------");
  //   console.log(data);
  //   console.log("---------------------------");
  // };

  // handleOnError = (err, file, inputElem, reason) => {
  //   console.log(err);
  // };

  // handleOnRemoveFile = (e) => (data) => {
  //   e.preventDefault();
  //   console.log("---------------------------");
  //   console.log(data);
  //   console.log("---------------------------");
  // };

  // handleRemoveFile = (e) => {
  //   // Note that the ref is set async, so it might be null at some point
  //   if (buttonRef.current) {
  //     buttonRef.current.removeFile(e);
  //   }
  // };

  render() {
    // const { step } = this.state;
    const {
      step,
      senderId,
      channel,
      campaignMessage,
      url,
      whatsAppNumber,
      phoneNumber,
      ussd,
      smsNumber,
      callToAction,
      timeRangeFrom,
      timeRangeTo,
      attachment,
      attachmentPreview,
      campaignType,
      targetAudienceOption,
      numbers,
      limit,

      ageRange,
      gender,
      state,
      lga,
      deviceType,
      deviceBrand,
      // csvFile,
      csvArray,
      parsedCsvData,
    } = this.state;

    /////////////////////////////

    const getCsvRawData = (data) => {
      this.setState({ parsedCsvData: data });
    };

    let personalUpload = parsedCsvData.map(({ Numbers }) => Numbers);

    let targetAudience = [];

    const getAudience = () => {
      if (
        personalUpload.length > 0 &&
        targetAudienceOption === "manual_import"
      ) {
        return (targetAudience = personalUpload);
      } else {
        return (targetAudience = numbers.split(","));
      }
    };

    /////////////////////////////

    // const location = state;
    // const targetAudience = numbers.split(",");
    const audience = getAudience().length;
    const price = audience * 5;
    const timeRange = timeRangeFrom + " - " + timeRangeTo;
    // const attachment = attachmentPreview

    const filterOptions = {
      ageRange,
      gender,
      state,
      lga,
      deviceType,
      deviceBrand,
    };

    const filterParameters = [filterOptions];

    const values = {
      senderId,
      channel,
      campaignMessage,
      timeRange,
      url,
      whatsAppNumber,
      phoneNumber,
      ussd,
      smsNumber,
      callToAction,
      attachment,
      targetAudience: getAudience(),
      campaignType,
      targetAudienceOption,
      filterParameters,
      csvArray,
      limit,
    };

    console.log(values);

    switch (step) {
      case 1:
        return (
          <FlierVideoCampaign
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            onChangeAttachment={this.onChangeAttachment}
            values={values}
            attachmentPreview={attachmentPreview}
            handleImageUpload={this.handleImageUpload}
          />
        );
      case 2:
        return (
          <TargetAudience
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            onChangeAttachment={this.onChangeAttachment}
            numbers={numbers}
            values={values}
            filterOptions={filterOptions}
            getCsvRawData={getCsvRawData}
          />
        );
      case 3:
        return (
          <PreviewCampaign
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            numbers={numbers}
            values={values}
            audience={audience}
            price={price}
            attachmentPreview={attachmentPreview}
            filterOptions={filterOptions}
            csvArray={csvArray}
            handleChange={this.handleChange}
          />
        );
      case 4:
        return (
          <FundWalletFlierVideo
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            price={price}
            values={values}
          />
        );
      default:
      // do nothing
    }
  }
}
