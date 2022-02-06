import express from 'express';
const router = express.Router();

import { register, login, updateUser } from '../controllers/authControllers.js';
import authenticateUser from '../middleware/auth.js';

router.post('/register', register);
router.post('/login', login);

router.patch('/updateUser', authenticateUser, updateUser);

export default router;
