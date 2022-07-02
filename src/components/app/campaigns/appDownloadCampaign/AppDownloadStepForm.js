import React, { Component } from "react";
import AppDownloadCampaign from "./AppDownloadCampaign";
import TargetAudience from "./TargetAudience";
import PreviewCampaign from "./PreviewCampaign";
import FundWalletAppDownlaod from "./FundWalletAppDownlaod";
import axios from "axios";
import { toast } from "react-toastify";

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
    campaignSchedule: "Day",
    callToAction: "",
    attachmentPreview: "",
    uploadedImage: "",
    campaignType: "app_download",
    targetAudienceOption: "mysogidb",
    assetType: "image",
    imageUrl: null,
    imageUrls: [],
    imageAlt: "",
    uploadPercentage: 0,
    rawVideoUrl: "",
    price: 0,
    csvFile: "",
    limit: undefined,
    budget: 20000,
    contactNumberCount: 0,
    characterCount: 0,
    smsCount: 0,
    callToActionCount: 0,

    scheduleOption: "none",
    scheduleTime: "",
    scheduleFrom: "",
    scheduleTo: "",

    ageRangeTo: undefined,
    ageRangeFrom: undefined,
    age: "18-29",
    gender: "B",
    state: "abia",
    lga: "",
    deviceType: "",
    deviceBrand: "",
    revenueBand: "",

    selectedFileName: "Upload Asset *png, *jpg, *gif",
    parsedCsvData: [],

    arrayState: undefined,
    arrayLga: undefined,
    rawLga: undefined,
    rawArea: undefined,
    arrayArea: undefined,
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
      this.setState({ characterCount: e.target.value.length });
      this.setState({
        smsCount: Math.ceil((e.target.value.length + 25) / 160),
      });
    } else if (input === "callToAction") {
      this.setState({ callToActionCount: e.target.value.length });
    }
    this.setState({ [input]: e.target.value });
    //
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
    let channel = this.state.channel;

    if (channel === "display_ads") {
      //it can handle multiple images
      let imageurls = this.state.imageUrls;
      for (let i = 0; i <= Object.keys(e.target.files).length - 1; i++) {
        let file = e.target.files[i];

        let reader = new FileReader();
        reader.onload = (e) => {
          let img = document.createElement("img");
          img.onload = async () => {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            let MAX_WIDTH = 900;
            let MAX_HEIGHT = 600;
            let width = img.width;
            let height = img.height;
            let maxFileSize = 2097152;
            if (file.size > maxFileSize) {
              toast.error(
                "The selected image file is too big. Please choose one that is smaller than 2 MB."
              );
            } else {
              if (width > height) {
                if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
                }
              }
              canvas.width = width;
              canvas.height = height;
              let ctx2 = canvas.getContext("2d");
              ctx2.drawImage(img, 0, 0, width, height);
              let dataurl = canvas.toDataURL("image/png");
              let files = dataurl;
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
                  .post(process.env.REACT_APP_CLOUDINARY_URL, formData, options)
                  .then((res) => {
                    imageurls.push(res.data.secure_url);
                    // console.log(res);
                    this.setState(
                      {
                        imageUrls: imageurls,
                        //this is what will be displayed on the mockup
                        imageUrl: res.data.secure_url,
                        uploadPercentage: 100,
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
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    } else {
      //it can handle single image
      let file = e.target.files[0];

      let reader = new FileReader();
      reader.onload = (e) => {
        let img = document.createElement("img");
        img.onload = async () => {
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          let MAX_WIDTH = 900;
          let MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;
          let maxFileSize = 2097152;
          if (file.size > maxFileSize) {
            toast.error(
              "The selected image file is too big. Please choose one that is smaller than 2 MB."
            );
          } else {
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            let ctx2 = canvas.getContext("2d");
            ctx2.drawImage(img, 0, 0, width, height);
            let dataurl = canvas.toDataURL("image/png");
            let files = dataurl;
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
                .post(process.env.REACT_APP_CLOUDINARY_URL, formData, options)
                .then((res) => {
                  // console.log(res);
                  this.setState(
                    {
                      //this is what will be displayed on the mockup
                      imageUrls: [],
                      imageUrl: res.data.secure_url,
                      uploadPercentage: 100,
                      selectedFileName: file.name,
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
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  handleImageDelete = (e) => {
    const uuid = e.target.id;
    const attachments = this.state.imageUrls;
    this.setState({
      imageUrls: attachments.filter((i) => i !== uuid),
      imageUrl: attachments[attachments.length - 1],
    });
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
      imageUrls,
      // videoUrl,
      rawVideoUrl,
      // videoError,
      assetType,
      attachmentPreview,
      iosStoreUrl,
      androidStoreUrl,
      campaignType,
      numbers,
      limit,
      contactNumberCount,
      callToActionCount,
      budget,

      targetAudienceOption,
      ageRangeFrom,
      ageRangeTo,
      age,
      gender,
      state,
      lga,
      deviceType,
      deviceBrand,
      revenueBand,

      parsedCsvData,
      selectedFileName,
      uploadPercentage,
      characterCount,
      smsCount,

      campaignSchedule,
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

    const setYoutubeUrl = (url) => {
      let regExp =
        // eslint-disable-next-line no-useless-escape
        /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
      let match = url && url.match(regExp);
      const watchUrl = `https://www.youtube.com/watch?v=${match && match[1]}`;
      // return match && match[1].length === 11 ? match[1] : false;

      const result = match
        ? { videoUrl: watchUrl, videoError: false }
        : { videoUrl: "", videoError: true };

      let videoUrl = result.videoUrl;
      let videoError = result.videoError;

      return { videoUrl, videoError };
    };

    const setAudience = () => {
      if (channel === "display_ads") {
        return (targetAudience = budget / 5);
      } else {
        return getAudience().length;
      }
    };

    let attachment = "";
    let attachments = imageUrls;

    const { videoUrl, videoError } = setYoutubeUrl(rawVideoUrl);

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
    const timeRange =
      timeRangeFrom && timeRangeTo ? timeRangeFrom + " - " + timeRangeTo : "";
    // const attachment = attachmentPreview
    // console.log(price);

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
      timeRange,
      callToAction,
      attachment: setAssets(),
      attachments,
      iosStoreUrl,
      androidStoreUrl,
      campaignType,
      targetAudience: getAudience(),
      targetAudienceOption,
      filterParameters,
      price,
      limit,
      contactNumberCount,
      budget,
      assetType,
      scheduleOption,
      scheduleTime,
      scheduleFrom,
      scheduleTo,
      campaignSchedule,
      age,
    };

    switch (step) {
      case 1:
        return (
          <AppDownloadCampaign
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            onChangeAttachment={this.onChangeAttachment}
            values={values}
            handleImageUpload={this.handleImageUpload}
            handleImageDelete={this.handleImageDelete}
            attachmentPreview={attachmentPreview}
            selectedFileName={selectedFileName}
            uploadPercentage={uploadPercentage}
            characterCount={characterCount}
            smsCount={smsCount}
            callToActionCount={callToActionCount}
            videoError={videoError}
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
            personalUpload={personalUpload}
            filterOptions={filterOptions}
            getCsvRawData={getCsvRawData}
            ageRangeFrom={ageRangeFrom}
            ageRangeTo={ageRangeTo}
            handleStateChange={this.handleStateChange}
            handleLgaChange={this.handleLgaChange}
            handleAreaChange={this.handleAreaChange}
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
            attachmentPreview={attachmentPreview}
            price={price}
            filterOptions={filterOptions}
            handleChange={this.handleChange}
            handleCount={this.handleCount}
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
