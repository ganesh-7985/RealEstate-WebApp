import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './src/routes/user.route.js';
import authRouter from './src/routes/auth.route.js';
import listingRouter from './src/routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cookieParser)


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


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