/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    
    // eslint-disable-next-line
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    
    return (

        <Fragment>
            {loading === false && (
                <Routes>
                    <Route 
                        {...rest}
                        render = {props => {
                            if(isAuthenticated === false) {
                                return <Navigate to="/login" />
                            }

                            if(isAdmin === true && user.role !== 'admin') {
                                return <Navigate to="/" />
                            }

                            return <Component {...props} />
                        }}
                    />
                </Routes>
            )}
        </Fragment>
    )
}

export default ProtectedRoute
