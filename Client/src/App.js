import "./App.css";
import Header from "./component/layout/Header/Navbar";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignup from "./component/User/LoginSignup";
import {
  // BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import store from "./redux/store";
import { useEffect, useState } from "react";
import { loadUser } from "./redux/actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "./component/Admin/Dashboard";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrder from "./component/Order/MyOrder";
import OrderDetails from "./component/Order/OrderDetails";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UserList from "./component/Admin/UserList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import theme from "./Theme/Theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  const { user, isAuthenticated  } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");



  const location = useLocation();


  //  console.log(location);

  //  console.log("splitt   " + location.pathname.split("/")[0]);
  //  console.log("splitt   " + location.pathname.split("/")[1]);
  //  console.log("splitt   " + location.pathname.split("/")[2]);

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapikey");
  
      setStripeApiKey(data.stripeApiKey);
  
      // console.log(data.stripeApiKey)
      // console.log(data)
  
      // console.log(stripeApiKey)
    }

    getStripeApiKey();

  },[stripeApiKey]);


  return (
    <>
      <ThemeProvider theme={theme}>
        {location.pathname.split("/")[1] !== "admin" && <Header />}

        {isAuthenticated && <UserOptions user={user} />}

        <Routes>
          {["/", "/home"].map((path,index) => (
            <Route path={path} key={index} element={<Home />} />
          ))}
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignup />} />

          <Route exact path="/password/update" element={<UpdatePassword />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />

          <Route element={<ProtectedRoute />}>
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/profile/update" element={<UpdateProfile />} />
            <Route exact path="/shipping" element={<Shipping />} />
            <Route exact path="/order/confirm" element={<ConfirmOrder />} />

            {/* {stripeApiKey && (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                  <Route exact path="/process/payment" element={<Payment/>} />
                </Elements>
                )} */}

            <Route
              exact
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />

            <Route exact path="/success" element={<OrderSuccess />} />
            <Route exact path="/orders" element={<MyOrder />} />
            <Route exact path="/order/:id" element={<OrderDetails />} />

            <Route exact path="/admin/dashboard" element={<Dashboard />} />
            <Route exact path="/admin/products" element={<ProductList />} />
            <Route exact path="/admin/createproduct" element={<NewProduct />} />

            <Route
              exact
              path="/admin/product/:id"
              element={<UpdateProduct />}
            />

              
              <Route exact path="/admin/orders" element={<OrderList />} />
              <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
  
              <Route exact path="/admin/users" element={<UserList />} />
              <Route exact path="/admin/user/:id" element={<UpdateUser />} />
  
              <Route exact path="/admin/reviews" element={<ProductReviews />} />
         

          </Route>

          <Route exact path="/cart" element={<Cart />} />
        </Routes>

        {location.pathname.split("/")[1] !== "admin" && <Footer />}

      </ThemeProvider>
    </>
  );
}


export default App;
// https://dev.to/salehmubashar/conditional-routing-with-react-router-v6-229g

//https://github.com/meabhisingh/mernProjectEcommerce

// {
//   /*
//           <Route exact path="/profile" element={ (
//           <ProtectedRoute>
//             <Profile/>
//             </ProtectedRoute>
//           )}/>  */
// }

// {
//   /* <Route path="/" element={<ProtectedRoute user={user} />} >
//             <Route path="profile" element={<Profile />} />
//             <Route path="profile/update" element={<UpdateProfile />} />
//           </Route> */
// }

// {
//   /* <Route path="/account" element={ <ProtectedRoute component= {<Profile/>}}/> */
// }
