import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    foodAdded : {
        type: mongoose.Schema.Types.ObjectId, 
        ref : "Food"
    }
}, { timestamps: true })


export const User = mongoose.models.User || mongoose.model("User", userSchema)
