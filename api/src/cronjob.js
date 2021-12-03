const { Task, Variable, Hook } = require('@/models');
const { CronJob } = require('cron');
const cronParser = require('cron-parser');
const moment = require('moment');
const axios = require('axios');

function parse(str) {
  let value = {};
  try {
    value = JSON.parse(str);
  } catch {}
  return value;
}

function replace(str, variables) {
  for (const variable in variables) {
    const regexp = new RegExp(`\\$${variable}`, 'g');
    str = str?.replace(regexp, variables[variable]);
  }
  return str;
}

function getVariables(id) {
  return Variable.where({ task_id: id })
    .fetchAll({
      require: false,
    })
    .reduce((result, variable) => {
      const { name, value } = variable.serialize();
      result[name] = value;
      return result;
    }, {});
}

function getHook(id, variables) {
  return Hook.forge({ id })
    .fetch()
    .then((hook) => {
      hook = hook.serialize();

      return {
        ...hook,
        data: parse(replace(hook.body, variables)),
        params: parse(replace(hook.query, variables)),
        headers: parse(replace(hook.headers, variables)),
      };
    });
}

function updateTask(task) {
  const id = task.id;
  const repeat_cnt =
    task.repeat_cnt > 0 ? task.repeat_cnt - 1 : task.repeat_cnt;
  const start_at = (() => {
    if (task.repeat_cnt === 0 || !task.crontime) return task.start_at;
    const interval = cronParser.parseExpression(task.crontime);
    const nextStart = interval.next().toDate();
    return nextStart
      ? moment(nextStart).format('YYYY-MM-DD HH:mm')
      : task.start_at;
  })();
  const completed = task.repeat_cnt === 0;

  return Task.forge({ id }).save({
    repeat_cnt,
    start_at,
    completed,
  });
}

new CronJob(
  '* * * * * *',
  async function () {
    const tasks = await Task.where('completed', 0)
      .where('start_at', '<=', moment().format('YYYY-MM-DD HH:mm'))
      .fetchAll();

    tasks.forEach(async (task) => {
      task = task.serialize();
      const variables = await getVariables(task.id);
      const hook = await getHook(task.hook_id, variables);
      axios.request(hook);
      await updateTask(task);
    });
  },
  null,
  true
);
