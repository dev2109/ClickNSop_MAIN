import React, { useState } from "react";
// import "./Shipping.css"
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../redux/actions/cartActions";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData/MetaData";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
// import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
// import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import CheckoutSteps from "./CheckoutSteps.js";
import { useNavigate } from "react-router-dom";
import {
  Box,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  // Paper,
  FormControl,
  TextField,
  MenuItem,
  Button,
  Typography,
  Divider,
} from "@mui/material";

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ width: { sm: "80%", md: "22rem" } }}>
          <Typography align="center" component="h5" variant="h5" color="gray">
            Shipping Details
          </Typography>
          <Divider />

          <form encType="multipart/form-data" onSubmit={shippingSubmit}>
            <Box mt={3}>
              <FormControl size="small" fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Address
                </InputLabel>
                <OutlinedInput
                  fullWidth={true}
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  }
                  label="Name"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl size="small" fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  City
                </InputLabel>
                <OutlinedInput
                  fullWidth={true}
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">
                      <LocationCityIcon />
                    </InputAdornment>
                  }
                  label="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl size="small" fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  PinCode
                </InputLabel>
                <OutlinedInput
                  fullWidth={true}
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">
                      <PinDropIcon />
                    </InputAdornment>
                  }
                  label="Pincode"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl size="small" fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Phone No
                </InputLabel>
                <OutlinedInput
                  fullWidth={true}
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  }
                  label="Phone No"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  size="10"
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <TextField
                required
                fullWidth
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                size="small"
                id="outlined-select-currency"
                select
                defaultValue="India"
              >
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <MenuItem key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Box>
            {country && (
              <Box mt={2}>
                <TextField
                  size="small"
                  id="outlined-select-currency"
                  select
                  defaultValue="SmartPhones"
                  label="State"
                  value={state}
                  fullWidth
                  onChange={(e) => setState(e.target.value)}
                >
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <MenuItem key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Box>
            )}
            <Box mt={2}>
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                disabled={state ? false : true}
              >
                Continue
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Shipping;
