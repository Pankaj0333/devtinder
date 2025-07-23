const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticate = async (req, res, next) => {
  try {
    let token;

    // Prefer HTTP-only cookie for web clients
    if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      // Fallback for API clients
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, config.JWT.ACCESS_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;


