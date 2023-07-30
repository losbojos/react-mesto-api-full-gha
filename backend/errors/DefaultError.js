const DEFAULT_ERROR_CODE = 500;
const DEFAULT_ERROR_NAME = 'DefaultError';

class DefaultError extends Error {
  constructor(statusCode = DEFAULT_ERROR_CODE, message = 'Ошибка на сервере') {
    super(message);
    this.name = DEFAULT_ERROR_NAME;
    this.statusCode = statusCode;
  }
}

module.exports = {
  DEFAULT_ERROR_CODE, DEFAULT_ERROR_NAME, DefaultError,
};
