const HttpError = require('@/errors/http');

module.exports = class NotFoundError extends HttpError {
  constructor(message = 'Не найдено') {
    super(404, message);
  }
};
