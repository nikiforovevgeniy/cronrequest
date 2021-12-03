exports.seed = async function (knex) {
  await Promise.all([knex('users').truncate()]);

  await knex('users').insert([
    {
      id: '127d0ecc-e62e-43b2-9ece-6780e22eaabd',
      name: 'user',
      email: 'user@user.ru',
      password: '$2b$10$iP9ePnF78ye5MMaNRMUeOu7t7jxD5Q3tKxTqAmCptz9mtxFPCUtc2', //12345
      role: 'user',
    },
    {
      id: 'a436e036-2ed1-43fb-a56d-99e0fc5719a0',
      name: 'admin',
      email: 'admin@admin.ru',
      password: '$2b$10$iP9ePnF78ye5MMaNRMUeOu7t7jxD5Q3tKxTqAmCptz9mtxFPCUtc2', //12345
      role: 'admin',
    },
  ]);
};
