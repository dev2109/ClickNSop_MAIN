const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/user");
const { isAuthenticated  , roles} = require("../middleware/auth");
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);



router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token",resetPassword);
router.get("/logout",logout);



router.get("/profile",isAuthenticated ,getUserDetails);
router.put("/password/update",isAuthenticated ,updatePassword);
router.put("/profile/update",isAuthenticated ,updateProfile);


router.get("/admin/alluser",isAuthenticated, roles("admin") ,getAllUser);
router.get("/admin/userdetails/:id",isAuthenticated, roles("admin") ,getSingleUser);
router.put("/admin/userdetails/:id",isAuthenticated, roles("admin") ,updateUserRole);
router.delete("/admin/userdetails/:id",isAuthenticated, roles("admin") ,deleteUser);



module.exports = router;