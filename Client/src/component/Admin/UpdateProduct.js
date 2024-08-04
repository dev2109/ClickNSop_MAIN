import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../redux/actions/productAction";
import { useAlert } from "react-alert";
// import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData/MetaData";
// import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { UPDATE_PRODUCT_RESET } from "../../redux/constants/productConstants";
import {useNavigate,useParams} from "react-router-dom";
import {
  InputAdornment,
  Box,
  Divider,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
  FormControl,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";


const UpdateProduct = () => {


    const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();


  const { error, product } = useSelector((state) => state.productDetails);

   const { id } = useParams();


  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();


    if (Stock < 0) {
      alert.error("Stock should not be Negative");
    } else if (price < 0) {
      alert.error("Price should be Greater than or equal to 0");
    } else {




    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));

  }
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const [open, setOpen] = useState(false);

  return (


    <>

<MetaData title="Update Product" />

<Box>
  <SideBar open={open} setOpen={setOpen} />
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mt: 9,
    }}
  >
    <Paper elevation="12">
      <Box p={3} sx={{ width: "30rem", overflow: "hidden" }}>
        <form
          encType="multipart/form-data"
          onSubmit={updateProductSubmitHandler}
        >
          <Box p={2}>
            <Typography
              variant="h4"
              align="center"
              color="primary.dark"
              component="h4"
            >
              Update Product
            </Typography>
            <Divider variant="middle" />
            <Box sx={{ width: "100%", mt: 3 }}>
              <FormControl size="small" fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Name
                </InputLabel>
                <OutlinedInput
                  fullWidth={true}
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">
                      <SpellcheckIcon />
                    </InputAdornment>
                  }
                  label="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl size="small" fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Price
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  }
                  type="number"
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <TextField
                label="Product discription"
                id="filled-start-adornment"
                size="small"
                sx={{ m: 1 }}
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                multiline
                fullWidth
              />
            </Box>
            <Box m={1}>
              <TextField
                id="outlined-select-currency"
                size="small"
                select
                defaultValue="SmartPhones"
                label="Catagory"
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                sx={{ width: "104%", margin: "0 auto" }}
              >
                {categories.map((cate) => (
                  <MenuItem key={cate} value={cate}>
                    {cate}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box>
              <FormControl fullWidth sx={{ m: 1 }} size="small">
                <InputLabel htmlFor="outlined-adornment-amount">
                  Stock
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  required
                  value={Stock}
                  onChange={(e) => setStock(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <StorageIcon />
                    </InputAdornment>
                  }
                  label=" Total Stock"
                />
              </FormControl>
            </Box>

            <Box sx={{ width: "100%" }} m={1}>
              <Button
                variant="outlined"
                bgcolor="primary"
                component="label"
                fullWidth
                sx
              >
                Upload Product Images
                <UploadFileIcon />
                <input
                  hidden
                  accept="image/*"
                  onChange={updateProductImagesChange}
                  multiple
                  name="avatar"
                  type="file"
                  outlined
                  ml={10}
                />
              </Button>
            </Box>
            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt="Old Product Preview"
                  />
                ))}
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <Box m={1}>
              <Button
                id="createProductBtn"
                type="submit"
                variant="contained"
                disabled={loading ? true : false}
                fullWidth
              >
                Update Product
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Paper>
  </Box>
</Box>
    </>
  )
}

export default UpdateProduct