const INVALID_DATA_ERROR_CODE = 400;
const INVALID_DATA_ERROR_NAME = 'InvalidDataError';

class InvalidDataError extends Error {
  constructor(message = 'Переданы некорректные данные') {
    super(message);
    this.name = INVALID_DATA_ERROR_NAME;
    this.statusCode = INVALID_DATA_ERROR_CODE;
  }
}

module.exports = {
  INVALID_DATA_ERROR_CODE, INVALID_DATA_ERROR_NAME, InvalidDataError,
};
