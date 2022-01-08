import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { DateTime } from "luxon";
import NumberFormat from 'react-number-format'

import Loader from "../../../loader";
import MetaData from '../../../layout/MetaData'
import ViewSmsCampaign from './ViewSmsCampaigns';
import ViewAppDownloadsCampaigns from './ViewAppDownloadsCampaigns';
import ViewFlierVideosCampaigns from './ViewFlierVideosCampaigns';

// import { getWallet } from '../../../actions/billingActions'
import { MDBDataTable } from 'mdbreact'
import { getSmsCampaigns, clearErrors, getAppDownloadCampaigns, getViewFlierVideosCampaigns } from '../../.././../actions/campaignActions';

const ViewCampaignTabs = () => {

    const { loading, error, allCampaigns } = useSelector(state => state.getAllCampaign || {});
    const { vfLoading, } = useSelector(state => state.viewFlierVideosCampaign || {});
    const dispatch = useDispatch()
    const alert = useAlert();

    const [activeTab, setActiveTab] = useState("tab1");

    //  Functions to handle Tab Switching
    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab1");
    };
    const handleTab2 = () => {
        // update the state to tab2
        setActiveTab("tab2");
    };
    const handleTab3 = () => {
        // update the state to tab2
        setActiveTab("tab3");
    };

    useEffect(() => {
        dispatch(getSmsCampaigns())
        dispatch(getAppDownloadCampaigns())
        dispatch(getViewFlierVideosCampaigns())
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        // dispatch(getWallet())

    }, [dispatch, alert, error])


    // const setAllCampaigns = () => {
    //     const data = {
    //         columns: [
    //             {
    //                 label: 'ID',
    //                 field: 'id',
    //                 sort: 'asc'    
    //             },
    //             {
    //                 label: 'CAMPAIGN NAME',
    //                 field: 'campaignName',
    //                 sort: 'asc'    
    //             },
    //             {
    //                 label: 'AD TYPE',
    //                 field: 'adType',
    //                 sort: 'asc'    
    //             },
    //             {
    //                 label: 'REVENUE',
    //                 field: 'revenue',
    //                 sort: 'asc'    
    //             },
    //             {
    //                 label: 'COST',
    //                 field: 'cost',
    //                 sort: 'asc' 
    //             },
    //             {
    //                 label: 'DATE CREATED',
    //                 field: 'dateCreated',
    //                 sort: 'asc' 
    //             },
    //             {
    //                 label: 'STATUS',
    //                 field: 'status',
    //                 sort: 'asc' 
    //             },
    //             {
    //                 label: 'ACTIONS',
    //                 field: 'actions',
    //                 sort: 'asc' 
    //             }
    //         ],
    //         rows: []
    //     }

    //     allCampaigns.forEach(campaign => {
    //         data.rows.push({
    //             id: campaign.id,
    //             campaignName: campaign.name,
    //             adType: campaign.channel,
    //             revenue: <NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'₦'} />,
    //             cost: <NumberFormat value={campaign.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} />,
    //             dateCreated: DateTime.fromJSDate(new Date(campaign.createdAt)).toFormat('dd MMM, yyyy'),
    //             status: <span className={`{"badge" ${ !campaign.isApproved ? "badge-pink" : "badge-active"}`}>{!campaign.isApproved ? "Pending" : "Approved"}</span>,
    //             actions:
    //             <Fragment>
    //                 {/* <div className="dropdown">
    //                     <span
    //                         className
    //                         type="button"
    //                         id="dropdownMenuButton"
    //                         data-toggle="dropdown"
    //                         aria-haspopup="true"
    //                         aria-expanded="false"
    //                     >
    //                         <span className="dot" />
    //                         <span className="dot" />
    //                         <span className="dot" />
    //                     </span>
    //                     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    //                         <a className="dropdown-item" href="./view-sender.html">
    //                         {" "}
    //                         <i data-feather="eye" className="favourite-icon mr-2 wd-15 ht-15" />
    //                         View
    //                         </a>
    //                         <a className="dropdown-item" href>
    //                         {" "}
    //                         <i data-feather="edit" className="favourite-icon mr-2 wd-15 ht-15" />
    //                         Edit
    //                         </a>
    //                         <a className="dropdown-item" href="#">
    //                         <i data-feather="trash-2" className="favourite-icon mr-2 wd-15 ht-15" />
    //                         Delete
    //                         </a>
    //                     </div>
    //                 </div> */}
    //                  <div class="tx-black tx-14">
    //                     <div class="d-flex">
    //                         <i class="fa fa-eye tx-orange pd-t-4 mg-r-5"></i>
    //                         View
    //                     </div>
    //                 </div>
    //             </Fragment> 
    //         })
    //     })
    //     return data;
    // }

    return (
        <Fragment>
            {loading || vfLoading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"All Campaigns"} />
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
                                        <div className="pd-x-0 mg-y-30">
                                            <div className="d-flex smsViewTab">
                                                <button 
                                                    className={`btn w-100 mg-r-15 ${activeTab === "tab1" ? "btn-primary" : "btn-outline-primary mg-r-15" }`}
                                                    onClick={handleTab1}
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    SMS
                                                </button>
                                                <button 
                                                    className={`btn w-100 mg-r-15 ${activeTab === "tab2" ? "btn-primary" : "btn-outline-primary mg-r-15" }`}
                                                    onClick={handleTab2}
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    Flier/Video
                                                </button>
                                                <button 
                                                    className={`btn w-100 ${activeTab === "tab3" ? "btn-primary" : "btn-outline-primary" }`}
                                                    onClick={handleTab3}
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    App Download
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body pd-md-x-30 pd-t- mg-t-20 mg-md-t-0">
                                        {activeTab === "tab1" ? <ViewSmsCampaign /> : ""}
                                        {activeTab === "tab2" ? <ViewFlierVideosCampaigns /> : ""}
                                        {activeTab === "tab3" ? <ViewAppDownloadsCampaigns /> : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ViewCampaignTabs