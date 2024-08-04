const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

exports.ProcessPayment = catchAsyncErrors(async (req, res) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
      description: "Description of the product or service",
    },
  });

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

exports.SendStripeApi = catchAsyncErrors(async (req, res) => {
  res.status(200).json({
    success: true,
    stripeApiKey: process.env.STRIPE_APIKEY,
  });
});


// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const Razorpay = require("razorpay");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEYID,
//   key_secret: process.env.RAZORPAY_KEYSECRET,
// });

// exports.ProcessPayment = catchAsyncErrors(async (req, res) => {
//   const options = {
//     amount: req.body.amount * 100, // Amount in paise
//     currency: "INR",
//     receipt: `receipt_${Date.now()}`,
//   };

//   const order = await razorpay.orders.create(options);

//   res.status(200).json({
//     success: true,
//     order,
//   });
// });

// exports.SendRazorpayApi = catchAsyncErrors(async (req, res) => {
//   res.status(200).json({
//     success: true,
//     razorpayApiKey: process.env.RAZORPAY_KEYID,
//   });
// });
