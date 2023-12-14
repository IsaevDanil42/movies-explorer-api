const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

// создаёт пользователя с переданными в теле
// email, password и name
routes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

// проверяет переданные в теле почту и пароль
// и возвращает JWT
routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

routes.use(auth);
routes.use('/users', users);

routes.use('/movies', movies);

routes.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует'));
});

module.exports = routes;
