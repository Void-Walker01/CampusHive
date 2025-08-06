import asyncHandle from '../utils/asyncHandle.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiRes.js';
import Post from '../models/post.js';
import uploadOnCloudinary from '../utils/cloudinary.js';



const createPost= asyncHandle(async(req,res)=>{
    const {content}=req.body;

    if(!content&&!req.file){
        throw new ApiError(400,'Post must have either content or an image');
    }

    let imageUrl=null;
    if(req.file){
        const result=await uploadOnCloudinary(req.file.path);

        if(!result||!result.url){
            throw new ApiError(500,'Failed to upload image');
        }
        imageUrl=result.url;
    }

    const newPost=await Post.create({
        content,
        image: imageUrl,
        author: req.user._id
    });

    return res
    .status(201)
    .json(new ApiResponse(
        201,
        'Post created successfully',
        newPost
    ));
});

const getAllPost=asyncHandle(async(req,res)=>{
    const posts=await Post.find({})
    .populate('author','firstName lastName admNo email')
    .sort({createdAt:-1});

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        'All posts retrieved successfully',
        posts
    ));
});

const deletePost = asyncHandle(async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to delete this post');
  }

  await Post.findByIdAndDelete(postId);

  return res
    .status(200)
    .json(new ApiResponse(200, 'Post deleted successfully'));
});

export {
  createPost,
  getAllPost,
  deletePost
};


