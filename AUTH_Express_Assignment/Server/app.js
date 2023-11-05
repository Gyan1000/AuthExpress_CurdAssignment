import {config} from "dotenv";
config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import dbConnection from "./config/db_connection.js";
import userRouter from "./routes/user_route.js";
import cookieParser from "cookie-parser";
import CustomError_middleware from "./middlewears/CustomError_middleware.js";
import path from "path"
import {v2} from "cloudinary"
const  app=express();
// middleware
app.use(express.json())
app.use(cookieParser())
// app.use(cors());
// app.use(cors({
//     origin:"http://localhost:5500",
//     credentials:true
// }))
app.use(cors());
app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'));

// Connect to database
dbConnection();
// app.use("/login",userRouter)
// const publicPath = path.join(__dirname, '../client')

// app.use((req,res,next) => {
//   res.header("Access-Control-Allow-Origin","*");
//   res.header("Access-Control-Allow-Origin",
//   "Origin, X-Requested-With, Content-type, Accept , Authorization"
//   );
//   if(req.method === 'OPTIONS') {
//       res.header('Access-Control-Allow-Origin', 'PUT , POST , PATCH , DELETE , GET ');
//       return res.status(200).json({});
//   }
// });

// 

// CLOUDINARY DETAILS FOR CONNECTING THE CLOUDINATY WEBSITE TO STORE IMAGE IN IT
v2.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key:process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
 });


//register user

app.use('/',userRouter);
// app.use(express.static(publicPath))
// app.get('/',(req,res)=>{
//   req.render("login.html")
// })
app.use(CustomError_middleware)

export default app;
