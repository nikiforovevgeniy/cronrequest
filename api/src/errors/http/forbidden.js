const HttpError = require('@/errors/http');

module.exports = class ForbiddenError extends HttpError {
	constructor(message='Доступ запрещен') {
		super(403, message);
	}
}