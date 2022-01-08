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
    campaignType: "sms",
    price: 0,
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
    const { step } = this.state;
    const {
      senderId,
      channel,
      campaignMessage,
      gender,
      targetAge,
      location,
      interest,
      campaignType,
      phoneNumber,
    } = this.state;
    const contactNumber = phoneNumber.split(",");
    const audience = contactNumber.length;
    const price = audience * 5;
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
    };
    const payLoad = [
      values.senderId,
      values.channel,
      values.campaignMessage,
      values.contactNumber,
      gender,
      targetAge,
      location,
      interest,
      price,
    ];

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
          />
        );
      case 3:
        return (
          <PreviewCampaign
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={values}
            audience={audience}
            payLoad={payLoad}
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
