import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import userRoutes from './routes/userRoute.js';
import postRoutes from './routes/postRoute.js';

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/posts',postRoutes);


export default app;
