import express from 'express';

import { register, login, updateUser } from '../controllers/authControllers.js';
const router = express.Router()


router.get('/register', register);
router.get('/login', login);

router.patch('/updateUser', updateUser);

export default router;