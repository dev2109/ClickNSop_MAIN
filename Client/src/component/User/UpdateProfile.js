import React, { useEffect, useState } from "react";
// import './UpdateProfile.css';
import Loader from "../layout/Loader/Loader";
// import { Link } from 'react-router-dom';
import { useAlert } from "react-alert";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";
import MetaData from "../layout/MetaData/MetaData";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
// import Input from "@mui/material/Input";
// import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { isUpdated, loading, error } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/a.jpg");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  // const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/profile");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <Box
            mt={10}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ height: "80dvh", width: { sm: "100%", md: "23rem" } }}>
              <Typography align="center" variant="h4" component="h4">
                Update Profile
              </Typography>
              <Divider />

              <form
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <Box mt={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Name
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountBoxIcon />
                        </InputAdornment>
                      }
                      label="Name"
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box mt={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">
                          <EmailOutlinedIcon />
                        </InputAdornment>
                      }
                      type="email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      label="Amount"
                    />
                  </FormControl>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  mt={3}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={avatarPreview}
                    sx={{ width: 65, height: 65 }}
                  />
                  <Button
                    ml={4}
                    sx={{ width: "17rem" }}
                    type="submit"
                    variant="contained"
                    component="label"
                  >
                    Upload
                    <input
                      hidden
                      accept="image/*"
                      onChange={updateProfileDataChange}
                      name="avatar"
                      multiple
                      type="file"
                    />
                  </Button>
                </Box>
                <Box mt={4}>
                  <Button type="submit" fullWidth variant="outlined">
                    Update
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
