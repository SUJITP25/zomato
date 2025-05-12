import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import foodRouter from "./routes/FoodRoutes.js"
import userRouter from "./routes/UserRoutes.js"
import multer from "multer";
import path from "path"
import { addFood } from "./controllers/FoodController.js"

const app = express()
dotenv.config()
app.use(express.json());


const __dirname = path.resolve() 


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req,file,cb) => {
        const newFileName = Date.now()+ path.extname(file.originalname)
        cb(null,newFileName)
    }
})

// const upload = multer({
//     storage,
//     limits :{
//         fileSize : 1024*1024*3;
//     } 

// })



const corsOptions = {
    origin: 'https://zomato-22je.onrender.com/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}
app.use(cors(corsOptions))


const connectDb = async () => {
    await mongoose.connect(process.env.mongodb_url)
        .then((res) => {
            console.log("Database Connected")
            app.listen((process.env.port), () => {
                console.log(`Server is running on http://localhost:${process.env.port}`)
            })
        }).catch((err) => {
            console.log(err.message)
            process.exit(1)
        })
}


connectDb()

app.use("/", foodRouter);
app.use("/", userRouter);


// ✅ Correctly join the path
const distPath = path.join(__dirname, "client", "vite-project", "dist");
app.use(express.static(distPath));

app.all('/{*any}', (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});
