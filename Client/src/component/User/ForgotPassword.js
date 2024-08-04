import React , {useEffect, useState}from 'react'
// import './ForgotPassword.css';
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors , forgotPassword } from '../../redux/actions/userAction';
// import {  useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData/MetaData';
import {
  InputAdornment,
  Box,
  Divider,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
  FormControl,
  Button,
} from "@mui/material";



const ForgotPassword = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
  
    // const navigate = useNavigate();
  
 
    const { message ,loading , error} = useSelector(
      (state) => state.forgotPassword
    );

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("email", email);
      dispatch(forgotPassword(myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (message) {
        alert.success(message);
      }
    }, [dispatch, error, alert, message]);


    return (
    <>
    {loading ? (
        <Loader />
      ) : (
        <>
    <MetaData title="Forgot Password" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80dvh",
            }}
          >
            <Paper elevation="12">
              <Box>
                <Typography
                  mt={1}
                  mb={1}
                  variant="h5"
                  align="center"
                  color="primary.dark"
                  component="h5"
                  sx={{ width: { sm: "100%", md: "25rem" } }}
                >
                  Forgot Password
                </Typography>
                <Divider variant="middle" />
                <form onSubmit={forgotPasswordSubmit}>
                  <Box p={2}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Enter Your Email
                      </InputLabel>
                      <OutlinedInput
                        type="email"
                        id="outlined-adornment-amount"
                        startAdornment={
                          <InputAdornment position="start">
                            <EmailOutlinedIcon />
                          </InputAdornment>
                        }
                        label="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>{" "}
                  </Box>
                  <Box p={1} mb={2}>
                    <Button fullWidth variant="contained" type="submit">
                      Send
                    </Button>
                  </Box>
                </form>
              </Box>
            </Paper>
          </Box>
        </>
      )}
    </>
  )
}

export default ForgotPassword