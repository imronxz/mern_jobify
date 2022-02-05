import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

import { BadRequestError, NotFoundError } from '../errors/index.js';

/**
 * description - Register a new user
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError('Harap isi semua form yang tersedia');
    }

    //* Check if email is already registered in database
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) throw new BadRequestError('Email sudah terdaftar');

    //* hash password
    // const hashedPassword = await bcrypt.hash(password, 12);

    //* create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    throw new NotFoundError(' User tidak ditemukan');
  }
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
