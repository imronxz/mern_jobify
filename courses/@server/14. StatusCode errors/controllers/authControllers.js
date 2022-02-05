import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

import { BadRequestError } from '../errors/index.js';

/**
 * description - Register a new user
 */
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('Harap isi semua form yang tersedia');
  }

  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({ user });
};
/**
 * description - Login a user
 */
const login = async (req, res) => {
  res.send('Login fn');
};
/**
 * description - Update user
 */
const updateUser = async (req, res) => {
  res.send('update user fn');
};

export { register, login, updateUser };
