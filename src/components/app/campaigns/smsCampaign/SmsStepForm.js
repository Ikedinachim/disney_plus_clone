import React, { Component } from "react";

import SmsCampaign from "./SmsCampaign";
import TargetAudience from "./TargetAudience";
import PreviewCampaign from "./PreviewCampaign";
import FundWalletSMS from "./FundWalletSMS";
import axios from "axios";
import { toast } from "react-toastify";
import { clearErrors } from "../../../../actions/campaignActions";

export default class SmsStepForm extends Component {
  state = {
    step: 1,
    senderId: "",
    alternateSenderId: "",
    channel: "sms",
    campaignMessage: "",
    interest: "business",
    phoneNumber: "",
    campaignType: "general",
    price: 0,
    targetAudienceOption: "mysogidb",
    limit: "",
    contactNumberCount: 0,
    parsedCsvData: [],
    uploadFileType: "",
    audioUrl: undefined,
    uploadPercentage: 0,

    ageRangeTo: undefined,
    ageRangeFrom: undefined,
    ageRange: "",
    gender: "B",
    state: "abia",
    lga: "",
    deviceType: "",
    deviceBrand: "",
    revenueBand: "",
    characterCount: 0,
    smsCount: 0,

    scheduleOption: "none",
    scheduleTime: "",
    scheduleFrom: "",
    scheduleTo: "",

    arrayState: undefined,
    rawLga: undefined,
    rawArea: undefined,
    arrayLga: undefined,
    arrayArea: undefined,

    selectedFileName: "Upload Audio Asset *mp3, *mpeg",
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
    if (input === "campaignMessage") {
      const isDoubleByte = (str) => {
        for (var i = 0, n = str.length; i < n; i++) {
          if (str.charCodeAt(i) > 255) {
            return true;
          }
        }
        return false;
      };
      // console.log("unicode", isDoubleByte(e.target.value));
      // console.log("`".match(/[\u0B80-\u0BFF]+/g));
      const convertUnicode = (text) => {
        return text.replace(/\\u([0-9a-fA-F]{4})/g, function (a, b) {
          var charcode = parseInt(b, 16);
          return String.fromCharCode(charcode);
        });
      };
      this.setState({ characterCount: convertUnicode(e.target.value).length });
      this.setState({
        smsCount: Math.ceil((convertUnicode(e.target.value).length + 25) / 160),
      });
      this.setState({ [input]: convertUnicode(e.target.value) });
    } else {
      this.setState({ [input]: e.target.value });
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
    this.setState({ rawLga: lga });
  };

  handleAreaChange = (area) => {
    this.setState({ arrayArea: area.map((value) => value.value).join(",") });
    this.setState({ rawArea: area });
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

  handleAudioUpload = async (e) => {
    // console.log(e);
    let files = e.target.files[0];
    // console.log(files);
    const size = files && files.size;
    if (size > 10485760) {
      toast.error("file too large!!");
      clearErrors();
    } else {
      const formData = new FormData();
      formData.append("file", files);
      formData.append("upload_preset", "mysogi");
      // formData.append("resource_type", "video");

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
          .post(process.env.REACT_APP_CLOUDINARY_VIDEO_URL, formData, options)
          .then((res) => {
            // console.log(res);
            this.setState(
              {
                audioUrl: res.data.secure_url,
                uploadPercentage: 100,
                selectedFileName: files.name,
                // imageAlt: `An image of ${res.original_filename}`,
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
      audioUrl,
      uploadPercentage,
      selectedFileName,

      ageRangeFrom,
      ageRangeTo,
      // ageRange,
      gender,
      // state,
      // lga,
      deviceType,
      deviceBrand,
      revenueBand,

      parsedCsvData,
      uploadFileType,
      characterCount,
      smsCount,

      scheduleOption,
      scheduleTime,
      scheduleFrom,
      scheduleTo,

      arrayState,
      rawLga,
      rawArea,
      arrayLga,
      arrayArea,
    } = this.state;

    // console.log("parsedCsvData", parsedCsvData);
    /////////////////////////////

    const getCsvRawData = (data, uploadFileType) => {
      this.setState({ parsedCsvData: data });
      this.setState({ uploadFileType: uploadFileType });
    };

    // const setCharacterCount = () => {
    //   this.setState({ characterCount: campaignMessage.length });
    // };

    let personalUpload = parsedCsvData
      .map(({ Numbers }) => Numbers)
      .filter((element) => {
        if (element !== null) {
          return true;
        } else {
          return false;
        }
      });
    let personalTxtUpload = parsedCsvData.map((Numbers) => Numbers);

    let targetAudience = [];

    const getAudience = () => {
      if (
        uploadFileType === "csv" &&
        personalUpload.length > 0 &&
        targetAudienceOption === "manual_import"
      ) {
        return (targetAudience = personalUpload);
      } else if (
        uploadFileType === "txt" &&
        personalTxtUpload.length > 0 &&
        targetAudienceOption === "manual_import"
      ) {
        return (targetAudience = personalTxtUpload);
      } else {
        if (
          targetAudienceOption === "manual_import" &&
          (personalUpload.length === 0 || personalTxtUpload.length === 0)
        ) {
          return (targetAudience = []);
        } else {
          return (targetAudience = phoneNumber.split(","));
        }
      }
    };

    let price;

    const setPrice = () => {
      if (channel === "voice_sms") {
        return (price = audience * 15);
      } else {
        return (price = audience * 5 * smsCount);
      }
    };

    /////////////////////////////
    const contactNumber = getAudience();
    const audience = getAudience().length;
    // const price = audience * 5 * smsCount;

    const filterOptions = {
      ageRange:
        ageRangeFrom && ageRangeTo ? `${ageRangeFrom + "-" + ageRangeTo}` : "",
      gender,
      state: arrayState && arrayState.map((value) => value.value).join(","),
      lga: arrayLga,
      area: arrayArea,
      deviceType,
      deviceBrand,
      revenueBand,
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
      price: setPrice(),
      filterParameters,
      targetAudienceOption,
      audience,
      limit,
      contactNumberCount,
      scheduleOption,
      scheduleTime,
      scheduleFrom,
      scheduleTo,
      attachment: audioUrl,
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
            onChangeAttachment={this.onChangeAttachment}
            handleAudioUpload={this.handleAudioUpload}
            selectedFileName={selectedFileName}
            uploadPercentage={uploadPercentage}
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
            audience={audience}
            personalUpload={personalUpload}
            filterOptions={filterOptions}
            getCsvRawData={getCsvRawData}
            handleStateChange={this.handleStateChange}
            handleLgaChange={this.handleLgaChange}
            handleAreaChange={this.handleAreaChange}
            ageRangeFrom={ageRangeFrom}
            ageRangeTo={ageRangeTo}
            arrayState={arrayState}
            arrayLga={arrayLga}
            rawLga={rawLga}
            rawArea={rawArea}
            arrayArea={arrayArea}
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
