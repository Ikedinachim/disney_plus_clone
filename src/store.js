import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, newProductReducer, productDetailsReducer, productReducer, newReviewReducer, productReviewsReducer, reviewReducer } from './reducers/productReducers'
import { authReducer, userReducer, allUsersReducer, forgotPasswordReducer, userDetailsReducer } from './reducers/authReducers'
import { cartReducer } from './reducers/cartReducers'
import { senderIDReducer, createSenderIdReducer } from './reducers/senderIDReducers'
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
    newReview: newReviewReducer,
    senderID: senderIDReducer,
    createSenderId: createSenderIdReducer,
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middleWare = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store