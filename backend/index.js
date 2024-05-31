import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
import userRouter from './src/routes/user.route.js'
import authRouter from './src/routes/auth.route.js'

const app = express();
app.use(express.json());

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)


app.use((err,req,res,next)=>{
    const statusCode =err.statusCode || 500;
    const message = err.message || "Internal server Error"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

const connectDB = async () => {
    try {
      await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Error connecting to the database", error);
    }
}
app.listen(process.env.PORT || 3000,()=>{
    connectDB()
    console.log(`Port is running on ${process.env.PORT || 3000}`)
})