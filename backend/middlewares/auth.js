const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/AuthError');
const User = require('../models/user');

const JWT_SECRET = 'somethingverysecret-sdfsadfasdfsadflak';

const getJwtToken = (id) => jwt.sign(
  { _id: id },
  JWT_SECRET,
  { expiresIn: '1w' }, // токен будет просрочен через неделю
);

const checkJwtToken = (req, res, next) => {
  const token = req.cookies.jwt; // Ищем токен в куке

  if (!token) {
    next(new AuthError('Требуется аутентификация'));
  }

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      next(new AuthError());
    }

    User.findById(payload._id)
      .orFail(new AuthError())
      .then(() => {
        req.user = { _id: payload._id }; // записываем пейлоуд в объект запроса
        next(); // пропускаем запрос дальше
      })
      .catch(next);
  });
};

module.exports = { getJwtToken, checkJwtToken };
