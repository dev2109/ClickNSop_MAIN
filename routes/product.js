const express = require("express");
const { getAllProducts, createProdut, UpdateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReviews, getAdminProducts } = require("../controllers/product");
const { isAuthenticated , roles } = require("../middleware/auth");

const router = express.Router();

router.get("/products",getAllProducts); 

router.get("/admin/products",isAuthenticated, roles("admin"), getAdminProducts);

router.post("/admin/createproducts",isAuthenticated , roles("admin") ,createProdut);
router.put("/admin/product/:id",isAuthenticated , roles("admin") ,UpdateProduct);
router.delete("/admin/product/:id",isAuthenticated , roles("admin") ,deleteProduct);

router.get("/product/:id",getProductDetails);

router.put("/review",isAuthenticated ,createProductReview);



router.get("/getallreview",getProductReviews);
router.delete("/deletereview",isAuthenticated ,deleteReviews);




module.exports = router