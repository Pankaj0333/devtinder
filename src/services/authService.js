const bcrypt = require("bcrypt");
const User = require("../models/User");
const Token = require("../models/Token");
const { registerSchema, loginSchema } = require("../validators/authSchema");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const AppError = require("../utils/AppError");

exports.register = async (registerData) => {
  console.log("Registering user with data:", registerData);
  const parsed = registerSchema.safeParse(registerData);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }

  const { name, email, password } = parsed.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await Token.create({
    userId: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    user: { id: user._id, name: user.name, email: user.email },
    accessToken,
    refreshToken,
  };
};

exports.login = async (loginData) => {
  const parsed = loginSchema.safeParse(loginData);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }

  const { email, password } = loginData;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  await Token.findOneAndUpdate(
    { userId: user._id },
    {
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    { upsert: true, new: true }
  );

  return {
    user: { id: user._id, name: user.name, email: user.email },
    accessToken,
    refreshToken,
  };
};
