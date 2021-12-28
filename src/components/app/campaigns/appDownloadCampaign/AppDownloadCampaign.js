import React, { Fragment, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { getSenderID } from '../../../../actions/senderIDActions';
import Loader from '../../../loader'

import MetaData from '../../../layout/MetaData'

const SmsCampaign = ({ nextStep, handleChange, values, onChangeAttachment }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { senderID, loading } = useSelector(state => state.senderID  || []);
    const Continue = e => {
        e.preventDefault();
        if(values.senderId === '') {
            alert.error('Select a Sender ID or request for one if not available')
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
    const selectChannels = [
        {
            label: "Select Channel",
            value: "select channel"
        },
        {
            label: "Flash sms",
            value: "flash sms"
        },
        {
            label: "SMS/Flash SMS Campaign",
            value: "SMS/FLASH SMS Campaign"
        },
        {
            label: "Flier/Video Ad Campaign",
            value: "Flier/Video Ad Campaign"
        },
        {
            label: "Influential Marketing",
            value: "Influential Marketing"
        },
        {
            label: "App Download",
            value: "App Download"
        }
    ]

    useEffect(() => {
        dispatch(getSenderID())
    }, [dispatch])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Create App Download Campaign"} />
                        <div className="content-body">
                            <div className="container pd-x-0"> 
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <p className="tx-18 mb-0">60%</p>
                                        <p className="tx-18 mb-0">2 out of 3</p>
                                    </div>
                                    <div className="progress">
                                        <div 
                                            className="progress-bar bg-primary progress-bar-striped progress-bar-animated wd-60p" 
                                            role="progressbar" 
                                            aria-valuenow={40} 
                                            aria-valuemin={0} 
                                            aria-valuemax={100} 
                                        />
                                    </div>
                                    <div className="pd-md-y-20">
                                        <div className="row justify-content-between">
                                            <div className="col-md-6 col-12 mg-t-20">
                                                <div className="card-scrol pd-md-x-10">
                                                    <form>
                                                        <div>
                                                            <p className="tx-24 tx-bold mb-1 tx-com">APP Download Campaign</p>
                                                            <p className="tx-14">Provide all requested details to help complete the campaign creation</p>
                                                            <div className="form-group">
                                                                <label htmlFor className="mb-1">Sender ID</label>
                                                                <select 
                                                                    className="custom-select" 
                                                                    // value="select channel"
                                                                    defaultValue={values.senderId}
                                                                    onChange={handleChange('senderId')}
                                                                >
                                                                    <option value="">Select Sender ID</option>
                                                                    {senderID.map(senderids => (
                                                                    <option value={senderids.senderId}>{senderids.senderId}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor className="mb-1">IOS store URL</label>
                                                                <input type="text" className="form-control" id placeholder="Enter URL here" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor className="mb-1">Android store URL</label>
                                                                <input type="text" className="form-control" id placeholder="Enter URL here" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor className="mb-1">Select Channel</label>
                                                                <select 
                                                                    className="custom-select" 
                                                                    defaultValue={values.channel}
                                                                    onChange={handleChange('channel')}
                                                                >
                                                                    {selectChannels.map((selectChannel) => (
                                                                    <option value={selectChannel.value}>{selectChannel.label}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor className="mb-1">Call to Action</label>
                                                                <input type="number" className="form-control" id placeholder="Enter call to action prompt e.g download now" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor className="mb-1">Campaign Message</label>
                                                                <textarea 
                                                                    className="form-control" 
                                                                    rows={3} 
                                                                    placeholder="Type your ad message here" defaultValue={values.campaignMessage}
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
                                                                        onChange={onChangeAttachment('attachmentPreview')}
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
                                                            <Link 
                                                                to="/app/campaign/create" 
                                                                className="btn btn-outline-primary w-100 mg-l-20 mg-b-15"
                                                            >
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
                                                            <img src={values.attachment} className="img-fluid mg-b-10" alt="" srcSet />
                                                            <p className="mb-4">
                                                                {values.campaignMessage}
                                                            </p>
                                                        </div>
                                                        <div className="pd-b-40">
                                                            <button className="btn btn-primary w-100 mg-b-15 round-5">
                                                                Download
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default SmsCampaign