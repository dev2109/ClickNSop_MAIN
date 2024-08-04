import React from "react";
import "./Profile.css";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData/MetaData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Box, Button, Typography, Divider } from "@mui/material";

// import {  useNavigate } from "react-router-dom";

const Profile = () => {
  // const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.user);

  // useEffect(() => {

  //   if (isAuthenticated === false) {
  //     navigate("/login");

  //   }

  // }, [navigate,isAuthenticated])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />
          <Box
            sx={{ height: { sm: "auto", md: "100dvh" }, width: "100%" }}
            display={{ sm: "block", md: "flex" }}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                // height: "70vh",
                // { sm: "60vh", md: "70vh" },
                width: { sm: "100%", md: "50%" },
              }}
            >
              <Typography variant="h3" m={3} align="center">
                My Profile
              </Typography>
              <Avatar
                alt={user.name}
                rounded
                src={user.avatar.url}
                sx={{
                  objectFit: "contain",
                  width: 300,
                  height: 300,
                  margin: "1rem auto",
                }}
              />
              {/* <img src={user.avatar.url} alt={user.name} /> */}
              <Box
                width="100%"
                mt={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Link
                  to="/profile/update"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Button variant="outlined" sx={{ Width: "30rem" }}>
                    Edit Profile
                  </Button>
                </Link>
              </Box>
            </Box>
            <br />
            <Divider/>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              gap={5}
              sx={{ height: "70vh", width: { sm: "100%", md: "50%" } }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography color="primary" variant="h4" align="center">
                  Full Name
                </Typography>
                <Typography variant="h6" align="center">
                  {user.name}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography color="primary" variant="h4" align="center">
                  Email
                </Typography>
                <Typography variant="h6" align="center">
                  {user.email}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h4" color="primary" align="center" s>
                  Joined On
                </Typography>
                <Typography variant="h6" align="center">
                  {String(user.createdAt).substr(0, 10)}
                </Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="space-around"
                sx={{ height: "3rem", width: "100%" }}
              >
                <Link to="/orders">
                  <Button variant="contained" sx={{ Width: "30rem" }}>
                    My Orders
                  </Button>
                </Link>
                <Link to="/password/update">
                  <Button variant="contained" sx={{ Width: "30rem" }}>
                    Change Password
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Profile;
