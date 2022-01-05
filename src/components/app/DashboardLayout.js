import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import FeatherIcon from 'feather-icons-react';
import { useAlert } from 'react-alert'

import Header from "../layout/DashboardHeader";
import Sidebar from "../layout/Sidebar";

const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, user } = useSelector(state => state.auth)
    const { error } = useSelector(state => state.wallet)

    const [isActive, setActive] = useState("false");
    
    const ToggleClass = (e) => {
        setActive(!isActive); 
        e.preventDefault()
    };

    // const resetPropagation = (e) => { 
    //     e.stopPropagation()
    //     e.preventDefault()
    //  }

     useEffect(() => {
        if(error) {
            return alert.error(error)
        }
    }, [dispatch, error, alert ])

    return (
        
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <Sidebar />
                    <div className="content ht-100v pd-0">
                        <Header />
                        <Outlet />
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Dashboard