const register = (req, res) => {
  res.send('Register fn')
};
const login = (req, res) => {
  res.send('Login fn')
};
const updateUser = (req, res) => {
  res.send('update user fn')
};

export { register, login, updateUser };
