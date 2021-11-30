import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
// import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
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

const SenderID = () => {


    const { loading, error, senderID } = useSelector(state => state.senderID  || []);
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(getSenderID())

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

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
                dataRequested: formatDate(senderids.createdAt),
                status: <span className={`{"badge" ${senderids.status == null || (senderids.status == "pending") ? "badge-pink" : "badge-active"}`}>{senderids.status == null || (senderids.status == "pending") ? "Pending" : "Approved"}</span>,
                actions:
                    <Fragment>
                        {/* <Link to={`/admin/product/${senderids._id}`} className="px-2 py-1 btn btn-primary">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="px-2 py-1 ml-2 btn btn-danger" onClick={() => deleteProductHandler(senderids._id)}>
                            <i className="fa fa-trash"></i>
                        </button> */}
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

        function formatDate(date) {
            const formattedDate = new Date(date)
                .toLocaleDateString({},
                {timeZone:"GMT", day:"2-digit", month:"short" , year:"numeric"}
            )
            console.log(formattedDate)
            const sp = formattedDate.split(' ')
            console.log(sp)
            console.log(`${sp[1]} ${sp[0]} ${sp[2]}`)
            return sp
        } 

        
        // console.log(formattedDate)
        // const sp = formattedDate.split(' ')
        // console.log(`${sp[1]} ${sp[0]}, ${sp[2]}`)

        return data;
    }


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const deleteProductHandler = (id) => {
        // dispatch(deleteProduct(id))
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
                                    <p className="mg-b-0 tx-26 tx-bold">Sender ID</p>
                                    </div>
                                    <div className="col-md-2 col-6">
                                    <p>
                                        <Link to="/app/view-sender-id" className="btn btn-primary w-100">
                                        {" "}
                                        New Sender ID
                                        </Link>
                                    </p>
                                    </div>
                                </div>
                                <div className="card card rounded bd-0 shadow-sm">
                                    <div className="card-header bd-b-0 pd-b-0 pd-t-40 pd-md-x-30">
                                    <div className>
                                        <div className="row justify-content-between">
                                        <div className="col-12 col-lg-4 col-md-4 pd-r-5 mg-b-20 mg-md-b-0">
                                            <div className="d-flex">
                                            <div className="mg-t-10 mg-r-20">
                                                <div className="custom-control custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input "
                                                    name="select-all"
                                                    id="customCheck"
                                                />
                                                <label
                                                    className="custom-control-label pd-y-10"
                                                    htmlFor="customCheck"
                                                ></label>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="search-form w-100">
                                                <input
                                                    type="search"
                                                    className="form-control bg-search"
                                                    placeholder="Search"
                                                />
                                                <button className="btn" type="button">
                                                    <i data-feather="search" />
                                                </button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                            <div className="col-md-6  mg-b-10 mg-md-b-0">
                                                <div className="form-group form-row">
                                                <label
                                                    htmlFor="inputEmail3"
                                                    className="col-3 col-form-label pd-r-0"
                                                >
                                                    Sort by
                                                </label>
                                                <div className="col-9">
                                                    <select className="custom-select">
                                                    <option selected>Most recent</option>
                                                    <option value={1}>One</option>
                                                    <option value={2}>Two</option>
                                                    <option value={3}>Three</option>
                                                    </select>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="d-flex justify-content-between">
                                                <div>
                                                    <button
                                                    className="btn btn-outline w-100 pd-x-30"
                                                    data-toggle="modal"
                                                    data-target="#exportModal"
                                                    >
                                                    <span>
                                                        <i data-feather="download" className="mg-r-5" />
                                                        Export as
                                                    </span>
                                                    </button>
                                                </div>
                                                <div>
                                                    <div className="d-flex justify-content-end">
                                                    <button className="btn">
                                                        <span>
                                                        <i
                                                            data-feather="printer"
                                                            className="tx-primary mg-r-5 print-icon"
                                                        />
                                                        Print
                                                        </span>
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
                                    <div className="card-body pd-md-x-30 pd-t- mg-t-20 mg-md-t-0">
                                    {/* <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                                                <StyledTableCell align="right">Calories</StyledTableCell>
                                                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {rows.map((row) => (
                                                <StyledTableRow key={row.name}>
                                                <StyledTableCell component="th" scope="row">
                                                    {row.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer> */}

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

export default SenderID