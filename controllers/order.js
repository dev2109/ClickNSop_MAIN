const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorhandlers");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

  const order = await Order.findById(req.params.id).populate(
    "user",//order ma user:user._id che to te id lai ne te
    "name email"//User database ma jsse ne tyaa thi name email lai ne aavse
  );


  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});



// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
                                // Order ma userfieled : logged in user id
                                
  const orders = await Order.find({ user: req.user._id });

  // console.log(req.user);

  res.status(200).json({
    success: true,
    orders,
  });
});



//==================================================================================



// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });

});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(
    async (req, res, next) => {

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {

    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;//body ma j change krsu te


  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  // product find kriyu
  const product = await Product.findById(id);

  // product ni quantity minus kri kriiiiiiiiiiii
  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}



// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});