const express = require("express");
const { ProcessPayment, SendStripeApi } = require("../controllers/Payment");
const { isAuthenticated  } = require("../middleware/auth");

const router = express.Router();

router.post("/payment/process",isAuthenticated ,ProcessPayment); 
router.get("/stripeapikey",isAuthenticated ,SendStripeApi); 



module.exports = router;