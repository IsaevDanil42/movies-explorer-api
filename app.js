require('dotenv').config();
const express = require('express');
const { mongoose } = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
