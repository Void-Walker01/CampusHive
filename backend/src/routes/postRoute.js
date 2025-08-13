import express from 'express';
import { createPost, getAllPost, deletePost, updatePost,likeUnlikePost } from '../controllers/postcontrol.js';
import verifyJWT from '../middlewares/authmiddle.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/', verifyJWT, upload.single('image'), createPost);
router.get('/', verifyJWT, getAllPost);
router.delete('/:id', verifyJWT, deletePost);
router.patch('/:id', verifyJWT, upload.single('image'), updatePost);
router.put('/:id/like',verifyJWT,likeUnlikePost);


export default router;