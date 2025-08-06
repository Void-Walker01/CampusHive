import express from 'express';
import {createPost,getAllPost,deletePost} from '../controllers/postcontrol.js';
import verifyJWT from '../middlewares/authmiddle.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/',verifyJWT,upload.single('image'),createPost);
router.get('/',verifyJWT,getAllPost);
router.delete('/:id',verifyJWT,deletePost);


export default router;
