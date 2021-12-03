const database = require('@/config/database');

module.exports = {
  port: process.env.SERVER_PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || Math.random().toString(),
  database,
};
