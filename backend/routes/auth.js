const express=require("express");
const router=express.Router();
const authController=require("../controllers/auth");

router.post("/user",authController.getUser);
router.post("/signup",authController.signup);
router.post("/login",authController.login);
router.post("/signout",authController.signout);
router.post("/find-username",authController.findUsername);

module.exports=router;