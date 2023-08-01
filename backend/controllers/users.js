const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');
const { InvalidDataError } = require('../errors/InvalidDataError');
const { AuthError } = require('../errors/AuthError');
const { STATUS_CREATED } = require('../errors/statusCodes');
const { getJwtToken } = require('../middlewares/auth');

const SALT_ROUNDS = 10;
const JWT_COOKIE = 'jwt';

const NOT_FOUND_USER_ERROR = 'Пользователь с указанным идентификатором не найден.';
const AUTH_WRONG_DATA = 'Неверные имя пользователя или пароль.';

/*
// Т.к. проверку регистронезависимую при создании попросили убрать, чтобы соответствовать ТЗ,
// то и здесь нужно убирать.

// регистронезависимый поиск email
const findUserByEmail = (email) => {
  const regex = new RegExp(`${email}`, 'i');
  return User.findOne({ email: { $regex: regex } });
};
*/
const findUserByEmail = (email) => User.findOne({ email });

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          res.status(STATUS_CREATED).send({
            _id: user._id,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
          } else if (err.name === 'ValidationError') {
            next(new InvalidDataError(err.message));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getById = (userId, res, next) => {
  User.findById(userId)
    .orFail(new NotFoundError())
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataError(`Ошибка конвертации: ${err.message}`));
      } else {
        next(err);
      }
    });
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  getById(userId, res, next);
};

const getMe = (req, res, next) => {
  getById(req.user._id, res, next);
};

const updateUser = (req, res, next, newValues) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, newValues, { new: true, runValidators: true })
    .orFail(new NotFoundError(NOT_FOUND_USER_ERROR))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError(err.message));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  updateUser(req, res, next, { name, about });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUser(req, res, next, { avatar });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  findUserByEmail(email).select('+password')
    .then((user) => {
      if (!user) {
        next(new AuthError(AUTH_WRONG_DATA));
      } else {
        bcrypt.compare(password, user.password)
          .then((success) => {
            if (!success) {
              next(new AuthError(AUTH_WRONG_DATA));
            } else {
              const token = getJwtToken(user._id);

              res
                // .cookie(JWT_COOKIE, token, {
                //   maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
                //   httpOnly: true,
                //   secure: true,
                //   sameSite: 'none', // 'strict'
                // })
                .status(200).send({
                  token,
                  user: {
                    _id: user._id,
                    name: user.name,
                    about: user.about,
                    avatar: user.avatar,
                    email: user.email,
                  },
                });
            }
          })
          .catch(next);
      }
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie(JWT_COOKIE).send({ message: 'Выход' });
};

module.exports = {
  createUser,
  login,
  logout,
  getUsers,
  getUser,
  getMe,
  updateProfile,
  updateAvatar,
};
