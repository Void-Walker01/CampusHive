import express from 'express';
import upload from '../middlewares/multer.js';
import {signUp,login} from '../controllers/usercontrol.js';

const router = express.Router();

router.post('/signup', upload.single('profilePic'), signUp);
router.post('/login', login);


export default router;
