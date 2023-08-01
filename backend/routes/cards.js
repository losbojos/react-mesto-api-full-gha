const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../validation/patterns');

const {
  createCard, getCards, getCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const celebrateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(urlPattern),
    }),
  }),
  createCard,
);

router.get('/', getCards);

router.get(
  '/:cardId',
  celebrateCardId,
  getCard,
);

router.delete(
  '/:cardId',
  celebrateCardId,
  deleteCard,
);

// поставить лайк карточке
router.put(
  '/:cardId/likes',
  celebrateCardId,
  likeCard,
);

// убрать лайк с карточки
router.delete(
  '/:cardId/likes',
  celebrateCardId,
  dislikeCard,
);

module.exports = router;
