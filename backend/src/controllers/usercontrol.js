import asyncHandle from '../utils/asyncHandle.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiRes.js';
import User from '../models/user.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import generateAccessAndRefreshTokens from '../utils/token.js';

const signUp = asyncHandle(async (req, res) => {
    const { admNo, email, password, discipline, branch, firstName, lastName } = req.body;
    if (!admNo || !email || !password || !discipline || !branch || !firstName) {
        throw new ApiError(400, 'all fields are required');
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new ApiError(400, 'user already exist');
    }

    let profilePicUrl = '';
    if (req.file?.path) {
        const uploadResult = await uploadOnCloudinary(req.file.path, 'profilePics');
        if (!uploadResult) {
            throw new ApiError(500, 'Failed to upload profile picture');
        }
        profilePicUrl = uploadResult.secure_url;
    }

    const newUser = await User.create({
        admNo,
        email,
        password,
        discipline,
        branch,
        firstName,
        lastName,
        profilePic: profilePicUrl
    })

    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, 'User creation failed');
    }

    // Corrected ApiResponse call: (statusCode, data, message)
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

const login = asyncHandle(async (req, res) => {
    const { emailOrAdmNo, password } = req.body;
    if (!emailOrAdmNo || !password) {
        throw new ApiError(400, 'all fields are required');
    }
    const user = await User.findOne({
        $or: [
            { email: { $regex: new RegExp(`^${emailOrAdmNo}$`, 'i') } },
            { admNo: { $regex: new RegExp(`^${emailOrAdmNo}$`, 'i') } }
        ]
    });
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    };

    // Corrected ApiResponse call: (statusCode, data, message)
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

const currentUser = asyncHandle(async (req, res) => {
    // Corrected ApiResponse call: (statusCode, data, message)
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "Current user retrieved successfully"
        ));
});

const logout = asyncHandle(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export {
    signUp,
    login,
    currentUser,
    logout
};
