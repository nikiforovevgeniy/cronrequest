exports.seed = async function (knex) {
  await Promise.all([knex('hooks').truncate()]);

  await knex('hooks').insert([
    {
      id: '56e482b2-4686-4446-bb9c-e166afea497c',
      user_id: '127d0ecc-e62e-43b2-9ece-6780e22eaabd',
      name: 'тестовое уведомление',
      url: 'http://localhost:3000/tg',
      method: 'post',
      body: JSON.stringify({ message: '$message' }),
      query: null,
      headers: JSON.stringify({
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjotMTAwMTY5MzYwODQ4NSwiaWF0IjoxNjMzNzEyMTkyfQ.nXQ2R8fkED_fd9d0NPoBhZuWbMEzGNq4LMX1Rz2bdLY',
      }),
    },
  ]);
};
