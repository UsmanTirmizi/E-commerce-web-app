import express from "express";
//import {forgotPasswordController ,registerController,loginController,testController} from '../controllers/authController.js'
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";
//import router from './authRoute';



//router object
const router=express.Router()
//routes

//create category
router.post("/create-category",requireSignIn,isAdmin,createCategoryController);
//update category
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController);
//get all category
router.get("/get-category",categoryController)
//single category get
router.get("/single-category/:slug",singleCategoryController)
//delete category
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController)






export default router