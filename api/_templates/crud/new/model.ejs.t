---
to: src/models/<%= name %>.js
---
const bookshelf = require('@/bookshelf');

const <%= name %> = bookshelf.model('<%= h.inflection.capitalize(name) %>', {
	tableName: '<%= h.inflection.pluralize(name) %>',
});

module.exports = <%= name %>;