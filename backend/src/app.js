import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/ErrorHandle.js"; 

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/v1/health',(req,res)=>{
  res.status(200).json({
    status: 'ok',
    message:"backend is running"
  });
});

import userRoutes from './routes/userRoute.js';
import postRoutes from './routes/postRoute.js';

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use(errorHandler);


export default app;
