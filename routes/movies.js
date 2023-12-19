const movies = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
movies.get('', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image,
// trailer, nameRU, nameEN и thumbnail, movieId
movies.post('', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern((/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/)),
    trailerLink: Joi.string().required().pattern((/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/)),
    thumbnail: Joi.string().required().pattern((/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/)),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

// удаляет сохранённый фильм по id
movies.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = movies;
