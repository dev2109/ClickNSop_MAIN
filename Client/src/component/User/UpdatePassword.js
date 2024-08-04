import React , {useEffect, useState}from 'react'
// import './UpdatePassword.css';
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
// import VpnKeyIcon from '@mui/icons-material/VpnKey';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import LockIcon from '@mui/icons-material/Lock';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors , updatePassword } from '../../redux/actions/userAction';
import {  useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from '../../redux/constants/userConstants';
import MetaData from '../layout/MetaData/MetaData';
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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

const UpdatePassword = () => {


  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showCPassword, setShowCPassword] = React.useState(false);

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowCPassword = () => setShowCPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  

    const dispatch = useDispatch();
    const alert = useAlert();
  
    const navigate = useNavigate();
  
 
    const { isUpdated ,loading , error} = useSelector(
      (state) => state.profile
    );



    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const updatePasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(updatePassword(myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("Profile Updated Successfully");
  
        navigate("/profile");
  
        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
    }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <>
        {loading ? (
        <Loader />
      ) : (
        <>
     <MetaData title="Update Password" />

<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80dvh",
  }}
>
  <Paper elevation="12">
    <Box sx={{ width: { sm: "100%", md: "25rem" } }} p={3}>
      <Typography
        mt={1}
        mb={1}
        variant="h4"
        align="center"
        color="primary.dark"
        component="h4"
      >
        Update Password
      </Typography>
      <Divider variant="middle" />
      <form onSubmit={updatePasswordSubmit}>
        <Box mt={3}>
          <FormControl size="small" fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Old Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showOldPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {oldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label=" Old Password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl size="small" fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              New Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showNewPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {newPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box mt={3}>
          <FormControl size="small" fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm New Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showCPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowCPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {confirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm New Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box mt={3}>
          <Button fullWidth variant="contained" type="submit">
            Change
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

export default UpdatePassword