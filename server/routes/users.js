import express from 'express';
import { signup, verifyEmail } from '../controllers/users.js';

const router = express.Router();

router.post('/signup', signup);

router.get('/verify/:uniqueString', verifyEmail);

export default router;

