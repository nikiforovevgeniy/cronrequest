module.exports = require('fs').readdirSync(__dirname).map(filename => {
	return filename.replace(/\.js/, '');
}).filter(name => {
	return name !== 'index';
}).reduce((models, name) => {
	const model = name[0].toUpperCase() + name.slice(1);
	models[model] = require(`@/models/${name}`);
	return models;
}, {});