import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username === '' || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  if (!hashedPassword) {
    next(errorHandler(500, 'Failed to hash password'));
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const user = await newUser.save();
    res.json({ message: 'Signup successfully', userId: user._id });
  } catch (error) {
    next(errorHandler(500, 'Failed to save user'));
  }
};