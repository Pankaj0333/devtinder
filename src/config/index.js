require('dotenv').config();

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required but not set.`);
  }
  return value;
}

const config = Object.freeze({
  PORT: process.env.PORT || 5000,
  MONGO_URI: requireEnv('MONGO_URI'),
  JWT: {
    ACCESS_SECRET: requireEnv('JWT_SECRET_ACCESS'),
    REFRESH_SECRET: requireEnv('JWT_SECRET_REFRESH'),
    ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  // Add other config sections here as needed
});

module.exports = config;
