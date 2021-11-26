import React from 'react'
import { Link, BrowserRouter  } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                    <BrowserRouter>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </BrowserRouter>
                    </li>
        
                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                            <i className="fa fa-product-hunt"></i> 
                            Products
                        </a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <BrowserRouter>
                                    <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
                                </BrowserRouter>
                            </li>
            
                            <li>
                            <BrowserRouter>
                                <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
                            </BrowserRouter>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <BrowserRouter>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                        </BrowserRouter>
                    </li>

                    <li>
                        <BrowserRouter>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                        </BrowserRouter>
                    </li>

                    <li>
                        <BrowserRouter>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                        </BrowserRouter>
                    </li>
            
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
