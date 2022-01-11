import React, { Component } from "react";
import AppDownloadCampaign from "./AppDownloadCampaign";
import TargetAudience from "./TargetAudience";
import PreviewCampaign from "./PreviewCampaign";
import FundWalletAppDownlaod from "./FundWalletAppDownlaod";

export default class AppDownloadStepForm extends Component {
  state = {
    step: 1,
    senderId: "",
    channel: "",
    campaignMessage: "",
    iosStoreUrl: "",
    androidStoreUrl: "",
    numbers: "",
    callToAction: "",
    attachment: "",
    attachmentPreview: "",
    uploadedImage: "",
    campaignType: "app_download",
    targetAudienceOption: "manual",
    price: 0,
    csvFile: "",

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
        this.setState({ [input]: e.target.files });
      }
      this.setState({ attachmentPreview: reader.result });
    };

    reader.readAsDataURL(e.target.files[0]);
  };

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

  render() {
    const { step } = this.state;
    const {
      senderId,
      channel,
      campaignMessage,
      callToAction,
      attachment,
      attachmentPreview,
      iosStoreUrl,
      androidStoreUrl,
      campaignType,
      numbers,

      targetAudienceOption,
      ageRange,
      gender,
      state,
      lga,
      deviceType,
      deviceBrand,
    } = this.state;

    const targetAudience = numbers.split(",");
    const audience = targetAudience.length;
    const price = audience * 5;
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
      targetAudience,
      callToAction,
      attachment,
      iosStoreUrl,
      androidStoreUrl,
      campaignType,
      targetAudienceOption,
      filterParameters,
      price,
    };

    console.log(values);

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
