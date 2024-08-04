import React, {  useEffect, useState } from "react";
import MetaData from "../layout/MetaData/MetaData";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../redux/actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
// import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../redux/constants/orderConstant";
import "./ProcessOrder.css";
import { Link ,useParams} from "react-router-dom";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ChildWrapper = styled(Box)({
  display: "flex",
  margin: "1rem",
});


const ProcessOrder = () => {

    // const navigate = useNavigate();
  
  const { id } = useParams();

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const [open, setOpen] = useState(false);

  
    const updateOrderSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("status", status);
  
      dispatch(updateOrder(id, myForm));
    };
  
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const [status, setStatus] = useState("");
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
      }
      if (isUpdated) {
        alert.success("Order Updated Successfully");
        dispatch({ type: UPDATE_ORDER_RESET });
      }
  
      dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);
  


  return (
    <>
    <MetaData title="Process Order" />
      <Box>
        <SideBar open={open} setOpen={setOpen} />
        <Box>
          {loading ? (
            <Loader />
          ) : (
            <Box
              sx={{
                display: order.orderStatus === "Delivered" ? "block" : "flex",
              }}
              mt={8}
            >
              <Box sx={{ width: { sm: "100%", md: "50%" } }}>
                <Box p={3}>
                  <Typography component="h5" variant="h5" color="gray">
                    Shipping Info
                  </Typography>
                  <Box mt={3}>
                    <ChildWrapper>
                      <Typography variant="p" component="p">
                        Name:
                      </Typography>
                      <Typography>{order.user && order.user.name}</Typography>
                    </ChildWrapper>
                    <ChildWrapper>
                      <Typography variant="p" component="p">
                        Phone:
                      </Typography>
                      <Typography>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </Typography>
                    </ChildWrapper>
                    <ChildWrapper>
                      <Typography variant="p" component="p">
                        Address:
                      </Typography>
                      <Typography>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </Typography>
                    </ChildWrapper>
                  </Box>

                  <Typography component="h5" variant="h5" color="gray">
                    Payment
                  </Typography>
                  <Box>
                    <ChildWrapper>
                      <Typography
                        variant="p"
                        component="p"
                        sx={{ fontWeight: "bold", fontSize: "1rem" }}
                        color={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "green"
                            : "red"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </Typography>
                    </ChildWrapper>

                    <ChildWrapper>
                      <Typography variant="p" component="p">
                        Amount:
                      </Typography>
                      <Typography variant="p" component="p" ml={2}>
                        {order.totalPrice && order.totalPrice}
                      </Typography>
                    </ChildWrapper>
                  </Box>
                  <Typography component="h5" variant="h5" color="gray">
                    Status
                  </Typography>
                  <Box>
                    <ChildWrapper>
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "1rem" }}
                        variant="p"
                        component="p"
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </Typography>
                    </ChildWrapper>
                  </Box>
                </Box>
                <Box p={2}>
                  <Typography component="h5" variant="h5" color="gray">
                    Your Cart Items:
                  </Typography>
                  <Box
                    sx={{ transitionDuration: "2" }}
                    mt={2}
                    display="flex"
                    flexWrap="wrap"
                  >
                    {order.orderItems &&
                      order.orderItems.map((item) => (
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
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                            <Typography
                              ml={3}
                              component="body1"
                              variant="body1"
                            >
                              {item.quantity} X ₹{item.price} ={" "}
                              <b>₹{item.price * item.quantity}</b>
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Box>
              {/* //! second Box */}
              <Box
                sx={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                  width: { sm: "100%", md: "50%" },
                  p: 2,
                }}
              >
                <form onSubmit={updateOrderSubmitHandler}>
                  <Typography component="h5" variant="h5" color="gray">
                    Process Order
                  </Typography>

                  <Box>
                    <FormControl m={3} sx={{ width: "50%" }}>
                      <InputLabel id="demo-simple-select-label">
                        Process Order
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Process Order"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {order.orderStatus === "Processing" && (
                          <MenuItem p={1} value="Shipped">
                            Shipped
                          </MenuItem>
                        )}

                        {order.orderStatus === "Shipped" && (
                          <MenuItem p={1} value="Delivered">
                            Delivered
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Box>

                  <Button
                    variant="outlined"
                    sx={{ width: "50%", mt: 1 }}
                    id="createProductBtn"
                    bgcolor="primary.dark"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}

export default ProcessOrder