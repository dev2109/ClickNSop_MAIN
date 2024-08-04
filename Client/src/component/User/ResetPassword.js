import React, { useEffect, useState } from "react";
// import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import LockIcon from "@mui/icons-material/Lock";
import MetaData from "../layout/MetaData/MetaData";
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

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showCPassword, setShowCPassword] = React.useState(false);

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowCPassword = () => setShowCPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();

  const { token } = useParams();
  // console.log(id);

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    // console.log(myForm);

    dispatch(resetPassword(token, { password, confirmPassword }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Reset Password" />
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
                  Reset Password
                </Typography>
                <Divider />
                <form
                  className="resetPasswordForm"
                  onSubmit={resetPasswordSubmit}
                >
                  <Box mt={2}>
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
                              {showNewPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="New Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box mt={3}>
                    <FormControl size="small" fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        ConfirmPassword
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
                              {showCPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="ConfirmPassword"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </FormControl>
                  </Box>

                  <Box mt={3}>
                    <Button fullWidth variant="contained" type="submit">
                      Update
                    </Button>
                  </Box>
                </form>
              </Box>
            </Paper>
          </Box>
        </>
      )}
    </>
  );
};

export default ResetPassword;
