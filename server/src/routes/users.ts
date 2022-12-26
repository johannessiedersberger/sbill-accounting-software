import express, { Router } from 'express';
import { signup, verifyEmail, signin } from '../controllers/users';

const router: Router = express.Router();

router.post('/signup', signup);

router.post('/verify/:uniqueString', verifyEmail);

router.post('/signin', signin);

export default router;

