import express from 'express';
import { signup, verifyEmail, signin } from '../controllers/users.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/verify/:uniqueString', verifyEmail);

router.post('/signin', signin);

export default router;

