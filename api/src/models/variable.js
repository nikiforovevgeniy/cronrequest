const bookshelf = require('@/bookshelf');

const variable = bookshelf.model('Variable', {
  tableName: 'variables',
  uuid: true,
  task() {
    return this.belongsTo('Task');
  },
});

module.exports = variable;
