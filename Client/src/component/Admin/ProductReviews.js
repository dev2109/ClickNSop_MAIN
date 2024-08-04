import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../redux/actions/productAction";
import { useAlert } from "react-alert";
import {
  Box,
  // Container,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  Typography,
  Divider,
  // Paper,
} from "@mui/material";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
// import Star from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../redux/constants/productConstants";
import StarPurple500RoundedIcon from "@mui/icons-material/StarPurple500Rounded";
// import Star from "@mui/icons-material/Star";

const ProductReviews = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const alert = useAlert();

  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID",
    minWidth: 200,
    flex: 0.5,
    headerAlign: "center",
    align: "center"
  },

    {
      field: "user",
      headerName: "User",
     minWidth: 150,
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "comment",
      headerName: "Comment",
       minWidth: 350,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
       minWidth: 270,
      flex: 0.5,
      headerAlign: "center",
      align: "center",

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <Box sx={{ minHeight: "100vh" }}>
        <SideBar open={open} setOpen={setOpen} />
        
        <Box
          mt={10}
          sx={{
            display: "flex ",
            alignItems: "center",
            flexDirection: "column",
          
          }}
        >
          <Box
            p={5}
            sx={{
              border: "1px solid gray",
              borderRadius: "1rem",
              // height: "16rem",
              maxHeight: "16rem",
              width: { sm: "80%", md: "35%" },
              margin: "1rem 0",
            }}
          >
            <form
              // className="productReviewsForm"
              onSubmit={productReviewsSubmitHandler}
            >
              <Typography
                variant="h4"
                align="center"
                color="primary.dark"
                component="h4"
              >
                ALL REVIEWS
              </Typography>
              <Divider variant="middle" />
              <Box mt={5}>
                <FormControl fullWidth variant="filled">
                  <InputLabel htmlFor="filled-adornment-amount">
                    Enter Product Id
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">
                        <StarPurple500RoundedIcon />
                      </InputAdornment>
                    }
                    value={productId}
                    required
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box mt={3}>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  disabled={
                    loading ? true : false || productId === "" ? true : false
                  }
                  bgcolor="primary"
                >
                  Search
                </Button>
              </Box>
            </form>
          </Box>

          {/* <Container maxWidth="lg"> */}
            {reviews && reviews.length > 0 ? (
              <Box pl={6} pr={6}  sx={{ height: "100dvh", width: "100%" }}>
                     <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
              </Box>
            ) : (
              <Typography align="center" component="h4" variant="h4">
                No Reviews Found
              </Typography>
            )}
          {/* </Container> */}
        </Box>
      </Box>
    </>
  );
};

export default ProductReviews;
