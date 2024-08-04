import React from "react";
// import { BsMouse } from "react-icons/bs";
// import banner from "../../img/banner/b0.jpg"
import "../Home/home.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData/MetaData";
import { clearErrors, getProduct } from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Box, Divider, Typography } from "@mui/material";
import Slider from "./Slider";
// import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const Home = () => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title="ClickNShop" />
      {/* <div className="banner">
              <p className="hero-text">Welcom to E commerce</p>
              <a href="#container" className='scroll'>
                <button >
                  Scroll <BsMouse/>
                </button>
              </a>
            </div> */}

      {/* <div className="banner">
                <div className="banner-text">
                  <p>Welcome to GO-MART</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>
                    <a href="#container">
                      <button>
                        Scroll <BsMouse/>
                      </button>
                    </a>
                </div>
              </div> */}
      <Box sx={{ height: "60vh" }}>
        <Slider />
      </Box>
      
      <Box m={2} mt={10}>
            <Typography align="center" variant="h4" components="h4">
              {`Featured Product`}
            </Typography>
            <Divider sx={{ width: "20%", margin: "1rem auto" }} />
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
