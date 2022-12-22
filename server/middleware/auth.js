import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

export const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(403).send('Access Denied');
    }

    if (token.startsWith('Bearer')) {
      token = token.slice(7, token.length).trimStart();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
