// import { configureStore } from '@reduxjs/toolkit'
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducers,
  productReducer,
  productReducers,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducers";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducers,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  
  cart: cartReducer,

  newOrder:newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  
  
  newProduct: newProductReducer,
  product: productReducer,
  
  
  newReview : newReviewReducer,
  
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,

  productReviews: productReviewsReducer,
  review: reviewReducer,

  

});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

      shippingInfo:localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// import { configureStore } from '@reduxjs/toolkit'
// import { combineReducers } from 'redux'
// const reducer = combineReducers({
//   // here we will be adding reducers
// })
// const store = configureStore({
//   reducer,
// })
// export default store;

//https://www.softkraft.co/how-to-setup-redux-with-redux-toolkit/
