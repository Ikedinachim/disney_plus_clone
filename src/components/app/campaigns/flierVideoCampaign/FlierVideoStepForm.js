import React, { Component, useCallback } from "react";
import FlierVideoCampaign from "./FlierVideoCampaign";
import TargetAudience from "./TargetAudience";
import PreviewCampaign from "./PreviewCampaign";
import FundWalletFlierVideo from "./FundWalletFlierVideo";
import axios from "axios";
import { toast } from "react-toastify";
// import { useDropzone } from "react-dropzone";

// const buttonRef = React.createRef();

export default class FlierVideoStepForm extends Component {
  state = {
    step: 1,
    senderId: "",
    alternateSenderId: "",
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
    // attachment: "",
    attachmentPreview: "",
    targetAudience: "",
    uploadedImage: "",
    campaignType: "flier_video",
    targetAudienceOption: "mysogidb",
    assetType: "image",
    imageUrl: null,
    imageAlt: "",
    uploadPercentage: 0,
    videoUrl: "",
    price: 0,
    limit: undefined,
    budget: 10000,
    contactNumberCount: 0,
    characterCount: 0,
    smsCount: 0,

    scheduleOption: "none",
    scheduleTime: "",
    scheduleFrom: "",
    scheduleTo: "",

    ageRangeTo: undefined,
    ageRangeFrom: undefined,
    ageRange: "",
    gender: "",
    state: "abia",
    lga: "",
    deviceType: "",
    deviceBrand: "",

    selectedFileName: "Upload Asset *png, *jpg, *gif",

    parsedCsvData: [],

    arrayState: undefined,
    arrayLga: undefined,
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

    if (input === "campaignMessage") {
      this.setState({ characterCount: e.target.value.length });
      this.setState({ smsCount: Math.ceil(e.target.value.length / 160) });
    }
  };

  // Handle image change
  onChangeAttachment = (input) => (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];

    reader.onload = () => {
      if (reader.readyState === 2) {
        // console.log(reader.result);
        this.setState({ [input]: e.target.files[0] });
      }
      this.setState({ attachmentPreview: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
      this.setState({
        selectedFileName: file.name,
      });
    }
  };

  handleImageUpload = async (e) => {
    const width = e.target.offsetWidth;
    const height = e.target.offsetHeight;
    if (width > 960 || height > 1280) {
      toast.error("image dimensions not fitting");
    } else {
      let files = e.target.files[0];
      // console.log(files);
      const formData = new FormData();
      formData.append("file", files);
      formData.append("upload_preset", "mysogi");

      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);

          if (percent < 100) {
            this.setState({ uploadPercentage: percent });
          }
        },
      };

      try {
        await axios
          .post(process.env.REACT_APP_CLOUDINARY_URL, formData, options)
          .then((res) => {
            // console.log(res);
            this.setState(
              {
                imageUrl: res.data.secure_url,
                uploadPercentage: 100,
                selectedFileName: files.name,
                imageAlt: `An image of ${res.original_filename}`,
              },
              () => {
                setTimeout(() => {
                  this.setState({ uploadPercentage: 0 });
                }, 1000);
              }
            );
          });
      } catch (err) {
        // return console.log(err);
      }
    }
  };

  handleCount = (count) => {
    this.setState({ contactNumberCount: count });
  };

  handleStateChange = (state) => {
    this.setState({ arrayState: state });
  };

  handleLgaChange = (lga) => {
    this.setState({ arrayLga: lga.map((value) => value.value).join(",") });
  };

  render() {
    const {
      step,
      senderId,
      alternateSenderId,
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
      // attachment,
      imageUrl,
      videoUrl,
      attachmentPreview,
      campaignType,
      targetAudienceOption,
      numbers,
      limit,
      budget,
      contactNumberCount,

      ageRangeFrom,
      ageRangeTo,
      ageRange,
      gender,
      state,
      lga,
      deviceType,
      deviceBrand,
      // csvFile,
      csvArray,
      parsedCsvData,
      assetType,
      selectedFileName,
      uploadPercentage,
      characterCount,
      smsCount,

      scheduleOption,
      scheduleTime,
      scheduleFrom,
      scheduleTo,

      arrayState,
      arrayLga,
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

    const setAudience = () => {
      if (channel === "display_ads") {
        return (targetAudience = budget / 5);
      } else {
        return getAudience().length;
      }
    };

    let attachment = "";

    const setAssets = () => {
      if (assetType === "image") {
        return (attachment = imageUrl);
      } else if (assetType === "video") {
        return (attachment = videoUrl);
      }
    };

    /////////////////////////////
    const audience = setAudience();
    const price = audience * 5 * smsCount;
    const timeRange =
      timeRangeFrom && timeRangeTo ? timeRangeFrom + " - " + timeRangeTo : "";

    const filterOptions = {
      ageRange:
        ageRangeFrom && ageRangeTo ? `${ageRangeFrom + "-" + ageRangeTo}` : "",
      gender,
      state: arrayState && arrayState.map((value) => value.value).join(","),
      lga: arrayLga,
      deviceType,
      deviceBrand,
    };

    const filterParameters = [filterOptions];

    const values = {
      senderId,
      alternateSenderId,
      channel,
      campaignMessage,
      timeRange,
      url,
      whatsAppNumber,
      phoneNumber,
      ussd,
      smsNumber,
      callToAction,
      attachment: setAssets(),
      targetAudience: getAudience(),
      campaignType,
      targetAudienceOption,
      filterParameters,
      csvArray,
      limit,
      contactNumberCount,
      price,
      budget,
      assetType,
      scheduleOption,
      scheduleTime,
      scheduleFrom,
      scheduleTo,
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
            selectedFileName={selectedFileName}
            uploadPercentage={uploadPercentage}
            characterCount={characterCount}
            smsCount={smsCount}
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
            ageRangeFrom={ageRangeFrom}
            ageRangeTo={ageRangeTo}
            handleStateChange={this.handleStateChange}
            handleLgaChange={this.handleLgaChange}
            arrayState={arrayState}
            arrayLga={arrayLga}
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
            handleCount={this.handleCount}
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
