const NOT_FOUND_ERROR_CODE = 404;
const NOT_FOUND_ERROR_NAME = 'NotFoundError';

class NotFoundError extends Error {
  constructor(message = 'Объект не найден') {
    super(message);
    this.name = NOT_FOUND_ERROR_NAME;
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
}

module.exports = {
  NOT_FOUND_ERROR_CODE, NOT_FOUND_ERROR_NAME, NotFoundError,
};
