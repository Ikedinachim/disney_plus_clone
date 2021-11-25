import React, { Fragment, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useAlert} from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'

const Payment2 = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart)

    useEffect(() => {

    }, [])

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const paymentData = {
        email: user.email,
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        document.querySelector('#pay_btn').disabled = true;

        let res;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
            
            const res = await axios.post('/api/v1/payment/process', paymentData, config)
            const {data} = res
            console.log(data)
            return <iframe src={data.url} sandbox='allow-forms allow-scripts' />


            // const clientSecret = res.data.authorization_url

            // if(!paystack) {
            //     return;
            // }

            // const result = await res.data.authorization_url

        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.data)
            console.log(error);
            return;
        }

    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        <button
                            id="pay_btn"
                            type="submit"
                            className="py-3 btn btn-block"
                            >
                            Pay
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Payment2
