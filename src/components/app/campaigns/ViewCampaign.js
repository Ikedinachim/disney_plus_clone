import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { DateTime } from "luxon";
import NumberFormat from 'react-number-format'

import Loader from "../../loader";
import MetaData from '../../layout/MetaData'

import { MDBDataTable } from 'mdbreact'
import { getAllCampaigns, clearErrors } from '../../../actions/campaignActions';

const ViewCampaign = () => {


    const { loading, error, allCampaigns } = useSelector(state => state.getAllCampaign  || []);
    const dispatch = useDispatch()

    useEffect(() => {

        if(error) {
            alert.error(error)
            // dispatch(clearErrors())
        }
        dispatch(getAllCampaigns())

    }, [dispatch, alert, error])


    const setAllCampaigns = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'    
                },
                {
                    label: 'CAMPAIGN NAME',
                    field: 'campaignName',
                    sort: 'asc'    
                },
                {
                    label: 'AD TYPE',
                    field: 'adType',
                    sort: 'asc'    
                },
                {
                    label: 'REVENUE',
                    field: 'revenue',
                    sort: 'asc'    
                },
                {
                    label: 'COST',
                    field: 'cost',
                    sort: 'asc' 
                },
                {
                    label: 'DATE CREATED',
                    field: 'dateCreated',
                    sort: 'asc' 
                },
                {
                    label: 'STATUS',
                    field: 'status',
                    sort: 'asc' 
                },
                {
                    label: 'ACTIONS',
                    field: 'actions',
                    sort: 'asc' 
                }
            ],
            rows: []
        }

        allCampaigns.forEach(campaigns => {
            data.rows.push({
                id: campaigns.id,
                campaignName: campaigns.name,
                adType: campaigns.channel,
                revenue: <NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'₦'} />,
                cost: <NumberFormat value={campaigns.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} />,
                dateCreated: DateTime.fromJSDate(new Date(campaigns.createdAt)).toFormat('dd MMM, yyyy'),
                status: <span className={`{"badge" ${campaigns.status == null || (campaigns.status == "pending") ? "badge-pink" : "badge-active"}`}>{campaigns.status == null || (campaigns.status == "pending") ? "Pending" : "Approved"}</span>,
                actions:
                <Fragment>
                    {/* <div className="dropdown">
                        <span
                            className
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span className="dot" />
                            <span className="dot" />
                            <span className="dot" />
                        </span>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="./view-sender.html">
                            {" "}
                            <i data-feather="eye" className="favourite-icon mr-2 wd-15 ht-15" />
                            View
                            </a>
                            <a className="dropdown-item" href>
                            {" "}
                            <i data-feather="edit" className="favourite-icon mr-2 wd-15 ht-15" />
                            Edit
                            </a>
                            <a className="dropdown-item" href="#">
                            <i data-feather="trash-2" className="favourite-icon mr-2 wd-15 ht-15" />
                            Delete
                            </a>
                        </div>
                    </div> */}
                     <div class="tx-black tx-14">
                        <div class="d-flex">
                            <i class="fa fa-eye tx-orange pd-t-4 mg-r-5"></i>
                            View
                        </div>
                    </div>
                </Fragment> 
            })
        })
        return data;
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Sender ID"} />
                        <div className="content-body">
                            <div className="container pd-x-0">
                                <div className="row justify-content-between">
                                    <div className="col-md-6 col-6">
                                    <p className="mg-b-0 tx-26 tx-bold">Campaigns</p>
                                    </div>
                                    <div className="col-md-2 col-6">
                                    <p>
                                        <Link to="/app/campaign/create" className="btn btn-primary w-100">
                                        {" "}
                                        Create Campaign
                                        </Link>
                                    </p>
                                    </div>
                                </div>
                                <div className="card card rounded bd-0 shadow-sm">
                                    <div className="card-header bd-b-0 pd-b-0 pd-t-40 pd-md-x-30">
                                    
                                    </div>
                                    <div className="card-body pd-md-x-30 pd-t- mg-t-20 mg-md-t-0">
                                    <MDBDataTable 
                                        data={setAllCampaigns()}
                                        className="px-3 scroll"
                                        bordered
                                        striped
                                        hover
                                        checkboxFirstColumn
                                    />

                                    </div>
                                </div>
                            </div>
                        </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ViewCampaign