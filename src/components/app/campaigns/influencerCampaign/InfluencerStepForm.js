import React, { Component } from "react";
import InfluencerCampaign from "./InfluencerCampaign";
import InfluencerTargetAudience from "./InfluencerTargetAudience";
import PreviewInfluencerCampaign from "./PreviewInfluencerCampaign";
import InfluencerFundWallet from "./InfluencerFundWallet";

export default class InfluencerStepForm extends Component {
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
    attachment: "",
    attachmentPreview: "",
    uploadedImage: "",
    price: 0,
    campaignType: "influencer_marketing",

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

  handleCheckedState = (input) => {
    this.setState({ checkedInfluencers: input });
    let mulInfluencers = this.state.selectedInfluencers;
    let selectedIndex = mulInfluencers.findIndex((el) => el.id === input.id);
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
    // console.log(
    //   "selected influencer and platforms",
    //   this.state.selectedInfluencers
    // );
  };

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
      closeModal: false,
    });
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

  render() {
    const { step } = this.state;
    const {
      channel,
      campaignMessage,
      twitterHandle,
      facebookHandle,
      instagramHandle,
      snapchatHandle,
      attachment,
      attachmentPreview,
      selectedInfluencer,
      selectedInfluencers,
      activeItemId,
      showModal,
      // price,
      closeModal,
      checkedInfluencers,
      campaignType,
    } = this.state;

    // const filteredValue = Object.values(checkedInfluencers);
    // // console.log(closeModal);
    // console.log("This is checked Influencer", checkedInfluencers);
    // console.log("This is checked filteredValue", filteredValue);
    let totalAmount = 0;
    // let b = 0;
    // let platformCost = 0;
    // for (let i = 0; i < filteredValue.length; i++) {
    //   if (
    //     filteredValue[i]
    //     // filteredValue[i].platforms[0].allPlatform === true
    //   ) {
    //     console.log(filteredValue[i].platforms);
    //     let eachTotal = !filteredValue[i] ? [] : filteredValue[i].platforms;
    //     console.log(eachTotal);
    //     b = eachTotal.reduce((total, current) => {
    //       total += +parseInt(current.cost);
    //       return total;
    //     }, 0);
    //     console.log(parseInt(b));
    //     checkedInfluencers["influencer"]["cost"] = b;

    //     console.log(filteredValue[i].platforms[0]);
    //     if (
    //       filteredValue[i].platforms[0] &&
    //       filteredValue[i].platforms[0].allPlatform
    //     ) {
    //       totalAmount = parseInt(filteredValue[i].allCost);
    //     } else {
    //       totalAmount += b;
    //     }
    //   } else {
    //     return;
    //   }
    // }

    const price = totalAmount;
    const platform = checkedInfluencers;
    const values = {
      channel,
      twitterHandle,
      facebookHandle,
      instagramHandle,
      snapchatHandle,
      campaignMessage,
      campaignType,
      attachment,
      platform,
      price,
    };

    // console.log(values.price);

    // console.log("this is platform", values.platform);
    // const payloadPlatform = Object.values(values.platform)
    //   .map((item) => item.platforms)
    //   .map((item) => {
    //     console.log(item);
    //     const cost = item.reduce((acc, curr) => {
    //       acc += +parseInt(curr.cost);
    //       return acc;
    //     }, 0);
    //     const platform = item.map((i) => i.name).join(", ");
    //     if (!item[0]) return null;
    //     const influencer_id = item[0].influencer_Id;
    //     const allPlatform = item[0].allPlatform;
    //     return { cost, platform, influencer_id, allPlatform };
    //   });

    // console.log("this is platform2", payloadPlatform);

    const payload = {
      twitterHandle: values.twitterHandle,
      facebookHandle: values.facebookHandle,
      instagramHandle: values.instagramHandle,
      snapchatHandle: values.snapchatHandle,
      campaignMessage: values.campaignMessage,
      campaignType: values.campaignType,
      attachment: values.attachment,
      // platform: payloadPlatform,
    };

    const payload2 = {
      campaignType: "influencer_marketing",
      twitterHandle: "twitter",
      facebookHandle: "facebook",
      instagramHandle: "instagram",
      snapchatHandle: "snapchat",
      campaignMessage: "Testing influencer Marketing",
      attachment: "this is an attachment",
      platform: [
        {
          influencer_id: 1,
          cost: 500,
          platform: "facebook, instagram",
          allPlatform: false,
        },
        {
          influencer_id: 2,
          cost: 400,
          platform: "facebook, snapchat",
          allPlatform: false,
        },
      ],
    };

    switch (step) {
      case 1:
        return (
          <InfluencerCampaign
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
            // checkedInfluencers={checkedInfluencers}
            handleCheckedState={this.handleCheckedState}
          />
        );
      case 2:
        return (
          <InfluencerTargetAudience
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleImageUpload={this.handleImageUpload}
            onChangeAttachment={this.onChangeAttachment}
            attachmentPreview={attachmentPreview}
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
            checkedInfluencers={selectedInfluencers}
            payload={payload}
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
