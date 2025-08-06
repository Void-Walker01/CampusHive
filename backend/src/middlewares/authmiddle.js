import asyncHandle from '../utils/asyncHandle.js';
import ApiError from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const verifyJWT=asyncHandle(async(req,res,next)=>{
    try{
        const token=req.cookies?.accessToken||req.headers?.authorization?.replace("Bearer ", "");

        if(!token){
            throw new ApiError(401,"Unauthorized");
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user= await User.findById(decoded?._id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(401,"Unauthorized");
        }

        req.user=user;
        next();
    }catch{
        console.error(error);
        throw new ApiError(401,"Unauthorized");
    }
});

export default verifyJWT;