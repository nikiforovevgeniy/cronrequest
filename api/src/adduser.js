require('module-alias/register');
require('dotenv').config();

const bcrypt = require('bcrypt');
const { User } = require('@/models');

const [name, email, password] = process.argv.slice(2);

if (!name || !email || !password) throw new Error('no args');

bcrypt
  .hash(password, 10)
  .then((password) => {
    return User.forge({
      name,
      email,
      password,
      role: 'user',
    }).save();
  })
  .then((user) => {
    console.log(user.toJSON());
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    process.exit();
  });
