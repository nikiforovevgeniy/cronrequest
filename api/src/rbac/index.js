const RBAC = require('easy-rbac');
const permissions = require('./permissions')

module.exports = new RBAC(permissions);