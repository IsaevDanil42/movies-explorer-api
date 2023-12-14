const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUserInfo } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
users.get('/me', getUser);

// обновляет информацию о пользователе (email и имя)
users.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

module.exports = users;
