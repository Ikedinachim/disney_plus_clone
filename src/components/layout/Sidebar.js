import React, { useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'

import FeatherIcon from 'feather-icons-react';
// import EventBus  from './_helpers/Events';

const Sidebar = () => {

    const ref = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    // const GlobalState = React.createContext([{}, () => {}]); 

    useEffect(() => {
        // EventBus.on('isMenuOpen', ()=>{
        //     setLoader(true)
        // })
        // EventBus.on('isMenuClose', ()=>{
        //     setLoader(false)
        // })

        const checkIfClickedOutside = e => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
            setIsMenuOpen(false)
          }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])

    return (
        
        <aside className={`aside aside-fixed ${!isMenuOpen ? "sb-show" : ""}`} ref={ref}>
            <div className={`aside-header ${isMenuOpen ? "" : "sb-hide"}`}>
                <NavLink to="/app" className="aside-logo">
                    <div className="pd-50">
                    <img
                        src="../assets/img/logo.svg"
                        className="img-fluid logo"
                        alt="logo"
                        srcSet
                    />
                    </div>
                </NavLink>
                <div className="aside-menu-link">
                    <FeatherIcon icon="menu" onClick={() => setIsMenuOpen(oldState => !oldState)}/>
                    <FeatherIcon icon="x" />
                </div>
            </div>
            <div className="aside-body">
                <ul className="nav nav-aside">
                    <li className="nav-item active">
                        <NavLink to="/app" className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'}>
                            <i className="fa fa-home mr-3" />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/app/campaigns" className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'}>
                            <i className="fa fa-archive mr-3" />
                            <span>Campaigns</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/app/billing" className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'}>
                        <i className="fas fa-money-bill mr-3" />
                        <span>Billing</span>
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/app/sender-id" className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'}>
                        <i className="fa fa-user mr-3 tx-muted" />
                        <span>Sender ID</span>
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/app/setting" className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'}>
                        <i className="fa fa-cog mr-3" />
                        <span>Settings</span>
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/app/analytics" className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'}>
                        <i className="fa fa-chart-bar mr-3" />{" "}
                        <span className="marine-active-menu">Analytics</span>
                    </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar
