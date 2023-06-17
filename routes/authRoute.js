import express from "express";
import {forgotPasswordController ,registerController,loginController,testController} from '../controllers/authController.js'
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
//import router from './authRoute';



//router object
const router=express.Router()
//REGISTER
router.post("/register",registerController);

//LOGIN
router.post("/login",loginController);

//Forgot password|| post
router.post('/forgot-password',forgotPasswordController);

//test route
router.get("/test",requireSignIn,isAdmin,testController)
  
//user protected route auth
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
//admin protected route
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})
export default router;
  