const ErrorHandler = require("../utils/errorhandlers");

module.exports = (err, req, res, next) => {
  //uppr thi j aavse tene left side store krse
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  //CastError : Cast to object error....aavu kai aave jyaare id(10) ni hoi ochaa vadhaare caharacter
  //naakhe tyaare ene khbr ni pdee k aa ID 6 k kai biju....
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //mongodb duplicate key error
  //email uniq hovi joiye but agar paachi same naakhsu to E11000- duplicate key....aavu kai aaavse
  if (err.code === 11000) {
    const msgg = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    // keyvalue aavse == email
    err = new ErrorHandler(msgg, 400);
  }

  //Wrong  JSONWebToken Error
  if (err.name === "JsonWebTokenError") {
    const message = `JSON WEb Token Is Invalid, Try Again`;
    err = new ErrorHandler(message, 400);
  }

  //JSONWebToken Expire Error
  if (err.name === "TokenExpiredError") {
    const message = `JSON WEb Token Is Expired, Try Again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.stack,
    message: err.message,
  });
};
