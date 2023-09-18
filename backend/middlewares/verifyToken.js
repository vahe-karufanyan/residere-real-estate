const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(403).json({ message: 'Not authorized. No token' });

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) return res.status(403).json({ message: 'Wrong or expired token' });
      else {
        req.user = data; // data = {id: user._id, agent: user.agent}
        next();
      }
    });
  }
};

module.exports = verifyToken;
