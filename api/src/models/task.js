const bookshelf = require('@/bookshelf');
const moment = require('moment');

const task = bookshelf.model('Task', {
  tableName: 'tasks',
  uuid: true,
  hook() {
    return this.belongsTo('Hook');
  },
  variables() {
    return this.hasMany('Variable');
  },
  user() {
    return this.belongsTo('User');
  },
});

module.exports = task;
