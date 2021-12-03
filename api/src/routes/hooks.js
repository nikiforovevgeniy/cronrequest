const router = require('express').Router();
const { checkPermission, authenticate, validate, responseJSON } = require('@/routes/helpers');
const { validation: rules, getAll, getOne, create, update, remove } = require('@/controllers/hooks');

router.get(
	'/',
	authenticate('jwt'),
	checkPermission(({user}) => ({
		roles: user.role,
		permission: 'hooks:getAll',
	})),
	responseJSON(getAll)
);

router.get(
	'/:id',
	authenticate('jwt'),
	checkPermission(({user}) => ({
		roles: user.role,
		permission: 'hooks:getOne',
	})),
	responseJSON(getOne)
);

router.post(
	'/',
	authenticate('jwt'),
	checkPermission(({user}) => ({
		roles: user.role,
		permission: 'hooks:create',
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
		permission: 'hooks:update',
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
		permission: 'hooks:remove',
	})),
	responseJSON(remove)
);

module.exports = router;