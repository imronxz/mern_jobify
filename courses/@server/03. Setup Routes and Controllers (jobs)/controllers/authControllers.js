const register = async (req, res) => {
  res.send('Register fn')
};
const login = async (req, res) => {
  res.send('Login fn')
};
const updateUser = async (req, res) => {
  res.send('update user fn')
};

export { register, login, updateUser };
