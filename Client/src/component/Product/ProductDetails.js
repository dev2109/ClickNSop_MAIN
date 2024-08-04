import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// or
import { Card, CardMedia } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
// import "./styles.css";
// import Carousel from "react-material-ui-carousel";
// import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../redux/actions/productAction";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import {
  Box,
  Rating,
  Typography,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import MetaData from "../layout/MetaData/MetaData";
import { addItemsToCart } from "../../redux/actions/cartActions";
import ReviewsIcon from "@mui/icons-material/Reviews";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  // styled,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../redux/constants/productConstants";

// const ChildWrapper = styled(Box)(({ theme }) => ({
//   padding: "3rem",
//   width: "50%",
//   display: "flex",
//   flexDirection: "column",
//   textTransform: "capitalize",
// }));

// const SubChildWrapper = styled(Box)({
//   width: "100%",
//   margin: "0.5rem 0",
//   // height: "auto",
//   // display: "flex",
//   // alignItems: "center",
//   textTransform: "capitalize",
//   textAlign: "center",
// });

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  // const pagination = {
  //   clickable: true,
  //   renderBullet: function (index, className) {
  //     return '<span class="' + className + '">' + (index + 1) + "</span>";
  //   },
  // };

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  // console.log(product);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { id } = useParams();
  // console.log(id);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { isAuthenticated } = useSelector((state) => state.user);

  const submitReviewToggle = () => {
    if (isAuthenticated === false) {
      alert.error("Cannot review product without login");
    } else {
      open ? setOpen(false) : setOpen(true);
    }
    // window.location.reload();
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    // console.log(myForm);
    dispatch(newReview(myForm));

    setOpen(false);
    window.location.reload();
  };

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id)); //url maathi id get kriiiii
  }, [dispatch, id, error, alert,reviewError, success]);

  var descString = product?.description;
  var descArray = descString?.split(",");

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} Details`} />
          <Box m={2}>
            <Typography align="center" variant="h4" components="h4">
              {`Product Details`}
            </Typography>
            <Divider sx={{ width: "20%", margin: "1rem auto" }} />
          </Box>
          <Box
            display={{ sm: "block", md: "flex", textTransform: "capitalize" }}
            // flexDirection={{ sm: "column", md: "row" }}
            //  sx={{ height: "100dvh" }}

            // sx={{ border: 1 }}
          >
            <Box
              sx={{
                width: { sm: "100%", md: "50%" },
                display: "flex",
                p: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Swiper
                Swiper
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {product.images &&
                  product.images.map((item, i) => {
                    return (
                      <SwiperSlide>
                        <Card>
                          <CardMedia
                            component="img"
                            alt="green iguana"
                            height="500"
                            image={item.url}
                            sx={{ objectFit: "contain" }}
                          />
                        </Card>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
              {/*  */}
            </Box>
            <Box
              sx={{
                width: { sm: "100%", md: "50%" },
              }}
            >
              <Box mt={4} sx={{ width: "100%", textAlign: "center" }}>
                <Typography variant="h4">{product.name}</Typography>
                <p>Product # {product._id}</p>
              </Box>

              <Box>
                <Box
                  mt={2}
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Rating {...options} />
                  <Typography align="center" variant="p" mt={0.5}>
                    ({product.numOfReviews} Reviews)
                  </Typography>
                </Box>
              </Box>

              <Box
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {`₹${product.price}`}
                </Typography>
                {/* <h1></h1> */}
                <Box>
                  <Box sx={{ margin: "0 auto" }}>
                    <Button
                      variant="contained"
                      borderredius={50}
                      onClick={decreaseQuantity}
                    >
                      -
                    </Button>
                    {/* <input readOnly type="number" value={quantity} /> */}
                    <TextField
                      sx={{
                        width: "4rem",
                        margin: "0 1rem 1rem 1rem ",
                        textAlign: "center",
                      }}
                      // sx={{  height: "1px" }}
                      size="small"
                      value={quantity}
                      InputProps={
                        {
                          // readOnly: true,
                        }
                      }
                    />
                    <Button variant="contained" onClick={increaseQuantity}>
                      +
                    </Button>
                  </Box>
                  <Button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                    variant="outlined"
                    sx={{ margin: "0 2rem" }}
                    endIcon={<ShoppingCartSharpIcon />}
                  >
                    Add to Cart
                  </Button>
                </Box>

                <Typography m={2} variant="p">
                  Status:
                  <Typography
                    variant="p"
                    sx={{ fontWeight: "bold" }}
                    color={product.Stock < 1 ? "red" : "green"}
                  >
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </Typography>
                </Typography>
              </Box>

              <Box m={2}>
                <Typography align="center" variant="p" component="p">
                  Description :
                </Typography>
                <Typography align="center" variant="p" component="p">
                  <ul>
                    {descArray &&
                      descArray.map((item) => {
                        return <li>{item}</li>;
                      })}
                  </ul>
                </Typography>
              </Box>
              <Box
                mt={2}
                mb={3}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={submitReviewToggle}
                  bgcolor="primary"
                  endIcon={<ReviewsIcon />}
                  variant="outlined"
                  sx={{ margin: "auto" }}
                >
                  Submit Review
                </Button>
              </Box>
            </Box>
          </Box>

          <Box mt={4}>
            <Typography mt={3} variant="h5" align="center">
              REVIEWS
            </Typography>

            <Divider sx={{ width: "20%", margin: "1rem auto" }} />
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <Box>
                <DialogTitle align="center">Submit Review</DialogTitle>
              </Box>
              <Box>
                <DialogContent>
                  <Box>
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    />
                  </Box>
                  <Box>
                    <textarea
                      className="submitDialogTextArea"
                      cols="30"
                      rows="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </Box>
                </DialogContent>
              </Box>
              <Box>
                <DialogActions>
                  <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>

            <Box m={4}>
              {" "}
              {product.reviews && product.reviews[0] ? (
                <Box
                  display="flex"
                  justifyContent="space-evenly"
                  flexWrap="wrap"
                  alignItems="center"
                  p={3}
                >
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard key={review._id} review={review} />
                    ))}
                </Box>
              ) : (
                <Typography align="center" variant="h5" component="h6">
                  No Reviews Yet
                </Typography>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductDetails;
