import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { DateTime } from "luxon";
import NumberFormat from 'react-number-format'

import Loader from "../../../loader";
import MetaData from '../../../layout/MetaData'

// import { getWallet } from '../../../actions/billingActions'
import { MDBDataTable } from 'mdbreact'
import { getSmsCampaigns, clearErrors } from '../../../../actions/campaignActions';

const ViewSmsCampaign = () => {

    const { loading, error, smsCampaigns } = useSelector(state => state.getSmsCampaign || {});
    const dispatch = useDispatch()
    const alert = useAlert();

    // useEffect(() => {
    //     dispatch(getSmsCampaigns())
    //     if(error) {
    //         alert.error(error)
    //         dispatch(clearErrors())
    //     }
    //     // dispatch(getWallet())

    // }, [dispatch, alert, error])


    const setSmsCampaigns = () => {
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

        smsCampaigns.forEach(campaign => {
            data.rows.push({
                id: campaign.id,
                campaignName: campaign.name,
                adType: campaign.channel,
                revenue: <NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'₦'} />,
                cost: <NumberFormat value={campaign.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} />,
                dateCreated: DateTime.fromJSDate(new Date(campaign.createdAt)).toFormat('dd MMM, yyyy'),
                status: <span className={`{"badge" ${ !campaign.isApproved ? "badge-pink" : "badge-active"}`}>{!campaign.isApproved ? "Pending" : "Approved"}</span>,
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
            {/* <MetaData title={"SMS Campaigns"} /> */}
            {loading ? "" : (
                <MDBDataTable 
                    data={setSmsCampaigns()}
                    className="px-3 scroll"
                    bordered
                    striped
                    hover
                    checkboxFirstColumn
                />
            )}
        </Fragment>
    )
}

export default ViewSmsCampaign