const AUTH_ERROR_CODE = 401; // когда что-то не так при аутентификации или авторизации;
const AUTH_ERROR_NAME = 'AuthError';

class AuthError extends Error {
  constructor(message = 'Ошибка авторизации') {
    super(message);
    this.name = AUTH_ERROR_NAME;
    this.statusCode = AUTH_ERROR_CODE;
  }
}

module.exports = {
  AUTH_ERROR_CODE, AUTH_ERROR_NAME, AuthError,
};
