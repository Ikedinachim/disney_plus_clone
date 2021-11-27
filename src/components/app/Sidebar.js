import React from 'react'
import { Link, BrowserRouter  } from 'react-router-dom'

const Sidebar = () => {
    return (
        // <div className="sidebar-wrapper">
        //     <nav id="sidebar">
        //         <ul className="list-unstyled components">
        //             <li>
        //             <BrowserRouter>
        //                 <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
        //             </BrowserRouter>
        //             </li>
        
        //             <li>
        //                 <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
        //                     <i className="fa fa-product-hunt"></i> 
        //                     Products
        //                 </a>
        //                 <ul className="collapse list-unstyled" id="productSubmenu">
        //                     <li>
        //                         <BrowserRouter>
        //                             <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
        //                         </BrowserRouter>
        //                     </li>
            
        //                     <li>
        //                     <BrowserRouter>
        //                         <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
        //                     </BrowserRouter>
        //                     </li>
        //                 </ul>
        //             </li>

        //             <li>
        //                 <BrowserRouter>
        //                 <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
        //                 </BrowserRouter>
        //             </li>

        //             <li>
        //                 <BrowserRouter>
        //                 <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
        //                 </BrowserRouter>
        //             </li>

        //             <li>
        //                 <BrowserRouter>
        //                 <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
        //                 </BrowserRouter>
        //             </li>
            
        //         </ul>
        //     </nav>
        // </div>
        <aside className="aside aside-fixed">
            <div className="aside-header">
            <Link to="/" className="aside-logo">
                <div className="pd-50">
                <img
                    src="./assets/img/logo.svg"
                    className="img-fluid logo"
                    alt="logo"
                    srcSet
                />
                </div>
            </Link>
            <a href="true" className="aside-menu-link">
                <i data-feather="menu" />
                <i data-feather="x" />
            </a>
            </div>
            <div className="aside-body">
            <ul className="nav nav-aside">
                <li className="nav-item active">
                    <Link to="campaign" className="nav-link">
                        <i className="fa fa-archive mr-3" />
                        <span>Campaigns</span>
                    </Link>
                </li>
                <li className="nav-item">
                <Link to="billing" className="nav-link">
                    <i className="fas fa-money-bill mr-3" />
                    <span>Billing</span>
                </Link>
                </li>
                <li className="nav-item">
                <Link to="sender" className="nav-link">
                    <i className="fa fa-user mr-3 tx-muted" />
                    <span>Sender ID</span>
                </Link>
                </li>
                <li className="nav-item">
                <Link to="setting" className="nav-link">
                    <i className="fa fa-cog mr-3" />
                    <span>Settings</span>
                </Link>
                </li>
                <li className="nav-item">
                <Link to="analytics" className="nav-link">
                    <i className="fa fa-chart-bar mr-3" />{" "}
                    <span className="marine-active-menu">Analytics</span>
                </Link>
                </li>
            </ul>
            </div>
        </aside>
    )
}

export default Sidebar
