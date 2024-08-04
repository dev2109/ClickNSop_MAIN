import React, { useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../redux/actions/productAction";
import { useAlert } from "react-alert";
import {} from "@material-ui/core";
import MetaData from "../layout/MetaData/MetaData";
// import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../redux/constants/productConstants";
import {  useNavigate } from "react-router-dom";
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
  Button,
  MenuItem,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    if (error) {
      alert.error(error);
      console.log(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    if (Stock < 0) {
      alert.error("Stock should be > 0");
    } else if (price < 0) {
      alert.error("Price should be >= 0");
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
      dispatch(createProduct(myForm));
    }
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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

  return (
    <>
      <MetaData title="Create Product" />
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
                onSubmit={createProductSubmitHandler}
              >
                <Box p={2}>
                  <Typography
                    variant="h4"
                    align="center"
                    color="primary.dark"
                    component="h4"
                  >
                    Create Product
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
                      size="small"
                      label="Product discription"
                      id="filled-start-adornment"
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
                      size="small"
                      id="outlined-select-currency"
                      select
                      defaultValue="SmartPhones"
                      label="Catagory"
                      onChange={(e) => setCategory(e.target.value)}
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
                    <FormControl size="small" fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Stock
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        required
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

                  <Box m={1}>
                    <Button
                      variant="outlined"
                      bgcolor="primary.action"
                      component="label"
                      fullWidth
                    >
                      Upload Product Images
                      <UploadFileIcon />
                      <input
                        hidden
                        accept="image/*"
                        onChange={createProductImagesChange}
                        multiple
                        name="avatar"
                        type="file"
                        outlined
                        ml={10}
                      />
                    </Button>
                  </Box>
                  <div id="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                      <img key={index} src={image} alt="Product Preview" />
                    ))}
                  </div>
                  <Box>
                    <Button
                      id="createProductBtn"
                      type="submit"
                      bgcolor="primary.light"
                      variant="contained"
                      disabled={loading ? true : false}
                      fullWidth
                      m={1}
                    >
                      Create Product
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default NewProduct;
