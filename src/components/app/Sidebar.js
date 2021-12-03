import React from 'react'
import { Navlink } from 'react-router-dom'

import FeatherIcon from 'feather-icons-react';

const Sidebar = () => {
    return (
        
        <aside className="aside aside-fixed">
            <div className="aside-header">
            <Navlink to=""  className="aside-logo">
                <div className="pd-50">
                    <img
                        src="../assets/img/logo.svg"
                        className="img-fluid logo"
                        alt="logo"
                        srcSet
                    />
                </div>
            </Navlink>
            <button href="true" className="aside-menu-link">
                <FeatherIcon icon="menu" />
                <FeatherIcon icon="x" />
            </button>
            </div>
            <div className="aside-body">
            <ul className="nav nav-aside">
                <li className="nav-item active">
                    <Navlink to="/app" className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'}>
                        <i className="fa fa-archive mr-3" />
                        <span>Campaigns</span>
                    </Navlink>
                </li>
                <li className="nav-item">
                <Navlink to="/app/billing" className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'}>
                    <FeatherIcon icon="menu" />
                    <i className="fas fa-money-bill mr-3" />
                    <span>Billing</span>
                </Navlink>
                </li>
                <li className="nav-item">
                <Navlink to="/app/sender-id" className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'}>
                    <i className="fa fa-user mr-3 tx-muted" />
                    <span>Sender ID</span>
                </Navlink>
                </li>
                <li className="nav-item">
                <Navlink to="/app/setting" className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'}>
                    <i className="fa fa-cog mr-3" />
                    <span>Settings</span>
                </Navlink>
                </li>
                <li className="nav-item">
                <Navlink to="/app/analytics" activeClassName="active" className="nav-link">
                    <i className="fa fa-chart-bar mr-3" />{" "}
                    <span className="marine-active-menu">Analytics</span>
                </Navlink>
                </li>
            </ul>
            </div>
        </aside>
    )
}

export default Sidebar
