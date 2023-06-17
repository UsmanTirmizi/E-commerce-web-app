import express from "express";
import morgan from 'morgan'
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'

//DOTENV CONFIG
dotenv.config();
//database connect
connectDB()

//rest object
const app = express();



// const mongoose=require("mongoose");

// const userRoute=require("./Api/routes/user")
// const authRoute=require("./Api/routes/auth")
// const productRoute=require("./Api/routes/product")
// const cartRoute=require("./Api/routes/cart")
// const orderRoute=require("./Api/routes/order")

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)
//rest api
app.get("/",(req,res)=>{
    res.send("<h1>wellcome</h1>")
})

//port
const PORT=process.env.PORT|| 8080;

app.listen(PORT, () => {
    console.log(`backend server is running on ${PORT}`.bgCyan.white)
});