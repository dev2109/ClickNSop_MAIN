import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../redux/actions/cartActions";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Cart = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const {  isAuthenticated } =
    useSelector((state) => state.user);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping");
    }
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <>
          <div className="emptyCart">
            <RemoveShoppingCartIcon />

            <Typography>No Product in Your Cart</Typography>
            <Link to="/products">View Products</Link>
          </div>
        </>
      ) : (
        <>
          <Container>
            <Box mt={2} sx={{ minHeight: "100vh" }}>
              <Typography
                align="center"
                color="primary.dark"
                component="h4"
                variant="h4"
              >
                Your Cart <ShoppingCartIcon />
              </Typography>
              <Divider />
              <Box display="flex" flexWrap="wrap" mt={2}>
                <Box
                  sx={{ width: { sm: "100%", md: "70%" }, p: { sm: 0, md: 2 } }}
                >
                  {cartItems &&
                    cartItems.map((item) => (
                      <Box
                        mt={2}
                        display="flex"
                        justifyContent="space-evenly"
                        alignItems="center"
                        key={item.product}
                        flexWrap="wrap"
                        sx={{ border: "1px solid gray", borderRadius: "1rem" }}
                      >
                        <CartItemCard
                          item={item}
                          deleteCartItems={deleteCartItems}
                        />
                        {/* {JSON.stringify(item)} */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            width: { sm: "100%", md: "33.33%" },
                            // alignItems: "center",
                          }}
                        >
                          <Box>
                            <IconButton
                              onClick={() =>
                                decreaseQuantity(item.product, item.quantity)
                              }
                              color="primary"
                              aria-label="Remove"
                            >
                              <RemoveCircleIcon fontSize="medium" />
                            </IconButton>
                            <TextField
                              size="small"
                              id="outlined-basic"
                              variant="outlined"
                              type="number"
                              value={item.quantity}
                              readOnly
                              sx={{ width: "3rem", textAlign: "Center" }}
                            />

                            {/* <AddCircleIcon /> */}
                            <IconButton
                              color="primary"
                              aria-label="Remove"
                              onClick={() =>
                                increaseQuantity(
                                  item.product,
                                  item.quantity,
                                  item.stock
                                )
                              }
                            >
                              <AddCircleIcon fontSize="medium" />
                            </IconButton>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            width: { sm: "100%", md: "33.33%" },
                            height: "auto",
                          }}
                        >
                          <Typography
                            align="center"
                            variant="p"
                            component="p"
                          >{`₹${item.price * item.quantity}`}</Typography>
                        </Box>
                      </Box>
                    ))}
                </Box>

                <Box
                  sx={{
                    width: { sm: "100%", md: "29%" },
                    borderLeft: { sm: "none", md: "1px solid gray" },
                    ml: { sm: 0, md: 1 },
                  }}
                  p={3}
                >
                  <Box ml={4} mt={3} sx={{ width: "100%" }}>
                    <Typography variant="h4" component="h4" align="center">
                      Gross Total
                    </Typography>
                    <Divider />
                    <Box
                      p={2}
                      sx={{
                        display: { sm: "block", md: "flex" },
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" component="h6" align="center">
                        Your Total Bill :
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h6"
                        align="center"
                      >{`₹${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}`}</Typography>
                    </Box>
                  </Box>
                  <Box ml={4} sx={{width:"100%"}}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={checkoutHandler}
                    >
                      Check Out
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default Cart;
