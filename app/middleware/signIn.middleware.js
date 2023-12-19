import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'create account' });
    }
    const decodedToken = jwt.verify(token, 'MY_SECRET_KEY');

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'create account' });
  }
};
