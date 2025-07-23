const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL); // or local default

module.exports = redis;
