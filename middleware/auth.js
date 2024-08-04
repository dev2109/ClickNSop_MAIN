const ErrorHandler = require("../utils/errorhandlers");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticated = catchAsyncErrors(
    async (req,res,next) =>{

        const {token} = req.cookies; // agar {} nai lakhsu to object ni jem aavse ==>> {token : hiuhgihuhiuhliuhiluhiu}
        // console.log(token);

        if (!token) {
            return next(new ErrorHandler("Please Login to access this resource", 401));
          }
        
          const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        
          req.user = await User.findById(decodedData.id);
        
          next();

    }
);

exports.roles = (...roles) => {// ...role route maa thi aavse..array form maa
    return (req, res, next) => {

            // if([array role ='admin'] is include(array method che)  )
        if (!roles.includes(req.user.role)) { //req.user.role === user schema ma role
          return next(
            new ErrorHandler (
              `Role: ${req.user.role} is not allowed to access this resouce `,
              403
            )
          );
        }
    
        next();
      };
}
