const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../validation/patterns');

const {
  getUsers, getUser, getMe, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers); // Получить список всех пользователей

router.get('/me', getMe); // Получить информацию о себе (текущий авторизовавшийся пользователь)

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  getUser,
); // Получить пользователя по идентификатору

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
); // обновляет профиль

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(urlPattern),
    }),
  }),
  updateAvatar,
); // обновляет аватар

module.exports = router;
