const jwt = require('jsonwebtoken');
const { jwtSecret } = require('@/config');

module.exports = {
  login({ user }, res) {
    const token = jwt.sign(user, jwtSecret, {
      expiresIn: '1d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
    });

    res.end();
  },

  logout(_, res) {
    res.clearCookie('jwt').end();
  },

  getMe({ user }) {
    return user;
  },
};
