import asyncHandle from '../utils/asyncHandle.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiRes.js';
import User from '../models/user.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import generateAccessAndRefreshTokens from '../utils/token.js';


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

    const createdUser=await User.findById(newUser._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500,'User creation failed');
    }

    res.status(201).json(
        new ApiResponse(200,"User registered successfully", createdUser)
    );
});

const login=asyncHandle(async(req,res)=>{
    const {emailOrAdmNo,password}=req.body;
    if(!emailOrAdmNo||!password){
        throw new ApiError(400,'all fields are required');
    }
    const user=await User.findOne({
        $or:[{email:emailOrAdmNo},{admNo:emailOrAdmNo}]
    });
    if(!user){
        throw new ApiError(400,'user not found');
    }

    const isMatch=await user.isPasswordMatch(password);
    if(!isMatch){
        throw new ApiError(400,'invalid password');
    }

    const {accessToken,refreshToken}= await generateAccessAndRefreshTokens(user._id);

    const loggedInUser= await User.findById(user._id).select("-password -refreshToken");
    
    const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "User logged in successfully", loggedInUser));

});

export{
    signUp,
    login
};

