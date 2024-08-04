import React, { useEffect, useRef, useState } from "react";
// import "./LoginSignup.css";
import Loader from "../layout/Loader/Loader";
import { Link, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { LoadingButton, TabPanel, TabList, TabContext } from "@mui/lab";
// import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import InputLabel from "@mui/material/InputLabel";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import OutlinedInput from "@mui/material/OutlinedInput";

// https://mui.com/material-ui/material-icons/

const LoginSignup = () => {
  const [Loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }
  const [showPassword, setShowPassword] = React.useState(false);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated, login_succ, register_succ } =
    useSelector((state) => state.user);

  // console.log({ login_succ });
  // console.log(JSON.stringify(login_succ));

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  // const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    // alert.success(JSON.stringify(login_succ));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect =
    location.search === "?redirect=shipping" ? "/shipping" : "/profile";

  // console.log(location.pathname); // /login
  // console.log(location.search);  // ?redirect=shipping
  // console.log("splitt   " + location.search.split("=")[1]);  // ?redirect=shipping
  // console.log(location);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
      // console.log("redirect  " +redirect)

      if (login_succ) {
        // const msg = JSON.stringify(login_succ);
        const msg = login_succ;
        // console.log(msg);
        alert.success(msg);
      }
      if (register_succ) {
        // const msg = JSON.stringify(login_succ);
        const msg = register_succ;
        // console.log(msg);
        alert.success(msg);
      }
    }
  }, [
    dispatch,
    error,
    alert,
    navigate,
    register_succ,
    login_succ,
    isAuthenticated,
    redirect,
  ]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          // sx={{
          //   display: "flex",
          //   justifyContent: "center",
          //   maxWidth: "100%",
          //   height: "80vh",
          // }}

          display="flex"
          sx={{ height: "100vh" }}
          justifyContent="center"
          alignItems="center"
        >
          <Paper
            // sx={{ margin: "auto", typography: "body1" }}
            elevation={12}
          >
            <Box
              //  sx={{ width: "25rem", height: "25rem" }}
              //  bgcolor="red"
              sx={{ typography: "body1", width: "23rem", height: "28rem" }}
            >
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    variant="fullWidth"
                  >
                    <Tab label="Login" value="1" />
                    <Tab label="Register" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <form
                    // className="loginForm"
                    ref={loginTab}
                    onSubmit={loginSubmit}
                  >
                    <Box
                      // sx={{ margin: "0.5rem 0" }}
                      mt={4}
                    >
                      {/* <EmailOutlinedIcon /> */}

                      <TextField
                        fullWidth
                        id="standard-basic"
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                      {/* <Box  mt={4}>
                        <TextField
                      fullWidth
                      id="standard-basic"
                      variant="outlined"
                      required
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                              />
                        </Box> */}
                      <Box
                        // sx={{ margin: "0.5rem 0" }}
                        mt={4}
                      >
                        <FormControl sx={{ width: "100%" }} variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => handleClickShowPassword()}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                    <Link to="/password/forgot">Forget Password ?</Link>
                    {/* <input type="submit" value="Login" className="loginBtn" /> */}
                    <Box
                      // sx={{ margin: "2rem 0" }}
                      mt={8}
                    >
                      <LoadingButton
                        type="submit"
                        fullWidth
                        onClick={handleClick}
                        endIcon={<LoginIcon />}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                      >
                        <span>Login </span>
                      </LoadingButton>
                    </Box>
                  </form>
                </TabPanel>
                <TabPanel value="2">
                  <form
                    className="signUpForm"
                    ref={registerTab}
                    encType="multipart/form-data"
                    onSubmit={registerSubmit}
                  >
                    <Box
                      // sx={{ margin: "0.5rem 0" }}
                      mt={2}
                    >
                      {/* <AccountBoxIcon /> */}

                      <TextField
                        fullWidth
                        id="standard-basic"
                        label="Your Name"
                        type="text"
                        variant="outlined"
                        required
                        name="name"
                        value={name}
                        onChange={registerDataChange}
                      />
                    </Box>
                    <Box
                      // sx={{ margin: "0.5rem 0" }}
                      mt={2}
                    >
                      {/* <EmailOutlinedIcon /> */}
                      <TextField
                        fullWidth
                        id="standard-basic"
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                        name="email"
                        value={email}
                        onChange={registerDataChange}
                      />
                    </Box>
                    <Box
                      //  sx={{ margin: "0.5rem 0" }}
                      mt={2}
                    >
                      {/* <LockOpenIcon /> */}

                      <FormControl sx={{ width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          name="password"
                          label="Password"
                          value={password}
                          onChange={registerDataChange}
                        />
                      </FormControl>
                    </Box>

                    <Box
                      // sx={{ margin: "0.8rem 0" }}
                      mt={2}
                      mb={3}
                      display="flex"
                    >
                      <Avatar
                        sx={{ width: 50, height: 50 }}
                        alt="Remy Sharp"
                        src={avatarPreview}
                      />
                      <Button
                        fullWidth
                        sx={{ marginLeft: "1rem" }}
                        variant="outlined"
                        component="label"
                      >
                        Upload
                        <input
                          onChange={registerDataChange}
                          hidden
                          accept="image/*"
                          name="avatar"
                          multiple
                          type="file"
                        />
                        <PhotoCamera sx={{ marginLeft: "1rem" }} />
                      </Button>
                    </Box>
                    <LoadingButton
                      mt={10}
                      type="submit"
                      fullWidth
                      // onClick={handleClick}
                      endIcon={<AppRegistrationIcon />}
                      loading={Loading}
                      loadingPosition="end"
                      variant="contained"
                      // mt={5}
                      onClick={registerSubmit}
                    >
                      <span>Register</span>
                    </LoadingButton>
                  </form>
                </TabPanel>
              </TabContext>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default LoginSignup;
