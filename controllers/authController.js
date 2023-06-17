//import { compare } from "bcrypt";
import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import  Jwt  from "jsonwebtoken";
import { requireSignIn } from "../middlewares/authMiddleware.js";




export const registerController= async(req,res)=>{
    try{
    const {name, email, password, phone,address,answer}=req.body
        //validations
        if(!name){
            return res.send({message:'Name is required'})
        }
        if(!email){
            return res.send({message:'Email is required'})
        }
        if(!password){
            return res.send({message:'Password is required'})
        }
        if(!phone){
            return res.send({message:'Phone number is required'})
        }
        if(!address){
            return res.send({message:'Adress is required'})
        }
        if(!answer){
            return res.send({message:'Answer is required'})
        }
        //check user
        const exisitingUser= await userModel.findOne({email})
        //existing user
        if(exisitingUser)
        {
            return res.status(200).send({
                success:false,
                message:'Already registered, Please login'
        })
        }
        //registerUser
        const hashedPassword= await hashPassword(password)
        //save
        const user = await new userModel(
            {name,email,phone,address,password:hashedPassword,answer}
            ).save()
        res.status(201).send({
            success:true,
            message:'User Registered',
            user
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in registration',
            error
        })
    }
}
//login
export const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'invalid email or password'
            })
        };
        //check user
        const user= await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'email is not registered'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'invalid password'
            })
        }
        //token
        const token= await Jwt.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
                answer:user.answer
            },
            token
        })
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error in login',
            error
    })
    };
};
// forgotPasswordController
export const forgotPasswordController=async(req,res) => {
 try {
    const {email,answer,newPassword}=req.body
    if(!email){
        res.status(400).send({message:'Email is required'})
    }
    if(!answer){
        res.status(400).send({message:'Answer is required'})
    }
    if(!newPassword){
        res.status(400).send({message:'Password is required'})
    }
    //check
    const user=await userModel.findOne({email,answer})
    //validate
    if(!user)
    {
        return res.status(404).send({
            success:false,
            message:'Wrong email or answer'
        })
    }
    const hashed= await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed})
    res.status(200).send({
        success:true,
        message:"password Changed successfully"
    })
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Something went wrong',
        error
    })
 }
}



 export const testController=(req,res)=>{
    res.send("protected route")
 }