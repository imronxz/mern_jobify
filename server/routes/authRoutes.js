import express from 'express';
const router = express.Router();

import { register, login, updateUser } from '../controllers/authControllers.js';

router.get('/register', register);
router.get('/login', login);

router.patch('/updateUser', updateUser);

export default router;
