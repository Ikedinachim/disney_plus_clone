import React, { Fragment, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import MetaData from '../../../layout/MetaData'

const FlierVideoCampaign = ({ nextStep, handleChange, values }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { senderID } = useSelector(state => state.senderID  || []);
    const Continue = e => {
        e.preventDefault();
        if(values.callToAction === '') {
            alert.error('Provide a call to action for users')
        } else if (values.channel === ''){
            alert.error('Choose a channel')
        }  
        else if (values.campaignMessage === ''){
            alert.error('Create the campaign message')
        } 
        else {
            nextStep();
        }
    }
    const [campaignImagePreview, setCampaignImagePreview] = useState('')
    const [campaignImage, setCampaignImage] = useState('')
    
    const selectChannels = [
        {
            label: "Select Channel",
            value: "select channel"
        },
        {
            label: "Smart SMS",
            value: "smart sms"
        },
        {
            label: "Flash SMS",
            value: "flash sms"
        },
    ]

    const onChangeCampaignImage = e => {
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                setCampaignImagePreview(reader.result)
                setCampaignImage(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    }

    // console.log(values.senderId);

    return (
        <Fragment>
            <MetaData title={"Create SMS Campaign"} />
                <div className="content-body">
                    <div className="container pd-x-0">
                        <div className="d-flex justify-content-between">
                            <p className="tx-18 mb-0">60%</p>
                            <p className="tx-18 mb-0">2 out of 3</p>
                        </div>
                        <div className="progress">
                            <div className="progress-bar bg-primary progress-bar-striped progress-bar-animated wd-60p" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        <div className="pd-md-y-20">
                            <div className="row justify-content-between">
                                <div className="col-md-6 col-12 mg-t-20">
                                    <div className="card-scrol pd-md-x-10">
                                    <form>
                                        <div>
                                            <p className="tx-24 tx-bold mb-1 tx-com">Flier/Video Campaign</p>
                                            <p className="tx-14">Provide all requested details to help complete the campaign creation</p>
                                            <div className="form-group">
                                                <div className="form-group">
                                                    <label htmlFor className="mb-1">Select Channel</label>
                                                    <select 
                                                        className="custom-select" 
                                                        // value="select channel"
                                                        defaultValue={values.channel}
                                                        onChange={handleChange('channel')}
                                                    >
                                                        {selectChannels.map((selectChannel) => (
                                                        <option value={selectChannel.value}>{selectChannel.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor className="mb-1">Input URL</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Enter URL customers can order or view your products through"
                                                    defaultValue={values.url}
                                                    onChange={handleChange('url')}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor className="mb-1">Phone Number</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    placeholder="Enter customer care number customers can reach you on"
                                                    defaultValue={values.phoneNumber}
                                                    onChange={handleChange('phoneNumber')}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor className="mb-1">WhatsApp Number</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    placeholder="WhatsApp Number"
                                                    defaultValue={values.whatsappNumber}
                                                    onChange={handleChange('whatsappNumber')} 
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor className="mb-1">USSD</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    placeholder="Enter preferred code"
                                                    defaultValue={values.ussd}
                                                    onChange={handleChange('ussd')} 
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor className="mb-1">SMS Number</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    placeholder="Enter number you want to be texted on by your customers"
                                                    defaultValue={values.smsNumber}
                                                    onChange={handleChange('smsNumber')}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor className="mb-1">Call To Action</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Enter the call to action prompt e.g buy now"
                                                    value={values.callToAction}
                                                    onChange={handleChange('callToAction')}
                                                />
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor className="mb-1">Time Range</label>
                                                    <div className="input-group mg-b-10">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">From</span>
                                                        </div>
                                                        <input 
                                                            type="date" 
                                                            className="form-control" 
                                                            placeholder="Username" 
                                                            aria-label="Username" aria-describedby="basic-addon1"
                                                            defaultValue={values.timeRangeFrom}
                                                            onChange={handleChange('timeRangeFrom')}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor className />
                                                    <div className="input-group mg-b-10 mg-t-5">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text" id>To</span>
                                                        </div>
                                                        <input 
                                                            type="date" 
                                                            className="form-control" 
                                                            placeholder="Username" 
                                                            aria-label="Username" aria-describedby="basic-addon1"
                                                            defaultValue={values.timeRangeTo}
                                                            onChange={handleChange('timeRangeTo')}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor className="mb-1">Campaign Message</label>
                                                <textarea 
                                                    className="form-control" 
                                                    rows={3} 
                                                    placeholder="Type your ad message here" 
                                                    defaultValue={values.campaignMessage}
                                                    onChange={handleChange('campaignMessage')}
                                                />
                                            </div>
                                        </div>
                                        <div className="mg-t-30">
                                            <p className="tx-24 tx-bold mb-1 tx-com">Attachment</p>
                                            <div className="form-group">
                                                <div className="custom-file">
                                                    <input 
                                                        type="file" 
                                                        className="custom-file-input" 
                                                        id="customFile"
                                                        onChange={onChangeCampaignImage}
                                                    />
                                                    <label className="custom-file-label" htmlFor="customFile">Click to upload desired icon (if needed)</label>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="col-md-7 pd-x-0 mg-y-30">
                                        <div className="d-flex">
                                            <button 
                                                className="btn btn-primary w-100 mg-b-15 "
                                                onClick={ Continue }
                                                type="submit"
                                                variant="contained"
                                            >
                                                Proceed
                                            </button>
                                            <Link to="/app/campaign/create" className="btn btn-outline-primary w-100 mg-l-20 mg-b-15">
                                                Go Back
                                            </Link>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-5 col-12 mg-t-20">
                                    <div className="card shadow-sm rounded bd-0">
                                    <div className="card-body">
                                        <div>
                                        <img src={campaignImage} className="img-fluid mg-b-10" alt="" srcSet />
                                        <p className="mb-4">
                                            {values.campaignMessage}
                                        </p>
                                        </div>
                                        <div>
                                        <button className="btn btn-primary w-100 mg-b-15 round-5">
                                            <i className="fa fa-whatsapp mg-r-5"> </i>
                                            {values.callToAction} via WhatsApp
                                        </button>
                                        <button className="btn btn-primary w-100 mg-b-15 round-5">
                                            <i className="fa fa-phone mg-r-5" />
                                            {values.callToAction} via Mobile
                                        </button>
                                        <button className="btn btn-primary w-100 mg-b-15 round-5">
                                            <i className="fa fa-comment mg-r-10"> </i>
                                            {values.callToAction} via Text
                                        </button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}

export default FlierVideoCampaign