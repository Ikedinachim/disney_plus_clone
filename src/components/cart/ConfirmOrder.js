import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useSelector } from 'react-redux'

const ConfirmOrder = ({ history }) => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    // Calculate Order  Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    // console.log(itemsPrice);

    const proceedToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/payment')
    }

    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />

            <CheckoutSteps shipping confirmOrder />

            <div className="row d-flex justify-content-between">
                <div className="mt-5 col-12 col-lg-8 order-confirm">

                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>
                    
                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {cartItems && cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div key={item.product} className="my-1 cart-item">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="mt-4 col-4 col-lg-4 mt-lg-0">
                                        <p>
                                            {item.quantity} x <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} /> = <b><NumberFormat value={item.quantity * item.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></b>
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}

                </div>
                
                <div className="my-4 col-12 col-lg-3">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  
                            <span className="order-summary-values">
                                <NumberFormat value={itemsPrice} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                            </span>
                        </p>
                        <p>Shipping: 
                            <span className="order-summary-values">
                                <NumberFormat value={shippingPrice} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                            </span>
                        </p>
                        <p>Tax:  
                            <span className="order-summary-values">
                                <NumberFormat value={taxPrice} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                            </span>
                        </p>

                        <hr />

                        <p>Total: 
                            <span className="order-summary-values">
                                <NumberFormat value={totalPrice} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                            </span>
                        </p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={proceedToPayment}>Proceed to Payment</button>
                    </div>
                </div>
                
            </div>
        </Fragment>
    )
}

export default ConfirmOrder
