import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  //! check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication invalid');
  }

  //! membuat 1 spasi setelah Bearer
  const token = authHeader.split(' ')[1];
  try {
    //! verify token(token, JWT_SECRET)
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    //! payload.id adalah id dari user yang login
    req.user = { id: payload.id };

    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

export default auth;
