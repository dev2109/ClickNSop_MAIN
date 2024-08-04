const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/order");
const { isAuthenticated , roles } = require("../middleware/auth");

const router = express.Router();


router.post("/order/new",isAuthenticated,newOrder); 
router.get("/order/:id",isAuthenticated,getSingleOrder); 
router.get("/orders/myorder",isAuthenticated, myOrders); 

router.get("/admin/orders", isAuthenticated , roles("admin"),getAllOrders );
router.put("/admin/order/:id", isAuthenticated , roles("admin"),updateOrder );
router.delete("/admin/order/:id", isAuthenticated , roles("admin"),deleteOrder );




module.exports = router