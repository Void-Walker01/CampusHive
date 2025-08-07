import express from 'express';
import upload from '../middlewares/multer.js';
import { signUp, login, currentUser, logout } from '../controllers/usercontrol.js';
import verifyJWT from '../middlewares/authmiddle.js';

const router = express.Router();

router.post('/signup', upload.single('profilePic'), signUp);
router.post('/login', login);
router.get('/currentuser', verifyJWT, currentUser);
router.post('/logout', verifyJWT, logout);

export default router;
