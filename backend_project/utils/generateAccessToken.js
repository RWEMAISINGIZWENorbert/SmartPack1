import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const generateAccessToken = async (userId) => {
  if (!process.env.ACCESS_TOKEN_SECRET_KEY) {
    throw new Error("Acess Token secret key is not found");
  }

  const user = await userModel.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const token = jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: '24h' }
  );

  return token
}