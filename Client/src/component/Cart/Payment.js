import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./Payment.css";
import MetaData from "../layout/MetaData/MetaData";
import CheckoutSteps from "./CheckoutSteps.js";
import { useAlert } from "react-alert";
import axios from "axios";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import logo from "../../images/logo2.png"
import {
  CardNumberElement, //aa use krvaa maate app ma elments & loadstripe import krvu pdseeeeeee
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { clearErrors, createOrder } from "../../redux/actions/orderAction";
import { Box, Divider } from "@mui/material";

// https://stripe.com/docs/testing

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <Box className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography component="h4" variant="h4" align="center">
            Card Info
          </Typography>
          <Divider/>
          <Box>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </Box>
          <Box>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </Box>
          <Box>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </Box>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </Box>
    </>
  );
};

export default Payment;


// import React, { useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Typography } from "@material-ui/core";
// import "./Payment.css";
// import MetaData from "../layout/MetaData/MetaData";
// import CheckoutSteps from "./CheckoutSteps.js";
// import { useAlert } from "react-alert";
// import axios from "axios";
// import { clearErrors, createOrder } from "../../redux/actions/orderAction";
// import { Box, Divider } from "@mui/material";

// const Payment = () => {
//   const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

//   const dispatch = useDispatch();
//   const alert = useAlert();
//   const payBtn = useRef(null);
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.user);
//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   const { error } = useSelector((state) => state.newOrder);

//   const paymentData = {
//     amount: Math.round(orderInfo.totalPrice * 100),
//   };

//   const order = {
//     shippingInfo,
//     orderItems: cartItems,
//     itemsPrice: orderInfo.subtotal,
//     taxPrice: orderInfo.tax,
//     shippingPrice: orderInfo.shippingCharges,
//     totalPrice: orderInfo.totalPrice,
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     payBtn.current.disabled = true;

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const { data } = await axios.post(
//         "/api/v1/payment/process",
//         paymentData,
//         config
//       );

//       const options = {
//         key: data.order.key_id,
//         amount: data.order.amount,
//         currency: data.order.currency,
//         name: "Ecommerce",
//         description: "Test Transaction",
//         image: "/logo.png",
//         order_id: data.order.id,
//         handler: async function (response) {
//           const result = await axios.post("/api/v1/payment/verify", {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//           });

//           if (result.data.success) {
//             order.paymentInfo = {
//               id: response.razorpay_payment_id,
//               status: "succeeded",
//             };

//             dispatch(createOrder(order));

//             navigate("/success");
//           } else {
//             alert.error("Payment failed");
//             payBtn.current.disabled = false;
//           }
//         },
//         prefill: {
//           name: user.name,
//           email: user.email,
//           contact: "9999999999",
//         },
//         notes: {
//           address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.on("payment.failed", function (response) {
//         alert.error(response.error.description);
//         payBtn.current.disabled = false;
//       });

//       rzp1.open();
//     } catch (error) {
//       payBtn.current.disabled = false;
//       alert.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//   }, [dispatch, error, alert]);

//   return (
//     <>
//       <MetaData title="Payment" />
//       <CheckoutSteps activeStep={2} />
//       <Box className="paymentContainer">
//         <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
//           <Typography component="h4" variant="h4" align="center">
//             Card Info
//           </Typography>
//           <Divider />
//           <input
//             type="submit"
//             value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
//             ref={payBtn}
//             className="paymentFormBtn"
//           />
//         </form>
//       </Box>
//     </>
//   );
// };

// export default Payment;
