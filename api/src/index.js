require('module-alias/register');
require('dotenv').config();

const config = require('@/config');

(async () => {
  try {
    require('@/server').listen(config.port);
    require('@/rbac');
    require('@/passport');
    require('@/routes');
    require('@/cronjob');
  } catch (error) {
    console.error(error);
  }
})();
