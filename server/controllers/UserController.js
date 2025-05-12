import { Food } from "../models/FoodModel.js";
import fs from "fs"
import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const Register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword} = req.body;

        // Validate all required fields
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All Fields Required",
                success: false
            });
        }

        // Check if user already exists
        const isUserExists = await User.findOne({ email });

        if (isUserExists) {
            return res.status(400).json({
                message: "Email Already Registered",
                success: false
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Both Passwords Should Match",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User Registered",
            success: true,
            user
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Server Error",
            success: false,
            error: err.message
        });
    }
};




export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
      });
    }


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Email not registered',
        success: false,
      });
    }


    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: 'Invalid credentials',
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );


 
    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      error: err.message,
    });
  }
};





// export const updateFood = async (req, res) => {
//     try {

//         const user = req.user
//         const userExists = await User.findById(user)
//         const { foodId } = req.params

//         if (!userExists) {
//             return res.staus(400).json({
//                 message: "User Not Exists",
//                 success: false
//             })
//         }

//         const food = await Food.findById(foodId)


//         if (!food) {
//             return res.staus(400).json({
//                 message: "Food Not Exists",
//                 success: false
//             })
//         }


//         const { name, description, price, image, category } = req.body

//         if (!name) name = food.name
//         if (!description) description = food.description
//         if (!price) price = food.price
//         if (!image) image = food.image
//         if (!category) category = food.category


//         const updatedData = {
//             name,
//             description,
//             price,
//             image,
//             category
//         }



//         const updatedFood = await Food.findByIdAndUpdate(foodId, updateFood, { new: true })

//         return res.status(200).json({
//             message: "Food Updated",
//             success: true,
//             updatedFood
//         })

//     } catch (err) {
//         console.log(err.message)
//         return res.status(500).json({
//             message: "Server Error",
//             stack: err.stack,
//             success: false,
//             err: err.message
//         })
//     }
// }






// export const removeFood = async (req, res) => {
//     try {

//         const user = req.user
//         const userExists = await User.findById(user)
//         const { foodId } = req.params

//         if (!userExists) {
//             return res.staus(400).json({
//                 message: "User Not Exists",
//                 success: false
//             })
//         }
//         const food = await Food.findById(foodId)
//         if (!food) {
//             return res.staus(400).json({
//                 message: "Food Not Exists",
//                 success: false
//             })
//         }
//         const deletdFood = await Food.findByIdAndDelete(food._id)
//         return res.status(200).json({
//             message: "Food Deleted",
//             success: true,
//             deletdFood
//         })

//     } catch (err) {
//         console.log(err.message)
//         return res.status(500).json({
//             message: "Server Error",
//             stack: err.stack,
//             success: false,
//             err: err.message
//         })
//     }
// }




// export const getfoodDetail = async (req, res) => {
//     try {

//         const user = req.user
//         const userExists = await User.findById(user)
//         const { foodId } = req.params

//         if (!userExists) {
//             return res.staus(400).json({
//                 message: "User Not Exists",
//                 success: false
//             })
//         }
//         const food = await Food.findById(foodId)
//         if (!food) {
//             return res.staus(400).json({
//                 message: "Food Not Exists",
//                 success: false
//             })
//         }

//         return res.status(200).json({
//             message: "Food Data Fetched Successfully",
//             success: true,
//             food
//         })

//     } catch (err) {
//         console.log(err.message)
//         return res.status(500).json({
//             message: "Server Error",
//             stack: err.stack,
//             success: false,
//             err: err.message
//         })
//     }
// }