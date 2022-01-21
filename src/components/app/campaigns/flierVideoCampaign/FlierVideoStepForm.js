import React, { Component } from "react";
import FlierVideoCampaign from "./FlierVideoCampaign";
import TargetAudience from "./TargetAudience";
import PreviewCampaign from "./PreviewCampaign";
import FundWalletFlierVideo from "./FundWalletFlierVideo";

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
    csvFile: "",
    csvArray: "",

    ageRange: "",
    gender: "",
    state: "abia",
    lga: "",
    deviceType: "LG",
    deviceBrand: "X210ZM",
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

  setCsv = (input) => (e) => {
    this.setState({ [input]: e.target.files[0] });
  };

  // processCSV = (str, delim = ",") => {
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

  //   this.setState({ csvArray: newArray });
  // };

  handleManualImport = (input) => (e) => {
    // e.preventDefault();
    // console.log(e.target.files[0]);
    // // e.preventDefault();
    // this.setState({ [input]: e.target.files[0] });
    // console.log(this.state.csvFile);
    // const file = this.state.csvFile;
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   if (reader.readyState === 2) {
    //     const text = e.target.result;
    //     console.log(text);
    //     this.processCSV(text);
    //   }
    // };
    // reader.readAsText(file);
  };

  // submit = () => {
  //   const file = csvFile;
  //   const reader = new FileReader();

  //   reader.onload = function (e) {
  //     const text = e.target.result;
  //     console.log(text);
  //   };

  //   reader.readAsText(file);
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

    // replace cloudname with your Cloudinary cloud_name
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

  getCsvArray = (data) => {
    this.setState({ csvArray: data });
    console.log(this.state.csvArray);
  };

  render() {
    const { step } = this.state;
    const {
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

      ageRange,
      gender,
      state,
      lga,
      deviceType,
      deviceBrand,
      csvFile,
      csvArray,
    } = this.state;

    const location = state;
    const targetAudience = numbers.split(",");
    const audience = targetAudience.length;
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
      targetAudience,
      campaignType,
      targetAudienceOption,
      filterParameters,
      csvArray,
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
            handleManualImport={this.handleManualImport}
            numbers={numbers}
            values={values}
            filterOptions={filterOptions}
            setCsv={this.setCsv}
            ////////////////
            getCsvArray={this.getCsvArray}
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
