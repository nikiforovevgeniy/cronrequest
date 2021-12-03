module.exports = {
  user: {
    can: [
      {
        name: 'users:getOne',
        when: async ({ user, params }) => {
          return user.id === params.id;
        },
      },
      'hooks:*',
      'tasks:*',
    ],
  },
  admin: {
    inherits: ['user'],
    can: ['users:getAll', 'users:getOne', 'users:create'],
  },
};
