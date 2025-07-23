const jwt = require("jsonwebtoken");
const config = require("../config/index");

exports.generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, config.JWT.ACCESS_SECRET, {
    expiresIn: config.JWT.ACCESS_EXPIRES_IN,
  });
};

exports.generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, config.JWT.REFRESH_SECRET, {
    expiresIn: config.JWT.REFRESH_EXPIRES_IN,
  });
};
