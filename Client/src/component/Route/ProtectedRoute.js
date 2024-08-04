import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  
  Outlet,
  useNavigate,
  // Route, Routes
} from "react-router-dom";
import { clearErrors } from "../../redux/actions/userAction";

// const ProtectedRoute = ({component : Component , ...rest}) => {

//   const {user , loading , isAuthenticated } = useSelector((state) => state.user);

//   return (
//     <>
//       {loading === false && (
//         <Routes>
//         <Route
//           {...rest}
//           render={(props) =>{

//             if (isAuthenticated === false) {
//              return <Navigate to="/login" />;
//             }

//             return <Component {...props} />;
//           }}
//         />
//     </Routes>

//       )}
//     </>
//   )
// }
const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate()

  const { loading, isAuthenticated, auth_error } = useSelector(
    (state) => state.user
  );

  // console.log("loading  " + loading);
  // console.log("isAuthenticated  " + isAuthenticated);
  // console.log("auth_error  " + auth_error);

  // console.log(user);
  // if (user === false) {
  //   alert.error("You Need To Login First");
  //   return <Navigate to={redirectPath} replace />;
  // }
  // return <Outlet />;

  useEffect(() => {

    if (loading === false && isAuthenticated === false) {

      if (auth_error) {
        const msg = auth_error;
        alert.error(msg);
        dispatch(clearErrors());
      }

      // <Navigate to="/login" />

      navigate("/login")
     
    }

  }, [isAuthenticated,loading,navigate, alert, auth_error, dispatch]);

  return (
    <>
      {loading === false && isAuthenticated === true ? (
        <Outlet />
      ) : (
        // <Navigate to="/login" />
        <>
        
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
