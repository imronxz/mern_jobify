import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
// TODO: dotenv
dotenv.config();

/**
 * description - Register a new user
 */
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('Harap isi semua form yang tersedia');
  }

  //* Check if email is already registered in database
  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    throw new BadRequestError('Email sudah terdaftar');
  }

  //* hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  //* create new user
  const user = await User.create({ name, email, password: hashedPassword });

  //* create token: email & password correct
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  // * const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};

/**
 * description - Login a user
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Harap isi semua form yang tersedia');
  }

  // * Check if email is already registered in database
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials Email or Password');
  }

  // * compare hash password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  // * Jika password salah
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials Password');
  }

  // * create token: apabila email & password benar
  const token = jwt.sign({ email: user.email, id: user._id, }
    , process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME },
  );

  //! hide password from frontEnd endpoint
  user.password = undefined;
  // * send data & status code
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
/**
 * description - Update user
 */
const updateUser = async (req, res) => {
  console.log(req.user);
  res.send('update user fn');
};

export { register, login, updateUser };
