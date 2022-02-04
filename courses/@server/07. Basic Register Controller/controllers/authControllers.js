import User from '../models/User.js';

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: 'There was an error creating the user' });
  }
};
const login = async (req, res) => {
  res.send('Login fn');
};
const updateUser = async (req, res) => {
  res.send('update user fn');
};

export { register, login, updateUser };
