import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

/**
 * @register - Register a new user
 * Check if email is already registered in database,
   hash password,
   create new user,
   @create token: email & password correct,
   @token user.createJWT();
 */
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('Harap isi semua form yang tersedia');
  }

  // TODO: check if email is already registered
  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    throw new BadRequestError('Email sudah terdaftar');
  }
  // TODO: creating hashed brypted password
  const hashedPassword = await bcrypt.hash(password, 12);

  // TODO: store hashedPassword in user
  const user = await User.create({ name, email, password: hashedPassword });
  // TODO: create token -> email & password correct
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  // TODO: send data & status code with json
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
 * login - Login a user
 * Check if email is already registered in database,
   @compare : hash password,
   @create token: apabila email & password benar,
   @hide password from frontEnd endpoint

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
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  //! hide password from frontEnd endpoint
  user.password = undefined;
  // * send data & status code
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

/**
 * updateUser - Update user
 * @body : email, name, lastName, location
 * @user : await User.findOne({ _id: req.user.id})
 * @token : user.createJWT();
 */
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Harap isi semua form yang tersedia');
  }

  const user = await User.findOne({ _id: req.user.id });
  
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  
  await user.save();
  // const token = user.createJWT()

  const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
