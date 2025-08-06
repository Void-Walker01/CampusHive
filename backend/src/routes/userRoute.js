import express from 'express';
import upload from '../middlewares/multer.js';
import {signUp} from '../controllers/usercontrol.js';

const router = express.Router();

router.post('/signup', upload.single('profilePic'), signUp);

export default router;
