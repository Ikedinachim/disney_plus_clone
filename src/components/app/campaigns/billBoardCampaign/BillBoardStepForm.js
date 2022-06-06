import React, { Component } from "react";
import BillBoardCampaign from "./BillBoardCampaign";
import BillBoardTargetAudience from "./BillBoardTargetAudience";
import PreviewInfluencerCampaign from "./PreviewBillBoardCampaign";
import BillBoardFundWallet from "./BillBoardFundWallet";
import axios from "axios";
import { toast } from "react-toastify";
import { clearErrors } from "../../../../actions/campaignActions";

export default class BillBoardStepForm extends Component {
  state = {
    step: 1,
    campaignImage: "",
    // attachment: undefined,
    videoUrl: "",
    imageAlt: "",
    uploadPercentage: 0,
    attachmentPreview: "",
    uploadedImage: "",
    billBoardPrice: 0,

    //////////////
    assetType: "image",
    billboard_id: "",
    campaignType: "bill_board",
    imageUrl: undefined,
    rateType: "daily",
    cost: 0,
    startDate: "",
    endDate: "",

    selectedFileName: "Upload Asset *png, *jpg, *gif",
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

  handleBillBoardSelection = (id, price) => {
    this.setState({ billboard_id: id });
    this.setState({
      billBoardPrice: parseInt(price),
    });
    this.nextStep();
  };

  // Handle price from child component
  handleCost = (amount) => {
    this.setState({
      cost: amount,
    });
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
    // console.log(e);
    let files = e.target.files[0];
    const size = files && files.size;
    if (size > 31457280) {
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
                videoUrl: res.data.secure_url,
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
    const { step } = this.state;
    const {
      imageUrl,
      videoUrl,
      selectedFileName,
      uploadPercentage,
      billBoardPrice,

      //////////////
      assetType,
      billboard_id,
      campaignType,
      rateType,
      cost,
      startDate,
      endDate,
    } = this.state;

    let attachment = "";

    const setAssets = () => {
      if (assetType === "image") {
        return (attachment = imageUrl);
      } else if (assetType === "video") {
        return (attachment = videoUrl);
      }
    };

    const values = {
      attachment: setAssets(),
      assetType,
      billboard_id,
      campaignType,
      rateType,
      cost,
      startDate,
      endDate,
    };

    switch (step) {
      case 1:
        return (
          <BillBoardCampaign
            nextStep={this.nextStep}
            handleBillBoardSelection={this.handleBillBoardSelection}
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
            values={values}
            selectedFileName={selectedFileName}
            uploadPercentage={uploadPercentage}
          />
        );
      case 3:
        return (
          <PreviewInfluencerCampaign
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={values}
            billBoardPrice={billBoardPrice}
            handleCost={this.handleCost}
          />
        );
      case 4:
        return (
          <BillBoardFundWallet
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            cost={cost}
            values={values}
          />
        );
      default:
      // do nothing
    }
  }
}
