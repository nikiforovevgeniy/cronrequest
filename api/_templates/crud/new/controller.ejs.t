---
to: src/controllers/<%= h.inflection.pluralize(name) %>.js
---
const { check } = require('express-validator');
const { <%= Name %> } = require('@/models');

module.exports = {

	validation: {
		//
	},

	async getAll () {
		return await <%= Name %>.fetchAll();
	},

	async getOne ({ params: { id } }) {
		return await <%= Name %>.forge({id}).fetch();
	},

	async create ({ body: data }) {
		return await <%= Name %>.forge(data).save();
	},

	async update ({ params: { id }, body: data }) {
		return await <%= Name %>.forge({id}).save(data);
	},

	async remove ({ params: { id } }) {
		await <%= Name %>.forge({id}).destroy();
		return { id };
	},

}