const { check } = require('express-validator');
const { User } = require('@/models');

module.exports = {
  validation: {
    firstName: check('firstName')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Имя не указано'),
    lastName: check('lastName')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Фамилия не указана'),
    email: check('email')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Email не указан')
      .isEmail()
      .withMessage('Email невалидный'),
  },

  async getOne({ params: { id } }) {
    return await User.forge({ id }).fetch();
  },

  async getAll() {
    return await User.fetchAll();
  },

  async create({ body: data }) {
    return await User.forge(data).save();
  },
};
