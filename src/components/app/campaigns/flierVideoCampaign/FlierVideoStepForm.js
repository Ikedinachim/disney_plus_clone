import React, { Component } from "react";
import FlierVideoCampaign from "./FlierVideoCampaign";
import TargetAudience from "./TargetAudience";
import axios from "axios";
import PreviewCampaign from "./PreviewCampaign";
import FundWalletFlierVideo from "./FundWalletFlierVideo";
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
    interest: "",
    // validatedFile: undefined,
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
    campaignSchedule: "Day",
    uploadedImage: "",
    campaignType: "flier_video",
    targetAudienceOption: "mysogidb",
    assetType: "image",
    imageUrl: null,
    imageAlt: "",
    imageUrls: [],
    uploadPercentage: 0,
    rawVideoUrl: "",
    price: 0,
    limit: undefined,
    budget: 20000,
    contactNumberCount: 0,
    characterCount: 0,
    smsCount: 1,
    callToActionCount: 0,
    signature: "",

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
    uploadFileType: "",

    arrayState: undefined,
    rawLga: undefined,
    rawArea: undefined,
    arrayLga: undefined,
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
      this.setState({
        characterCount: e.target.value.length + this.state.signature.length,
      });
      this.setState({
        smsCount: Math.ceil(
          (e.target.value.length + this.state.signature.length + 25) / 160
        ),
      });
      this.setState({ [input]: e.target.value });
    } else if (input === "callToAction") {
      this.setState({ callToActionCount: e.target.value.length });
      this.setState({ [input]: e.target.value });
    } else if (input === "signature") {
      this.setState({
        [input]: e.target.value,
      });
      this.setState({
        characterCount:
          e.target.value.length + this.state.campaignMessage.length,
      });
      this.setState({
        smsCount: Math.ceil(
          (e.target.value.length + this.state.campaignMessage.length) / 160
        ),
      });
    } else this.setState({ [input]: e.target.value });
    //
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
      let imageurls = [];
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
                  imageurls[0] = res.data.secure_url;
                  this.setState(
                    {
                      //this is what will be displayed on the mockup
                      imageUrls: imageurls,
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
      interest,
      // attachment,
      imageUrl,
      imageUrls,
      rawVideoUrl,
      attachmentPreview,
      campaignType,
      targetAudienceOption,
      numbers,
      limit,
      budget,
      contactNumberCount,
      campaignSchedule,

      ageRangeFrom,
      ageRangeTo,
      age,
      gender,
      state,
      lga,
      deviceType,
      deviceBrand,
      revenueBand,
      // csvFile,
      csvArray,
      parsedCsvData,
      uploadFileType,
      assetType,
      selectedFileName,
      uploadPercentage,
      characterCount,
      smsCount,
      callToActionCount,
      signature,

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

    const getCsvRawData = (data, uploadFileType) => {
      this.setState({ parsedCsvData: data });
      this.setState({ uploadFileType: uploadFileType });
    };

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

    // const getAudience2 = () => {
    //   if (
    //     personalUpload.length > 0 &&
    //     targetAudienceOption === "manual_import"
    //   ) {
    //     return (targetAudience = personalUpload);
    //   } else {
    //     return (targetAudience = numbers.split(","));
    //   }
    // };

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
          return (targetAudience = numbers.split(","));
        }
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
      url,
      whatsAppNumber,
      interest,
      phoneNumber,
      ussd,
      smsNumber,
      callToAction,
      attachment: setAssets(),
      attachments,
      targetAudience: getAudience(),
      campaignType,
      targetAudienceOption,
      filterParameters,
      csvArray,
      limit,
      contactNumberCount,
      signature,
      price,
      budget,
      assetType,
      scheduleOption,
      scheduleTime,
      imageUrls,
      scheduleFrom,
      scheduleTo,
      age,
      gender,
      campaignSchedule,
    };

    // console.log(values);

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
            handleImageDelete={this.handleImageDelete}
            selectedFileName={selectedFileName}
            signature={signature}
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
            numbers={numbers}
            values={values}
            audience={audience}
            price={price}
            attachmentPreview={attachmentPreview}
            filterOptions={filterOptions}
            csvArray={csvArray}
            handleChange={this.handleChange}
            handleCount={this.handleCount}
            smsCount={smsCount}
          />
        );
      case 4:
        return (
          <FundWalletFlierVideo
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            price={price}
            values={values}
            smsCount={smsCount}
          />
        );
      default:
      // do nothing
    }
  }
}
