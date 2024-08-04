const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser"); //cookie ma token che to ene get krvaa maate
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


// ==================================================================================
const dotenv = require("dotenv");
//badhe process.env lakhsu to khbr kai ritee padse k kai env file jovaa ni che
//etle dotenv packege kriyu
//config krvaa maate

dotenv.config({ path: "config/config.env" });

// =====================================================================================

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));

// =======================================================================================
//Route Imports
const product = require("./routes/product");
const user = require("./routes/user");
const order = require("./routes/order");
const payment = require("./routes/Payment");

//Use Of Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// app.get("/api/getkey",(req,res)=>res.status(200).json({key: process.env.RAZORPAY_KEYID}))

// =======================================================================================
//MiddleWare for Errors
app.use(errorMiddleware);


module.exports = app;

//https://github.com/meabhisingh/mernProjectEcommerce
