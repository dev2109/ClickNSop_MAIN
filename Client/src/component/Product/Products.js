import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../redux/actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData/MetaData";
import Pagination from "react-js-pagination";
// import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Box, Divider } from "@mui/material";
import Slider from "@mui/material/Slider";

const categories = [
  "laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [currentPage, setcurrentPage] = useState(1);
  const [Price, setPrice] = useState([0, 2500000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState("");

  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  // console.log("product"+keyword);

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, Price, category, ratings));
  }, [dispatch, alert, error, keyword, currentPage, Price, category, ratings]);
  // console.log(currentPage);
  let count = filteredProductsCount;

  return (
    <>
      <>
        <MetaData title="Products - ClickNShop" />

        <Box m={2}>
          <Typography align="center" variant="h4" components="h4">
            {`Products`}
          </Typography>
          <Divider sx={{ width: "20%", margin: "1rem auto" }} />
        </Box>

        <Box
          sx={{
            display: { sm: "block", md: "flex" },
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: { sm: "100%", md: "20%" },
              // backgroundColor: "primary.dark",
              padding: "2rem",
              boxSizing: "border-box",
            }}
          >
            <Typography>Price</Typography>
            <Slider
              value={Price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-label="Default"
              className="MuiSlider-valueLabel"
              aria-labelledby="range-slider"
              min={0}
              max={2500000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </Box>

          {loading ? (
            <Box
              sx={{
                // backgroundColor: "primary.main",
                display: "flex",
                justifyContent: "center",
                margin: "auto 0",
                width: "80%",

                // backgroundColor:"red",

                // justifyContent: "space-between",
                // alignContent: "space-between",
                // margin:"100px 400px",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <Box
              sx={{
                // backgroundColor: "primary.main",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                // bgcolor: "red",
                maxWidth: { sm: "100%", md: "80%" },
              }}
            >
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </Box>
          )}
        </Box>

        {/* if result per page product count thi ochuu che */}
        {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
      </>
    </>
  );
};

export default Products;
