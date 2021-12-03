const router = require('express').Router();
const {
  checkPermission,
  authenticate,
  validate,
  responseJSON,
} = require('@/routes/helpers');
const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require('@/controllers/tasks');

router.get(
  '/',
  authenticate('jwt'),
  checkPermission(({ user }) => ({
    roles: user.role,
    permission: 'tasks:getAll',
  })),
  responseJSON(getAll)
);

router.get(
  '/:id',
  authenticate('jwt'),
  checkPermission(({ user }) => ({
    roles: user.role,
    permission: 'tasks:getOne',
  })),
  responseJSON(getOne)
);

router.post(
  '/',
  authenticate('jwt'),
  checkPermission(({ user }) => ({
    roles: user.role,
    permission: 'tasks:create',
  })),
  validate([
    // ...fields
  ]),
  responseJSON(create)
);

router.patch(
  '/:id',
  authenticate('jwt'),
  checkPermission(({ user }) => ({
    roles: user.role,
    permission: 'tasks:update',
  })),
  validate([
    // ...fields
  ]),
  responseJSON(update)
);

router.delete(
  '/:id',
  authenticate('jwt'),
  checkPermission(({ user }) => ({
    roles: user.role,
    permission: 'tasks:remove',
  })),
  responseJSON(remove)
);

module.exports = router;
