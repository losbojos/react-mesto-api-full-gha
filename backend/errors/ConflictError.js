// Не удается обработать запрос из-за конфликта в текущем состоянии ресурса.
const CONFLICT_ERROR_CODE = 409;
const CONFLICT_ERROR_NAME = 'ConflictError';

class ConflictError extends Error {
  constructor(message = 'Конфликт в состоянии ресурса.') {
    super(message);
    this.name = CONFLICT_ERROR_NAME;
    this.statusCode = CONFLICT_ERROR_CODE;
  }
}

module.exports = {
  CONFLICT_ERROR_CODE, CONFLICT_ERROR_NAME, ConflictError,
};
