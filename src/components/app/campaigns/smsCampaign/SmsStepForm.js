import React, { Component } from "react";
import SmsCampaign from "./SmsCampaign";
import TargetAudience from "./TargetAudience";
import PreviewCampaign from "./PreviewCampaign";
import FundWalletSMS from "./FundWalletSMS";

export default class SmsStepForm extends Component {
  state = {
    step: 1,
    senderId: "",
    channel: "",
    campaignMessage: "",
    gender: "Male",
    targetAge: "21",
    location: ["Lagos"],
    interest: "business",
    phoneNumber: "",
    campaignType: "general",
    price: 0,
    targetAudienceOption: "manual",
    limit: "",
    parsedCsvData: [],

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

  render() {
    const {
      step,
      senderId,
      channel,
      campaignMessage,
      targetAge,
      location,
      interest,
      campaignType,
      phoneNumber,
      targetAudienceOption,
      limit,

      ageRange,
      gender,
      state,
      lga,
      deviceType,
      deviceBrand,

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
        return (targetAudience = phoneNumber.split(","));
      }
    };

    /////////////////////////////

    const contactNumber = getAudience();
    const audience = getAudience().length;
    const price = audience * 5;

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
      contactNumber,
      gender,
      targetAge,
      location,
      interest,
      campaignType,
      price,
      filterParameters,
    };

    switch (step) {
      case 1:
        return (
          <SmsCampaign
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <TargetAudience
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            phoneNumber={phoneNumber}
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
            handleChange={this.handleChange}
          />
        );
      case 4:
        return (
          <FundWalletSMS
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
