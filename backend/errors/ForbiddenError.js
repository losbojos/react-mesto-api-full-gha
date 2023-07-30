// стандартный код ответа HTTP, означающий, что доступ к запрошенному ресурсу запрещен
const FORBIDDEN_ERROR_CODE = 403;
const FORBIDDEN_ERROR_NAME = 'ForbiddenError';

class ForbiddenError extends Error {
  constructor(message = 'Доступ к запрошенному ресурсу запрещен') {
    super(message);
    this.name = FORBIDDEN_ERROR_NAME;
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}

module.exports = {
  FORBIDDEN_ERROR_CODE, FORBIDDEN_ERROR_NAME, ForbiddenError,
};
