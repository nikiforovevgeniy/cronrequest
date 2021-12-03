const bcrypt = require('bcrypt');
const bookshelf = require('@/bookshelf');

const user = bookshelf.model('User', {
  tableName: 'users',
  uuid: true,
  hidden: ['password'],
  validatePassword(password) {
    return bcrypt.compare(password, this.get('password'));
  },
  hooks() {
    return this.hasMany('Hook');
  },
  tasks() {
    return this.hasMany('Task');
  },
});

module.exports = user;
