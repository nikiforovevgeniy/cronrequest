---
to: src/routes/<%= h.inflection.pluralize(name) %>.js
---
const router = require('express').Router();
const { checkPermission, authenticate, validate, responseJSON } = require('@/routes/helpers');
const { validation: rules, getAll, getOne, create, update, remove } = require('@/controllers/<%= h.inflection.pluralize(name) %>');

router.get(
	'/',
	authenticate('jwt'),
	checkPermission(({user}) => ({
		roles: user.role,
		permission: '<%= h.inflection.pluralize(name) %>:getAll',
	})),
	responseJSON(getAll)
);

router.get(
	'/:id',
	authenticate('jwt'),
	checkPermission(({user}) => ({
		roles: user.role,
		permission: '<%= h.inflection.pluralize(name) %>:getOne',
	})),
	responseJSON(getOne)
);

router.post(
	'/',
	authenticate('jwt'),
	checkPermission(({user}) => ({
		roles: user.role,
		permission: '<%= h.inflection.pluralize(name) %>:create',
	})),
	validate([
		// ...fields
	]),
	responseJSON(create)
);

router.patch(
	'/:id',
	authenticate('jwt'),
	checkPermission(({user}) => ({
		roles: user.role,
		permission: '<%= h.inflection.pluralize(name) %>:update',
	})),
	validate([
		// ...fields
	]),
	responseJSON(update)
);

router.delete(
	'/:id',
	authenticate('jwt'),
	checkPermission(({user}) => ({
		roles: user.role,
		permission: '<%= h.inflection.pluralize(name) %>:remove',
	})),
	responseJSON(remove)
);

module.exports = router;