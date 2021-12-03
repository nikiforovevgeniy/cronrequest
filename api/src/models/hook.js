const bookshelf = require('@/bookshelf');

const hook = bookshelf.model('Hook', {
  tableName: 'hooks',
  uuid: true,
  virtuals: {
    variables() {
      const headers = this.get('headers');
      const query = this.get('query');
      const body = this.get('body');

      const matchList = `${headers}${query}${body}`.matchAll(/\$\w+/g);

      const variableList = new Set();

      for (const [variable] of matchList) {
        const variableName = variable.substr(1);
        variableList.add(variableName);
      }

      return Array.from(variableList);
    },
  },
  user() {
    return this.belongsTo('User');
  },
});

module.exports = hook;
