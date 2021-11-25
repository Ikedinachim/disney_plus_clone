import React, { Fragment, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { usePaystackPayment } from 'react-paystack'

import { useAlert} from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'

const PaymentTest = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { error } = useSelector(state => state.newOrder)

    const order ={
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    if(orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    console.log(user.email);

    const config = {
        reference: (new Date()).getTime(),
        email: user.email,
        amount: Math.round(orderInfo.totalPrice * 100),
        publicKey: 'pk_test_5c2603dc7401f2790572fd71f90b2a3f75af4dba',
    };

    // you can call this function anything
    const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    order.paymentInfo = {
        id: reference,
        status: 200
    }

    dispatch(createOrder(order))
    
    history.push('/success')

    console.log("working");
    console.log(reference);
    };

    // you can call this function anything
    const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
    }

    useEffect(() => {

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const submitHandler = (e) => {
        e.preventDefault();
    }

    const PaystackHook = () => {
        const initializePayment = usePaystackPayment(config);
        return (
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-4">Card Info</h1>
                    <button
                        id="pay_btn"
                        type="submit"
                        className="py-3 btn btn-block"
                        onClick={() => {
                            initializePayment(onSuccess, onClose)
                        }}
                        >
                        Pay
                    </button>
                </form>
            </div>
        );
    };

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <div className="row wrapper">
                        <PaystackHook />
                    </div>
                </div>
            </div>

      </Fragment>
    );
        
}
export default PaymentTest
