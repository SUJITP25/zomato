import { Food } from "../models/FoodModel.js";
import fs from "fs"

export const addFood = async (req, res) => {
    try {

        const user = req.user
        const userExists = await User.findById(user)
        if (!userExists) {
            return res.staus(400).json({
                message: "User Not Exists",
                success: false
            })
        }

        const { name, description, price, image, category } = req.body

        if (!name || !description || !price || !image || !category) {
            return res.statsu(400).json({
                message: "All Fields REquired",
                success: false
            })
        }


        const food = await Food.create({
            name,
            description,
            price,
            image,
            category
        })


        return res.status(201).json({
            message: "Food Added",
            success: true,
            food
        })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Server Error",
            stack: err.stack,
            success: false,
            err: err.message
        })
    }
}




export const updateFood = async (req, res) => {
    try {

        const user = req.user
        const userExists = await User.findById(user)
        const {foodId} = req.params

        if (!userExists) {
            return res.staus(400).json({
                message: "User Not Exists",
                success: false
            })
        }

        const food = await Food.findById(foodId)

        
        if (!food) {
            return res.staus(400).json({
                message: "Food Not Exists",
                success: false
            })
        }


        const { name, description, price, image, category } = req.body

        if(!name) name = food.name
        if(!description) description = food.description
        if(!price) price = food.price
        if(!image) image = food.image
        if(!category) category = food.category


        const updatedData= {
            name, 
            description, 
            price,
            image, 
            category
        }

       

        const updatedFood = await Food.findByIdAndUpdate(foodId,updateFood,{new:true})


        return res.status(200).json({
            message: "Food Updated",
            success: true,
            updateFood
        })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Server Error",
            stack: err.stack,
            success: false,
            err: err.message
        })
    }
}



export const removeFood = async (req, res) => {
    try {

        const user = req.user
        const userExists = await User.findById(user)
        const {foodId} = req.params

        if (!userExists) {
            return res.staus(400).json({
                message: "User Not Exists",
                success: false
            })
        }
        const food = await Food.findById(foodId)
        if (!food) {
            return res.staus(400).json({
                message: "Food Not Exists",
                success: false
            })
        }
        const deletdFood = await Food.findByIdAndDelete(food._id)
        return res.status(200).json({
            message: "Food Deleted",
            success: true,
            deletdFood
        })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Server Error",
            stack: err.stack,
            success: false,
            err: err.message
        })
    }
}




export const getfoodDetail = async (req, res) => {
    try {

        const user = req.user
        const userExists = await User.findById(user)
        const {foodId} = req.params

        if (!userExists) {
            return res.staus(400).json({
                message: "User Not Exists",
                success: false
            })
        }
        const food = await Food.findById(foodId)
        if (!food) {
            return res.staus(400).json({
                message: "Food Not Exists",
                success: false
            })
        }
        
        return res.status(200).json({
            message: "Food Data Fetched Successfully",
            success: true,
            food
        })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Server Error",
            stack: err.stack,
            success: false,
            err: err.message
        })
    }
}