import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
// import "./ConfirmOrder.css";
import MetaData from "../layout/MetaData/MetaData";
import CheckoutSteps from "./CheckoutSteps.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Button, Divider, styled } from "@mui/material";

const ChildWrapper = styled(Box)({
  display: "flex",
  margin: "1rem",
  gap: "1rem",
});

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <Box
        sx={{
          display: { sm: "block", md: "flex" },
          minHeight: "75vh",
          justifyContent: "center",
        }}
      >
        <Box p={3} sx={{ width: { sm: "100%", md: "65%" } }}>
          <Box className="confirmshippingArea">
            <Typography component="h5" variant="h5" color="gray">
              Shipping Info
            </Typography>
            <Divider />
            <Box className="confirmshippingAreaBox">
              <ChildWrapper>
                <Typography variant="p" component="p">
                  Name:{" "}
                </Typography>
                <Typography>{user.name}</Typography>
              </ChildWrapper>
              <ChildWrapper>
                <Typography variant="p" component="p">
                  Phone:{" "}
                </Typography>
                <Typography>{shippingInfo.phoneNo}</Typography>
              </ChildWrapper>
              <ChildWrapper>
                <Typography variant="p" component="p">
                  Address:{" "}
                </Typography>
                <Typography>{address}</Typography>
              </ChildWrapper>
            </Box>
          </Box>
          <Box className="confirmCartItems">
            <Typography component="h5" variant="h5" color="gray">
              Your Cart Items:
            </Typography>
            <Divider />
            <Box
              sx={{ transitionDuration: "2" }}
              mt={2}
              display="flex"
              flexWrap="wrap"
            >
              {cartItems &&
                cartItems.map((item) => (
                  <Box
                    key={item.product}
                    sx={{
                      width: "100%",
                      border: "1px solid gray",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "1rem",
                      margin: "1px 0",
                      "&:hover": {
                        backgroundColor: "#d1d1d1",
                      },
                    }}
                  >
                    <img
                      height="100"
                      width="100 "
                      src={item.image}
                      alt="Product"
                      style={{
                        borderRadius: "1rem",
                      }}
                    />
                    <Box ml={2} sx={{ textTransform: "capitalize" }}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <Typography ml={3} component="body1" variant="body1">
                        {item.quantity} X ₹{item.price} =
                        <b>₹{item.price * item.quantity}</b>
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>

        {/*  */}
        <Box
          sx={{
            width: { sm: "100%", md: "35%" },
            borderLeft: "1px solid gray",
          }}
        >
          <Box
            sx={{ padding: { sm: "1rem", md: "2rem 4rem 2rem 4rem " } }}
            className="orderSummary"
          >
            <Typography align="center" component="h5" variant="h5" color="gray">
              Order Summery
            </Typography>
            <Divider />
            <Box>
              <ChildWrapper>
                <Typography variant="p" component="p">
                  Subtotal:
                </Typography>
                <Box sx={{ marginLeft: "auto" }}>
                  <Typography>₹{subtotal}</Typography>
                </Box>
              </ChildWrapper>
              <ChildWrapper>
                <Typography variant="p" component="p">
                  Shipping Charges:
                </Typography>
                <Box sx={{ marginLeft: "auto" }}>
                  <Typography>₹{shippingCharges}</Typography>
                </Box>
              </ChildWrapper>
              <ChildWrapper>
                <Typography variant="p" component="p">
                  GST:{" "}
                </Typography>
                <Box sx={{ marginLeft: "auto" }}>
                  <Typography>₹{tax}</Typography>
                </Box>
              </ChildWrapper>
            </Box>

            <Box>
              <Typography
                align="center"
                component="h6"
                variant="h6"
                color="gray"
              >
                <b>Total:</b>
              </Typography>
              <Divider />
              <Box m={2}>
                <Typography align="center">₹{totalPrice}</Typography>
              </Box>
            </Box>
            <Box
              sx={{ p: 1, display: "flex", mt: 3, justifyContent: "center" }}
            >
              <Button onClick={proceedToPayment} fullWidth variant="outlined">
                Proceed To Payment
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ConfirmOrder;
