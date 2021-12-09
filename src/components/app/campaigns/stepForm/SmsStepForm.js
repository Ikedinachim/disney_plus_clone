import React, { Component } from 'react'
// import PersonalDetails from './PersonalDetails'
// import Confirmation from './Confirmation'
// import Success from './Success'

import SmsCampaign from './SmsCampaign'
import TargetAudience from './TargetAudience'
import PreviewCampaign from './PreviewCampaign'

export default class Signup extends Component {

  state = {
    step: 1,
    senderId: '',
    channel: '', 
    campaignMessage: '',
    phoneNumber: '',
  }

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  }

  render() {
    const { step } = this.state;
    const { senderId, channel, campaignMessage, phoneNumber } = this.state;
    const values = { senderId, channel, campaignMessage, phoneNumber }
    
    switch(step) {
      case 1: 
        return (
          <SmsCampaign 
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ values }
          />
        )
      case 2: 
        return (
          <TargetAudience 
            prevStep={ this.prevStep }
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ values }
          />
        )
      case 3: 
          return (
            <PreviewCampaign 
              prevStep={ this.prevStep }
              nextStep={ this.nextStep }
              values={ values }
            />
          )
      //   case 4: 
      //     return (
      //       <Success />
      //     )
      default: 
          // do nothing
    }
  }
}
