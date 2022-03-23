import React, { Component } from "react";
import SmsCampaign from "./SmsCampaign";
import TargetAudience from "./TargetAudience";
import PreviewCampaign from "./PreviewCampaign";
import FundWalletSMS from "./FundWalletSMS";

export default class SmsStepForm extends Component {
  state = {
    step: 1,
    senderId: "",
    alternateSenderId: "",
    channel: "",
    campaignMessage: "",
    // gender: "Male",
    // targetAge: "21",
    interest: "business",
    phoneNumber: "",
    campaignType: "general",
    price: 0,
    targetAudienceOption: "mysogidb",
    limit: "",
    contactNumberCount: 0,
    parsedCsvData: [],

    ageRangeTo: undefined,
    ageRangeFrom: undefined,
    ageRange: "",
    gender: "",
    state: "abia",
    lga: "",
    deviceType: "",
    deviceBrand: "",
    characterCount: 0,
    smsCount: 0,

    scheduleOption: "none",
    scheduleTime: "",
    scheduleFrom: "",
    scheduleTo: "",

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
      targetAge,
      interest,
      campaignType,
      phoneNumber,
      targetAudienceOption,
      limit,
      contactNumberCount,

      ageRangeFrom,
      ageRangeTo,
      // ageRange,
      gender,
      // state,
      // lga,
      deviceType,
      deviceBrand,

      parsedCsvData,
      characterCount,
      smsCount,

      scheduleOption,
      scheduleTime,
      scheduleFrom,
      scheduleTo,

      arrayState,
      arrayLga,
    } = this.state;

    // console.log(campaignMessage);
    /////////////////////////////

    const getCsvRawData = (data) => {
      this.setState({ parsedCsvData: data });
    };

    // const setCharacterCount = () => {
    //   this.setState({ characterCount: campaignMessage.length });
    // };

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
    const price = audience * 5 * smsCount;

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
      contactNumber,
      targetAge,
      interest,
      campaignType,
      price,
      filterParameters,
      targetAudienceOption,
      audience,
      limit,
      contactNumberCount,
      scheduleOption,
      scheduleTime,
      scheduleFrom,
      scheduleTo,
    };

    // console.log(values);

    switch (step) {
      case 1:
        return (
          <SmsCampaign
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
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
            phoneNumber={phoneNumber}
            values={values}
            filterOptions={filterOptions}
            getCsvRawData={getCsvRawData}
            handleStateChange={this.handleStateChange}
            handleLgaChange={this.handleLgaChange}
            ageRangeFrom={ageRangeFrom}
            ageRangeTo={ageRangeTo}
            arrayState={arrayState}
            arrayLga={arrayLga}
          />
        );
      case 3:
        return (
          <PreviewCampaign
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={values}
            audience={audience}
            filterOptions={filterOptions}
            handleChange={this.handleChange}
            handleCount={this.handleCount}
            ageRangeFrom={ageRangeFrom}
            ageRangeTo={ageRangeTo}
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
