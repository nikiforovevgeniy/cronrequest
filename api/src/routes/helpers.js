const passport = require('passport');
const rbac = require('@/rbac');
const notFoundError = require('@/errors/http/notFound');
const { validationResult } = require('express-validator');

const checkPermission = function (fn) {
  return async function (req, res, next) {
    try {
      const { roles, permission } = fn(req);
      const result = await rbac.can(roles, permission, req);
      if (!result) throw new notFoundError();
      next();
    } catch (error) {
      next(error);
    }
  };
};

const authenticate = function (strategy, options = {}) {
  return passport.authenticate(strategy, {
    session: false,
    ...strategy,
  });
};

const validate = function (rules) {
  return async function (req, res, next) {
    await Promise.all(rules.map((rule) => rule.run(req)));

    try {
      validationResult(req).throw();
      next();
    } catch (error) {
      const [{ param, msg }] = validationResult(req).array();
      next(new Error(msg));
    }
  };
};

const responseJSON = function (fn) {
  return async function (req, res, next) {
    try {
      const result = await fn(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  checkPermission,
  authenticate,
  validate,
  responseJSON,
};
