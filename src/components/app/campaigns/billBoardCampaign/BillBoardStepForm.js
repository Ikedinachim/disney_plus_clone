import React, { Component } from "react";
import BillBoardCampaign from "./BillBoardCampaign";
import BillBoardTargetAudience from "./BillBoardTargetAudience";
import PreviewBillBoardCampaign from "./PreviewBillBoardCampaign";
import BillBoardFundWallet from "./BillBoardFundWallet";
import axios from "axios";
import { toast } from "react-toastify";
import { clearErrors } from "../../../../actions/campaignActions";
export default class BillBoardStepForm extends Component {
  state = {
    step: 1,
    senderId: "",
    channel: "sms",
    url: "",
    campaignMessage: "",
    twitterHandle: "",
    facebookHandle: "",
    instagramHandle: "",
    snapchatHandle: "",
    campaignImage: "",
    imageUrl: undefined,
    videoUrl: "",
    imageAlt: "",
    uploadPercentage: 0,
    attachmentPreview: "",
    uploadedImage: "",
    price: 0,
    campaignType: "bill_board",
    campaignDuration: "",

    selectedInfluencer: [],
    selectedInfluencers: [],
    influencers: [],
    checked: false,

    checkedInfluencers: [],
    checkedPlatform: [],
    closeModal: false,
    influencerId: "",
    platformId: "",
    platform: [],
    assetType: "image",
    startDate: "",
    endDate: "",
    duration: 1,

    showModal: false,
    activeItemId: "",
    rawVideoUrl: "",
    selectedFileName: "Upload Asset *png, *jpg, *gif",
    selectedvideoFileName: "Upload Asset *mp4",
    orientation: "",
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
    if (input === "duration") {
      this.setState({ [input]: parseInt(e.target.value) });
    } else {
      this.setState({ [input]: e.target.value });
    }
  };

  handleCampaignDuration = (duration) => {
    this.setState({ campaignDuration: duration });
  };

  handleCheckedState = (input) => {
    this.setState({ checkedInfluencers: input });

    let mulInfluencers = this.state.selectedInfluencers;
    let selectedIndex =
      mulInfluencers && mulInfluencers.findIndex((el) => el.id === input.id);
    if (selectedIndex !== -1) {
      mulInfluencers.splice(selectedIndex, 1);
      mulInfluencers.push(input);
    } else {
      mulInfluencers.push(input);
    }

    this.setState((state) => ({
      ...state,
      selectedInfluencers: mulInfluencers,
    }));
  };

  resetCheckedState = () => {
    this.setState((state) => ({
      ...state,
      checkedInfluencers: [],
    }));
    this.setState((state) => ({
      ...state,
      selectedInfluencers: [],
    }));
    this.setState((state) => ({
      ...state,
      duration: 1,
    }));
  };

  handleCheck(e) {
    this.setState({
      checked: e.target.checked,
    });
  }

  openModalWithItem(item) {
    this.setState({
      showModal: true,
      activeItemId: item,
    });
  }

  closePlatFormModal = (e) => {
    this.setState({
      closeModal: false,
    });
  };

  // Handle image change
  onChangeAttachment = (input) => (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];

