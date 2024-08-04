import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
// import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../redux/actions/userAction";
import Loader from "../layout/Loader/Loader";
import { useNavigate,useParams} from "react-router-dom";
import {
  Box,
  InputAdornment,
  // Divider,
  InputLabel,
  OutlinedInput,
  // Paper,
  FormControl,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";


const UpdateUser = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const { loading, error, user } = useSelector((state) => state.userDetails);
  
    const {
      loading: updateLoading,
      error: updateError,
      isUpdated,
    } = useSelector((state) => state.profile);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [open, setOpen] = useState(false);
    const userId = id;
  
    useEffect(() => {
      if (user && user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
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
        alert.success("User Updated Successfully");
        navigate("/admin/users");
        dispatch({ type: UPDATE_USER_RESET });
      }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);
  
    const updateUserSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("role", role);
  
      dispatch(updateUser(userId, myForm));
    };

  return (


   <>
    <MetaData title="Update User" />
      <Box>
        <SideBar open={open} setOpen={setOpen} />
        <Box mt={9} sx={{ height: "70vh" }}>
          {loading ? (
            <Loader />
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              // alignItems="center"
              sx={{ height: "80vh" }}
            >
              <Box>
                <Typography variant="h4" align="center">
                  Update User
                </Typography>
                <form onSubmit={updateUserSubmitHandler}>
                  <Box sx={{ width: "100%", mt: 3 }}>
                    <FormControl size="small" fullWidth sx={{ mt: 2 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Name
                      </InputLabel>
                      <OutlinedInput
                        fullWidth={true}
                        id="outlined-adornment-amount"
                        startAdornment={
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        }
                        label="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <FormControl size="small" fullWidth sx={{ mt: 2 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Email
                      </InputLabel>
                      <OutlinedInput
                        fullWidth={true}
                        id="outlined-adornment-amount"
                        startAdornment={
                          <InputAdornment position="start">
                            <MailOutlineIcon />
                          </InputAdornment>
                        }
                        label="Name"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box sx={{ width: "100%", mt: 2 }}>
                    <TextField
                      size="small"
                      id="outlined-select-currency"
                      select
                      fullWidth
                      defaultValue="Admin"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem disabled value="">
                        Choose Role
                      </MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </TextField>
                  </Box>
                  <Box mt={2}>
                    <Button
                      m={1}
                      fullWidth
                      variant="outlined"
                      type="submit"
                      disabled={
                        updateLoading
                          ? true
                          : false || role === ""
                          ? true
                          : false
                      }
                    >
                      Update
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
   </>
  )
}

export default UpdateUser