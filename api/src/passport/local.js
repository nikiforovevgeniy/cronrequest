const ForbiddenError = require('@/errors/http/forbidden');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('@/models');

module.exports = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	},
	async function(email, password, done) {
		try {
			const user = await User.forge({email}).fetch({require: false});
			if (!user) throw new ForbiddenError('Пользователь не найден');
			const passwordValid = await user.validatePassword(password);
			if (!passwordValid) throw new ForbiddenError('Неверный пароль');
			return done(null, user.serialize());
		} catch (error) {
			return done(error);
		}
	}
)