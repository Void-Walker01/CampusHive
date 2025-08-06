import asyncHandle from '../utils/asyncHandle.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiRes.js';
import User from '../models/user.js';
import uploadOnCloudinary from '../utils/cloudinary.js';


const signUp=asyncHandle(async(req,res)=>{
    const {admNo,email,password,discipline,branch,firstName,lastName}=req.body;
    if(!admNo||!email||!password||!discipline||!branch||!firstName){
        throw new ApiError(400,'all fields are required');
    }
    const userExist=await User.findOne({email});
    if(userExist){
        throw new ApiError(400,'user already exist');
    }

    let profilePicUrl='';
     if (req.file?.path) {
        const uploadResult = await uploadOnCloudinary(req.file.path, 'profilePics');
        if (!uploadResult) {
            throw new ApiError(500, 'Failed to upload profile picture');
        }
        profilePicUrl = uploadResult.secure_url;
    }

    const newUser=await User.create({
        admNo,
        email,
        password,
        discipline,
        branch,
        firstName,
        lastName,
        profilePic:profilePicUrl
    })

    const createdUser=await User.findById(newUser._id).select("-password");
    if(!createdUser){
        throw new ApiError(500,'User creation failed');
    }

    res.status(201).json(
        new ApiResponse(200,"User registered successfully", createdUser)
    );
});

export{
    signUp
};

