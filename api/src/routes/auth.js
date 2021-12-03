const router = require('express').Router();
const { check } = require('express-validator');
const { authenticate, validate, responseJSON } = require('@/routes/helpers');
const { login, logout, getMe } = require('@/controllers/auth');

router.post(
  '/login',
  validate([
    check('email')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Email не указан')
      .isEmail()
      .withMessage('Неверный формат email'),
    check('password')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Пароль не указан'),
  ]),
  authenticate('local'),
  login
);

router.post('/logout', logout);

router.post('/me', authenticate('jwt'), responseJSON(getMe));

module.exports = router;
