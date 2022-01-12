import React, { Component } from "react";
import InfluencerCampaign from "./InfluencerCampaign";
import InfluencerTargetAudience from "./InfluencerTargetAudience";
import PreviewInfluencerCampaign from "./PreviewInfluencerCampaign";
import InfluencerFundWallet from "./InfluencerFundWallet";

export default class InfluencerStepForm extends Component {
  state = {
    step: 1,
    senderId: "",
    channel: "",
    url: "",
    campaignMessage: "",
    interest: "business",
    phoneNumber: "",
    whatsAppNumber: "",
    numbers: "",
    ussd: "",
    smsNumber: "",
    callToAction: "",
    timeRangeFrom: "",
    timeRangeTo: "",
    campaignImage: "",
    attachment: "",
    attachmentPreview: "",
    targetAudience: "",
    uploadedImage: "",
    price: 0,

    selectedInfluencer: [],
    influencers: [],
    checked: false,
    checkedInfluencers: new Map(),

    showModal: false,
    activeItemId: "",
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

  // handleInfluencerChange(e) {
  //   const isChecked = e.target.checked;
  //   const influencer = e.target.value;

  //   this.setState((prevState) => ({
  //     checkedItems: prevState.checkedItems.set(influencer, isChecked),
  //   }));
  // }

  handleCheck(e) {
    this.setState({
      checked: e.target.checked,
    });
  }

  openModalWithItem(item) {
    this.setState({
      showModal: true,
      // activeItemName: item.name,
      activeItemId: item,
    });
    // console.log("modal" + this.state.showModal);
  }

  closePlatFormModal = (e) => {
    this.setState({
      showModal: e,
    });
  };

  handleInfluencerChange = (input) => (e) => {
    // console.log(e.target.checked);
    const isChecked = e.target.checked;
    if (isChecked) {
      // this.setState({
      //   [input]: [...this.state.influencers, e.target.value],
      // });
      this.setState({
        [input]: [...this.state.selectedInfluencer, e.target.value],
      });
      console.log(this.state.selectedInfluencer);
      // let modalId = (this.state.showModal = true);
      this.openModalWithItem(e.target.checked);
    } else {
      let index = this.state.selectedInfluencer.indexOf(e.target.value + "");
      console.log("index" + index);
      let allSelectedInfluencers = [...this.state.selectedInfluencer];
      allSelectedInfluencers.splice(index, 1);
      this.setState({
        [input]: allSelectedInfluencers,
      });
      console.log(this.state.selectedInfluencer);
      // console.log(this.state.influencers);
      // modalId = this.state.showModal = false;
    }
  };

  // Handle image change
  onChangeAttachment = (input) => (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        // console.log(reader.result);
        this.setState({ [input]: e.target.files[0] });
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

  // openWidget = () => {
  //   // create the widget
  //   const widget = window.cloudinary.createUploadWidget(
  //     {
  //       cloudName: 'mysogi',
  //       uploadPreset: 'mysogi',
  //     },
  //     (error, result) => {
  //       if (result.event === 'success') {
  //         this.setState({
  //           imageUrl: result.info.secure_url,
  //           imageAlt: `An image of ${result.info.original_filename}`
  //         })
  //       }
  //     },
  //   );
  //   widget.open(); // open up the widget after creation
  // };

  render() {
    const { step } = this.state;
    const {
      senderId,
      channel,
      campaignMessage,
      // gender,
      // targetAge,
      // location,
      // interest,
      url,
      callToAction,
      timeRangeFrom,
      timeRangeTo,
      attachment,
      attachmentPreview,
      // attachment,
      numbers,
      selectedInfluencer,
      activeItemId,
      showModal,
    } = this.state;

    const targetAudience = numbers.split(",");
    const audience = targetAudience.length;
    const price = audience * 5;
    const timeRange = timeRangeFrom + " - " + timeRangeTo;
    // const attachment = attachmentPreview
    const values = {
      senderId,
      channel,
      campaignMessage,
      timeRange,
      // gender,
      // targetAge,
      // location,
      // interest,
      url,
      callToAction,
      attachment,
      // price
    };
    // const payLoad = [values.senderId, values.channel, values.campaignMessage, values.whatsAppNumber, values.targetAudience, values.attachment, price];

    // console.log(values);

    switch (step) {
      case 1:
        return (
          <InfluencerCampaign
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleInfluencerChange={this.handleInfluencerChange}
            onChangeAttachment={this.onChangeAttachment}
            values={values}
            attachmentPreview={attachmentPreview}
            handleImageUpload={this.handleImageUpload}
            handleCheck={this.handleCheck}
            selectedInfluencer={selectedInfluencer}
            activeItemId={activeItemId}
            showModal={showModal}
            closePlatFormModal={this.closePlatFormModal}
          />
        );
      case 2:
        return (
          <InfluencerTargetAudience
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            onChangeAttachment={this.onChangeAttachment}
            values={values}
          />
        );
      case 3:
        return (
          <PreviewInfluencerCampaign
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={values}
            price={price}
            attachmentPreview={attachmentPreview}
          />
        );
      case 4:
        return (
          <InfluencerFundWallet
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            price={price}
            values={values}
          />
        );
      default:
      // do nothing
    }
  }
}