    reader.onload = () => {
      if (reader.readyState === 2) {
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

  // Handle price from child component
  handlePrice = (amount) => {
    this.setState({
      price: amount,
    });
  };

  handleImageUpload = async (e) => {
    const width = e.target.offsetWidth;
    const height = e.target.offsetHeight;
    const getOrientation = (e) => {
      let _URL = window.URL || window.webkitURL;
      let orientation;
      let img = new Image();
      var objectUrl = _URL.createObjectURL(e.target.files[0]);

      img.onload = () => {
        if (img.naturalWidth > img.naturalHeight) {
          orientation = "landscape";
        } else if (img.naturalWidth < img.naturalHeight) {
          orientation = "portrait";
        } else {
          orientation = "even";
        }
        // _URL.revokeObjectURL(objectUrl);
        // console.log("getOrientation", orientation);
        this.setState({ orientation: orientation });
      };
      img.src = objectUrl;
    };

    getOrientation(e);

    if (width > 960 || height > 1280) {
      toast.error("image dimensions not fitting");
    } else {
      let files = e.target.files[0];
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

  handleVideoUpload = async (e) => {
    let files = e.target.files[0];
    const size = files && files.size;
    const fileSize = Math.round(size / 1024);
    if (fileSize > 2048) {
      toast.error("file too large!!");
      clearErrors();
    } else {
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
          .post(process.env.REACT_APP_CLOUDINARY_VIDEO_URL, formData, options)
          .then((res) => {
            // console.log(res);
            this.setState(
              {
                videoUrl: res.data.secure_url,
                uploadPercentage: 100,
                selectedvideoFileName: files.name,
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
    const { step } = this.state;
    const {
      channel,
      campaignMessage,
      twitterHandle,
      facebookHandle,
      instagramHandle,
      snapchatHandle,
      // attachment,
      imageUrl,
      rawVideoUrl,
      videoUrl,
      attachmentPreview,
      orientation,
      selectedInfluencer,
      selectedInfluencers,
      activeItemId,
      price,
      closeModal,
      checkedInfluencers,
      campaignType,
      campaignDuration,
      selectedFileName,
      selectedvideoFileName,
      uploadPercentage,
      assetType,
      startDate,
      endDate,
      duration,
    } = this.state;

    const setYoutubeUrl = (url) => {
      let regExp =
        // eslint-disable-next-line no-useless-escape
        /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
      let match = url && url.match(regExp);
      const watchUrl = `https://www.youtube.com/watch?v=${match && match[1]}`;
      // return match && match[1].length === 11 ? match[1] : false;

      const result = match
        ? { youtubeUrl: watchUrl, videoError: false }
        : { youtubeUrl: "", videoError: true };

      let youtubeUrl = result.youtubeUrl;
      let youtubeError = result.videoError;

      return { youtubeUrl, youtubeError };
    };

    // let totalAmount = 0;
    let attachment = undefined;
    const { youtubeUrl, youtubeError } = setYoutubeUrl(rawVideoUrl);

    const setAssets = () => {
      if (assetType === "image") {
        return (attachment = imageUrl);
      } else if (assetType === "video") {
        return (attachment = videoUrl);
      } else if (assetType === "youtube") {
        return (attachment = youtubeUrl);
      }
    };

    const platform = checkedInfluencers;
    const values = {
      channel,
      twitterHandle,
      facebookHandle,
      instagramHandle,
      snapchatHandle,
      campaignMessage,
      campaignType,
      campaignDuration,
      attachment: setAssets(),
      platform,
      assetType,
      price,
      startDate,
      endDate,
      duration,
    };

    const payload = {
      campaignMessage: values.campaignMessage,
      campaignType: values.campaignType,
      attachment: values.attachment,
    };

    // console.log(values);

    switch (step) {
      case 1:
        return (
          <BillBoardCampaign
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleInfluencerChange={this.handleInfluencerChange}
            values={values}
            attachmentPreview={attachmentPreview}
            handleImageUpload={this.handleImageUpload}
            handleCheck={this.handleCheck}
            selectedInfluencer={selectedInfluencer}
            activeItemId={activeItemId}
            closeModal={closeModal}
            closePlatFormModal={this.closePlatFormModal}
            toggleHandler={this.toggleHandler}
            handlePlatformOnChange={this.handlePlatformOnChange}
            handleCheckedState={this.handleCheckedState}
            handleCampaignDuration={this.handleCampaignDuration}
          />
        );
      case 2:
        return (
          <BillBoardTargetAudience
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleImageUpload={this.handleImageUpload}
            handleVideoUpload={this.handleVideoUpload}
            onChangeAttachment={this.onChangeAttachment}
            attachmentPreview={attachmentPreview}
            values={values}
            selectedFileName={selectedFileName}
            selectedvideoFileName={selectedvideoFileName}
            uploadPercentage={uploadPercentage}
            resetCheckedState={this.resetCheckedState}
            youtubeError={youtubeError}
            checkedInfluencers={checkedInfluencers}
          />
        );
      case 3:
        return (
          <PreviewBillBoardCampaign
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={values}
            attachment={attachment}
            checkedInfluencers={checkedInfluencers}
            selectedBillboards={selectedInfluencers}
            payload={payload}
            handlePrice={this.handlePrice}
            orientation={orientation}
          />
        );
      case 4:
        return (
          <BillBoardFundWallet
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            price={price}
            values={values}
            checkedInfluencers={checkedInfluencers}
          />
        );
      default:
      // do nothing
    }
  }
}
