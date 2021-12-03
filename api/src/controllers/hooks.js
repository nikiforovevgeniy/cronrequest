const { check } = require('express-validator');
const { Hook } = require('@/models');

module.exports = {
  validation: {
    //
  },

  async getAll({ user }) {
    return await Hook.where({ user_id: user.id })
      .fetchAll({
        columns: ['id', 'name', 'url', 'method', 'headers', 'query', 'body'],
      })
      .then((model) => {
        return model.toJSON({
          hidden: ['headers', 'query', 'body'],
        });
      });
  },

  async getOne({ user, params: { id } }) {
    return await Hook.forge({ id, user_id: user.id }).fetch();
  },

  async create({ user, body: data }) {
    return await Hook.forge(data).set({ user_id: user.id }).save();
  },

  async update({ params: { id }, body: data }) {
    return await Hook.forge({ id }).save(data);
  },

  async remove({ params: { id } }) {
    await Hook.forge({ id }).destroy();
    return { id };
  },
};
