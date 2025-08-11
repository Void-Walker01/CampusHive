import express from 'express';
import { createPost, getAllPost, deletePost, updatePost } from '../controllers/postcontrol.js';
import verifyJWT from '../middlewares/authmiddle.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/', verifyJWT, upload.single('image'), createPost);
router.get('/', verifyJWT, getAllPost);
router.delete('/:id', verifyJWT, deletePost);
router.patch('/:id', verifyJWT, upload.single('image'), updatePost);


export default router;