const { database } = require('@/config');

const knex = require('knex')(database);
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('bookshelf-uuid'));
bookshelf.plugin('bookshelf-virtuals-plugin');

module.exports = bookshelf;
