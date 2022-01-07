import React, { Fragment, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../../layout/MetaData';
import { useAlert } from 'react-alert';
import NaijaStates from 'naija-state-local-government';

import { getFilteredContactList, clearErrors } from '../../../../actions/campaignActions';

const TargetAudience = ({ prevStep, nextStep, handleChange, numbers, filteredContact, values }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { filteredContactList, error, loading } = useSelector(state => state.filteredContactList  || []);
    
    const [status, setStatus] = useState(3);
    const radioHandler = (status) => {
        setStatus(status);
    };

    const selectGenders = [
        {
            label: "Select Gender",
            value: ""
        },
        {
            label: "Male",
            value: "M"
        },
        {
            label: "Female",
            value: "F"
        },
        {
            label: "Both",
            value: "B"
        }
    ]

    const selectAgeRanges = [
        {
            label: "Select Age Group",
            value: ""
        },
        {
            label: "13-24",
            value: "13-24"
        },
        {
            label: "25-34",
            value: "25-34"
        },
        {
            label: "35-44",
            value: "35-44"
        }
    ]

    const Continue = e => {
        e.preventDefault();
        dispatch(getFilteredContactList(filteredContact))
        nextStep();
    }
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }

    useEffect( () => {
        // if(filteredContactList.status === "success") {
        //     nextStep();
        // }
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, error, alert ])

    const lga = NaijaStates.lgas(filteredContact.state)

    return (
        <Fragment>
            <MetaData title={"Target Audience"} />
                <div className="content-body">
                    <div className="container-fluid">
                        <div className="card card-body rounded bd-0 shadow-sm pd-lg-x-50 pd-lg-y-30">
                            <div className="d-flex justify-content-between">
                                <p className="tx-18 mb-0">100%</p>
                                <p className="tx-18 mb-0">3 out of 3</p>
                            </div>
                            <div className="progress">
                            <div
                                className="progress-bar bg-primary progress-bar-striped progress-bar-animated wd-100p"
                                role="progressbar"
                                aria-valuenow={40}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                            </div>
                            <div className="pd-md-y-20">
                                <div className>
                                    <form>
                                        <div>
                                            <p className="tx-22 tx-com tx-bold mb-1">Select Target Audience</p>
                                            <p className="tx-14 tx-blac">
                                            Let’s narrow down your target audience to help boost sales
                                            </p>
                                            <div className="form-group">
                                                <div className="custom-control custom-radio">
                                                    <input
                                                        type="radio"
                                                        id="db"
                                                        name="customRadio"
                                                        className="custom-control-input"
                                                        defaultChecked
                                                        checked={status === 1} 
                                                        onClick={(e) => radioHandler(1)}
                                                        value={'mysogi_db'}
                                                        onChange={handleChange('targetAudienceType')}
                                                    />
                                                    <label className="custom-control-label" htmlFor="db">
                                                    Use Mysogi Database
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-radio">
                                                    <input
                                                    type="radio"
                                                    id="import"
                                                    name="customRadio"
                                                    className="custom-control-input"
                                                    checked={status === 2} 
                                                    onClick={(e) => radioHandler(2)}
                                                    value={'import_contact'}
                                                    onChange={handleChange('targetAudienceType')}
                                                    />
                                                    <label className="custom-control-label" htmlFor="import">
                                                    Import my own database
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-radio">
                                                    <input
                                                    type="radio"
                                                    id="manual"
                                                    name="customRadio"
                                                    className="custom-control-input"
                                                    checked={status === 3} 
                                                    onClick={(e) => radioHandler(3)}
                                                    defaultValue={'manual_contact'}
                                                    onChange={handleChange('targetAudienceType')}
                                                    />
                                                    <label className="custom-control-label" htmlFor="manual">
                                                    Enter Contacts Manually
                                                    </label>
                                                </div>
                                            </div>
                                            {status === 1 && 
                                                <div id="show_1">
                                                    <div className="row justify-content-md-between">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor className="mb-1 tx-com">
                                                                Age Group
                                                            </label>
                                                            <select 
                                                                className="form-control" 
                                                                defaultValue={filteredContact.ageRange}
                                                                onChange={handleChange('ageRange')}
                                                            >
                                                                {selectAgeRanges.map((selectAgeRange) => (
                                                                <option value={selectAgeRange.value}>{selectAgeRange.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor className="mb-1 tx-com">
                                                                Gender
                                                            </label>
                                                            <select 
                                                                className="form-control" 
                                                                defaultValue={filteredContact.gender}
                                                                onChange={handleChange('gender')}
                                                            >
                                                                {selectGenders.map((selectGender) => (
                                                                <option value={selectGender.value}>{selectGender.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor className="mb-1 tx-com">
                                                                State
                                                            </label>
                                                            <select 
                                                                className="custom-select" 
                                                                defaultValue={filteredContact.state}
                                                                onChange={handleChange('state')}
                                                            >
                                                                {NaijaStates.states().map((selectState) => (
                                                                <option value={selectState}>{selectState}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor className="mb-1 tx-com">
                                                                LGA
                                                            </label>
                                                            <select 
                                                                className="custom-select" 
                                                                defaultValue={filteredContact.lga}
                                                                onChange={handleChange('lga')}
                                                            >
                                                                <option value="">Select L.G.A</option>
                                                                {lga.lgas.map((selectLga) => (
                                                                    <option value={selectLga}>{selectLga}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor className="mb-1 tx-com">
                                                                ARPU Band
                                                            </label>
                                                            <select id="band" className="form-control">
                                                                <option value />
                                                                <option value="m">0-1000</option>
                                                                <option value="f">1001-5000</option>
                                                                <option value="b">5001-10000</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor className="mb-1 tx-com">
                                                                Interest
                                                            </label>
                                                            <select className="custom-select">
                                                                <option selected>Select Interest</option>
                                                                <option value={1}>Music</option>
                                                                <option value={2}>Comedy</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor className="mb-1 tx-com">
                                                                Device Type
                                                            </label>
                                                            <select className="custom-select">
                                                                <option selected>Select the kind of device</option>
                                                                <option value={1}>Android</option>
                                                                <option value={2}>IOS</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor className="mb-1 tx-com">
                                                                Device Brand
                                                            </label>
                                                            <select className="custom-select">
                                                                <option selected>Select Device Brand</option>
                                                                <option value={1}>Nokia</option>
                                                                <option value={2}>Iphone</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {status === 3 && 
                                                <div className="hide" id="show_2">
                                                    <div className="row justify-content-md-between">
                                                        <div className="form-group col-md-6">
                                                        <label htmlFor className="mb-1 tx-com">
                                                            Enter Number (you can separate your contact with comma (,)
                                                        </label>
                                                        <textarea
                                                            name
                                                            className="form-control"
                                                            id
                                                            rows={4}
                                                            onChange={handleChange('numbers')}
                                                            placeholder="Enter Number"
                                                            defaultValue={numbers}
                                                        />
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </form>
                                    <div className="col-md-5 pd-x-0 mg-y-40">
                                        <div className="d-flex">
                                            <button 
                                                className="btn btn-primary w-100 "
                                                onClick={ Continue }
                                                type="submit"
                                                variant="contained"
                                                disabled={ numbers === '' && filteredContact.gender === '' ? true : false }
                                            >
                                                Filter
                                            </button>
                                            <button
                                                className="btn btn-outline-primary w-100 mg-l-20"
                                                onClick={ Previous }
                                                type="submit"
                                                variant="contained"
                                            >
                                                Go Back
                                            </button>
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

export default TargetAudience