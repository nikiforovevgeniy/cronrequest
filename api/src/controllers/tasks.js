const bookshelf = require('@/bookshelf');
const { Task, Variable } = require('@/models');

async function getAll({ user }) {
  return await Task.where({ user_id: user.id, completed: 0 }).fetchAll({
    withRelated: [
      {
        hook: function (query) {
          query.column('id', 'name');
        },
      },
    ],
    columns: ['id', 'name', 'start_at', 'hook_id'],
  });
}

async function getOne({ user, params: { id } }) {
  const task = await Task.forge({ id, user_id: user.id }).fetch();

  const variables = await Variable.where({ task_id: task.id })
    .fetchAll({
      require: false,
    })
    .reduce((result, variable) => {
      const name = variable.get('name');
      const value = variable.get('value');
      result[name] = value;
      return result;
    }, {});

  task.set({ variables });

  return task;
}

async function create({ user, body: { variables, ...data } }) {
  const transaction = await bookshelf.transaction();

  try {
    const task = await Task.forge(data).set({ user_id: user.id }).save(null, {
      transacting: transaction,
    });

    const variablesSavePromiseList = [];
    for (const variable in variables) {
      const savePromise = Variable.forge({
        task_id: task.id,
        name: variable,
        value: variables[variable],
      }).save(null, {
        transacting: transaction,
      });

      variablesSavePromiseList.push(savePromise);
    }
    await Promise.all(variablesSavePromiseList);

    transaction.commit();

    return getOne({ user, params: { id: task.id } });
  } catch (error) {
    transaction.rollback();
    throw error;
  }
}

async function update({ user, params: { id }, body: { variables, ...data } }) {
  const transaction = await bookshelf.transaction();

  try {
    const task = await Task.forge({ id }).save(data, {
      transacting: transaction,
    });

    await Variable.where({ task_id: id }).destroy({
      transacting: transaction,
      require: false,
    });

    const variablesSavePromiseList = [];
    for (const variable in variables) {
      const savePromise = Variable.forge({
        task_id: task.id,
        name: variable,
        value: variables[variable],
      }).save(null, {
        transacting: transaction,
      });

      variablesSavePromiseList.push(savePromise);
    }
    await Promise.all(variablesSavePromiseList);

    transaction.commit();

    return getOne({ user, params: { id } });
  } catch (error) {
    transaction.rollback();
    throw error;
  }
}

async function remove({ params: { id } }) {
  const transaction = await bookshelf.transaction();

  try {
    await Promise.all([
      Task.forge({ id }).destroy({
        transacting: transaction,
      }),
      Variable.where({ task_id: id }).destroy({
        transacting: transaction,
        require: false,
      }),
    ]);

    transaction.commit();

    return { id };
  } catch (error) {
    transaction.rollback();
    throw error;
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
