const Card = require('../models/card');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { InvalidDataError } = require('../errors/InvalidDataError');
const { STATUS_CREATED } = require('../errors/statusCodes');

const createCard = (req, res, next) => {
  const userId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => {
      res.status(STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError(err.message));
      } else {
        next(err);
      }
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const getCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new NotFoundError())
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id; // авторизованный пользователь

  Card.findById(cardId)
    .orFail(new NotFoundError())
    .then((card) => {
      if (!card.owner.equals(userId)) next(new ForbiddenError('Запрещено удалять карточки другого пользователя.'));
      else {
        Card.findByIdAndDelete(cardId).then((deletedCard) => {
          res.send(deletedCard);
        })
          .catch(next);
      }
    })
    .catch(next);
};

const updateCard = (req, res, next, newValues) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    newValues,
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError())
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError(err.message));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  const userId = req.user._id;
  const updateValues = { $addToSet: { likes: userId } }; // добавить _id в массив, если его там нет
  updateCard(req, res, next, updateValues);
};

const dislikeCard = (req, res, next) => {
  const userId = req.user._id;
  const updateValues = { $pull: { likes: userId } }; // убрать _id из массива
  updateCard(req, res, next, updateValues);
};

module.exports = {
  createCard,
  getCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
