import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { DateTime } from "luxon";

import Loader from "../../loader";
import MetaData from '../../layout/MetaData'
// import Loader from '../../layout/Loader'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { MDBDataTable } from 'mdbreact'
import { getSenderID, clearErrors } from '../../../actions/senderIDActions';

const ViewCampaign = () => {


    const { loading, error, senderID } = useSelector(state => state.senderID  || []);
    const dispatch = useDispatch()

    useEffect(() => {

        if(error) {
            alert.error(error)
            // dispatch(clearErrors())
        }
        dispatch(getSenderID())

    }, [dispatch, alert, error])


    const setSenderID = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'    
                },
                {
                    label: 'USER',
                    field: 'user',
                    sort: 'asc'    
                },
                {
                    label: 'SENDER ID',
                    field: 'senderId',
                    sort: 'asc'    
                },
                {
                    label: 'DATE REQUESTED',
                    field: 'dataRequested',
                    sort: 'asc'    
                },
                {
                    label: 'STATUS',
                    field: 'status', 
                },
                {
                    label: 'ACTION',
                    field: 'actions', 
                }
            ],
            rows: []
        }

        senderID.forEach(senderids => {
            data.rows.push({
                id: senderids._id,
                name: senderids.name,
                senderId: senderids.senderId,
                dataRequested: DateTime.fromJSDate(new Date(senderids.createdAt)).toFormat('dd MMM yyyy'),
                status: <span className={`{"badge" ${senderids.status == null || (senderids.status == "pending") ? "badge-pink" : "badge-active"}`}>{senderids.status == null || (senderids.status == "pending") ? "Pending" : "Approved"}</span>,
                actions:
                <Fragment>
                    <div className="dropdown">
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
                                        data={setSenderID()}
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