import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import StoreMallDirectoryRoundedIcon from "@mui/icons-material/StoreMallDirectoryRounded";
// import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled, alpha } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
// import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
// import UserOptions from "./UserOptions";
import { useSelector } from "react-redux";

const drawerWidth = 240;
const navItems = ["home", "products", "orders"];
const settings = ["Profile", "Account", "Logout"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1.5, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = (props) => {
  const { window } = props;
  const { user } = useSelector((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [anchorElNav, setAnchorElNav] =useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  // const [search, setSearch] = useState("");

  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault(); //form submit thvaa thi j form relode thaai te nai thseeeee
    // if agar keyword hoi to....trim thi aaju baaju ni space kaadhi devaa ni
    if (keyword.trim()) {
      // console.log(keyword.trim());
      //   history.push(`/products/${keyword}`);
      navigate(`/products/${keyword}`);
    } else {
      //   history.push("/products");
      navigate(`/products`);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // console.log(user.role);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ display: "flex", padding: "1rem", justifyContent: "center" }}>
        <Link style={{ color: "#d11b8b" }} to="/">
          <img src={logo} alt="My Awesome Website" height="100" width="100" />
        </Link>
      </Box>
      <Divider />
      <List>
        {navItems.map((item,index) => (
          <Link to={item} key={index} style={{ color: "black" }}>
            <ListItem key={item} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center", textTransform: "capitalize" }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {/* {user?.role === "admin" && ( */}
        <Link to={`/admin/dashboard`} style={{ color: "black" }}>
          <ListItem key="dashboard" disablePadding>
            <ListItemButton
              sx={{ textAlign: "center", textTransform: "capitalize" }}
            >
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </Link>
        {/* )} */}
      </List>
    </Box>
  );
  // {
  //   navItems.map((item) => (
  //     <Link to={item === "dashboard" ? `/admin/${item}` : `/${item}`}>
  //       <Button key={item} sx={{ color: "#fff", fontVariant: "capitalize" }}>
  //         {item}
  //       </Button>
  //     </Link>
  //   ));
  // }

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        style={{ background: "#FFB26B" }}
        component="nav"
        position="sticky"
      >
        <Box sx={{ display: "flex" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ mr: { xs: 0, sm: 2 }, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Link to="/">
              <img
                style={{ borderRadius: "5rem" }}
                src={logo}
                alt="My Awesome Website"
                height="50"
                width="50"
              />
            </Link>

            <Box
              ml={5}
              sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}
            >
              {navItems.map((item,index) => (
                <Link to={item} key={index} style={{ color: "black" }}>
                  <ListItem key={item} disablePadding>
                    <ListItemButton
                      sx={{ textAlign: "center", textTransform: "capitalize" }}
                    >
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
              {user?.role === "admin" && (
                <Link to={`/admin/dashboard`} style={{ color: "black" }}>
                  <ListItem key="dashboard" disablePadding>
                    <ListItemButton
                      sx={{ textAlign: "center", textTransform: "capitalize" }}
                    >
                      <ListItemText primary="Dashboard" />
                    </ListItemButton>
                  </ListItem>
                </Link>
              )}
            </Box>
          </Toolbar>
          <Box
            ml="auto"
            p={1}
            sx={{
              display: "flex",
              alignItem: "center",
            }}
          >
            <form onSubmit={searchSubmitHandler}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </Search>
            </form>

            <Link to="/cart" style={{ color: "white" }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>

            <Link to="/profile" style={{ color: "white" }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge>
                  <PersonIcon />
                </Badge>
              </IconButton>
            </Link>

            <Box
              ml={2}
              sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}
            >
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Box>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;

// import React, { useState } from "react";
// import {
//   MDBNavbar,
//   MDBContainer,
//   MDBNavbarBrand,
//   MDBNavbarToggler,
//   MDBNavbarItem,
//   MDBNavbarLink,
//   MDBCollapse,
//   // MDBBtn,
//   MDBNavbarNav,
//   MDBIcon,
//   MDBInputGroup,
// } from "mdb-react-ui-kit";

// import logo from "../../../images/logo3.png";
// import { Link } from "react-router-dom";

// export default function Navbar() {

//   const [showNavNoTogglerThird, setShowNavNoTogglerThird] = useState(false);

//   return (

//     <>
//       <MDBNavbar expand="lg" light bgColor="light" >
//         <MDBContainer fluid>
//           <MDBNavbarToggler
//             type="button"
//             data-target="#navbarTogglerDemo03"
//             aria-controls="navbarTogglerDemo03"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//             onClick={() => setShowNavNoTogglerThird(!showNavNoTogglerThird)}
//           >
//             <MDBIcon icon="bars" fas />
//           </MDBNavbarToggler>
//           <MDBNavbarBrand>
//             <Link style={{ color: '#d11b8b' }}  to="/">
//               <img src={logo} alt="My Awesome Website" height="50px" width="auto" />
//             </Link>
//           </MDBNavbarBrand>
//           <MDBCollapse navbar show={showNavNoTogglerThird}>
//             <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
//               <MDBNavbarItem>
//                 <MDBNavbarLink active aria-current="page" href="/">
//                   <Link style={{ color: '#d11b8b' }}  to="/">Home</Link>
//                 </MDBNavbarLink>
//               </MDBNavbarItem>
//               <MDBNavbarItem>
//                 <MDBNavbarLink>
//                   <Link style={{ color: '#d11b8b' }}  to="/products">Products</Link>
//                 </MDBNavbarLink>
//               </MDBNavbarItem>
//               <MDBNavbarItem>
//                 <MDBNavbarLink>
//                   <Link style={{ color: '#d11b8b' }}  to="/cart">Cart</Link>
//                 </MDBNavbarLink>
//               </MDBNavbarItem>
//               <MDBNavbarItem>
//                 <MDBNavbarLink>
//                   <Link style={{ color: '#d11b8b' }}  to="/profile">Profile</Link>
//                 </MDBNavbarLink>
//               </MDBNavbarItem>
//               <MDBNavbarItem>
//                 <MDBNavbarLink>
//                   <Link style={{ color: '#d11b8b' }}  to="/login">Login</Link>
//                 </MDBNavbarLink>
//               </MDBNavbarItem>
//             </MDBNavbarNav>
//             <MDBInputGroup tag="form" className="d-flex w-auto mb-3">

//             </MDBInputGroup>
//           </MDBCollapse>
//         </MDBContainer>
//       </MDBNavbar>
//     </>
//   );
// }
