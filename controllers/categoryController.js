import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"
import router from "../routes/categoryRoutes.js"

export const createCategoryController=async(req,res) =>{
    try {
        const {name}= req.body
        if(!name){
            return res.status(401).send({message:'Name is required'})
        }
        const existingcategory= await categoryModel.findOne({name})
        if(existingcategory)
        {
            return res.status(200).send({
                success:true,
                message:'Category already exits'
            })
        }
        const category =await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'new category added',
            category
          })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in category'
        })
    }

}
//update category
export const updateCategoryController=async(req,res)=>{

    try {
        const {name}=req.body
        const {id}= req.params
        const category =await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(201).send({
            success:true,
            message:'category updated',
            category
          })
    
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in update category'
    })
}

}
export const categoryController=async(req,res)=>{
    try {
      const category= await  categoryModel.find({})
      res.status(200).send({
        success:true,
        message:'All category list',
        category

      })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getting all category',
            error
    })
    }
}
export const singleCategoryController=async(req,res)=>{

    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'single category',
            category
    
          })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getting single category',
            error
    })
    }

}

//delete controller

export const deleteCategoryController=async(req,res)=>{

    try {
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'category deleted'
          })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in deleting category',
            error
    })
        
    }
}