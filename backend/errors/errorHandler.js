const { DEFAULT_ERROR_CODE } = require('./DefaultError');

const errorHandler = (err, req, res, next) => {
  let statusCode;
  let message;

  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    statusCode = DEFAULT_ERROR_CODE;
    message = `Ошибка на сервере: ${err.message}`;
  }

  res
    .status(statusCode)
    .send({
      message,
    });

  next();
};

module.exports = { errorHandler };
