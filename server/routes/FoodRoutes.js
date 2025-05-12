import express from "express"
import { addFood } from "../controllers/FoodController.js"

const router = express.Router()


router.post("/add-food", addFood)


export default router