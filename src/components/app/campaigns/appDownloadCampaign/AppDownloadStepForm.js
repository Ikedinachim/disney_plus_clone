import React, { Component } from "react";
import AppDownloadCampaign from "./AppDownloadCampaign";
import TargetAudience from "./TargetAudience";
import PreviewCampaign from "./PreviewCampaign";
import FundWalletAppDownlaod from "./FundWalletAppDownlaod";
import axios from "axios";

export default class AppDownloadStepForm extends Component {
  state = {
    step: 1,
    senderId: "",
    alternateSenderId: "",
    channel: "",
    campaignMessage: "",
    iosStoreUrl: "",
    androidStoreUrl: "",
    numbers: "",
    callToAction: "",
    timeRangeFrom: "",
    timeRangeTo: "",
    // attachment: "",
    attachmentPreview: "",
    uploadedImage: "",
    campaignType: "app_download",
    targetAudienceOption: "mysogidb",
    assetType: "image",
    imageUrl: null,
    imageAlt: "",
    uploadPercentage: 0,
    videoUrl: "",
    price: 0,
    csvFile: "",
    limit: undefined,
    budget: 10000,
    characterCount: 0,
    smsCount: 0,

    ageRange: "",
    gender: "",
    state: "abia",
    lga: "",
    deviceType: "",
    deviceBrand: "",

    selectedFileName: "Upload Asset *png, *jpg, *gif",

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
        this.setState({ [input]: e.target.files });
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
    // console.log(e);
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
          this.setState({ uploadPercentage: percent });
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
  };

  render() {
    // const { step } = this.state;
    const {
      step,
      senderId,
      alternateSenderId,
      channel,
      campaignMessage,
      callToAction,
      timeRangeFrom,
      timeRangeTo,
      // attachment,
      imageUrl,
      videoUrl,
      assetType,
      attachmentPreview,
      iosStoreUrl,
      androidStoreUrl,
      campaignType,
      numbers,
      limit,
      budget,

      targetAudienceOption,
      ageRange,
      gender,
      state,
      lga,
      deviceType,
      deviceBrand,
      parsedCsvData,
      selectedFileName,
      uploadPercentage,
      characterCount,
      smsCount,
    } = this.state;

    // console.log(imageUrl);
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

    // const targetAudience = numbers.split(",");
    const audience = setAudience();
    const price = audience * 5 * smsCount;
    const timeRange = timeRangeFrom + " - " + timeRangeTo;
    // const attachment = attachmentPreview
    // console.log(price);

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
      alternateSenderId,
      channel,
      campaignMessage,
      timeRange,
      targetAudience,
      callToAction,
      attachment: setAssets(),
      iosStoreUrl,
      androidStoreUrl,
      campaignType,
      targetAudience: getAudience(),
      targetAudienceOption,
      filterParameters,
      price,
      limit,
      budget,
      assetType,
    };

    // console.log(values);

    switch (step) {
      case 1:
        return (
          <AppDownloadCampaign
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            onChangeAttachment={this.onChangeAttachment}
            values={values}
            handleImageUpload={this.handleImageUpload}
            attachmentPreview={attachmentPreview}
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
          />
        );
      case 3:
        return (
          <PreviewCampaign
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={values}
            audience={audience}
            attachmentPreview={attachmentPreview}
            price={price}
            filterOptions={filterOptions}
            handleChange={this.handleChange}
          />
        );
      case 4:
        return (
          <FundWalletAppDownlaod
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={values}
          />
        );
      default:
      // do nothing
    }
  }
}
