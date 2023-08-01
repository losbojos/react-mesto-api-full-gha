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
  // const token = req.cookies.jwt; // Ищем токен в куке
  const { authorization } = req.headers;

  if (!authorization) {
    next(new AuthError('Требуется авторизация'));
  }

  let token = null;
  if (authorization.startsWith('Bearer ')) {
    token = authorization.replace('Bearer ', '');
  }

  if (!token) {
    next(new AuthError('Токен не передан или передан не в том формате'));
  } else {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        next(new AuthError(err));
      }

      User.findById(payload._id)
        .orFail(new AuthError('Пользователь не найден'))
        .then(() => {
          req.user = { _id: payload._id }; // записываем пейлоуд в объект запроса
          next(); // пропускаем запрос дальше
        })
        .catch(next);
    });
  }
};

module.exports = { getJwtToken, checkJwtToken };
