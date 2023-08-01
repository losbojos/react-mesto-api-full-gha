const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const dotenv = require('dotenv');
const { addMiddlewares } = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

// Добавляем переменные окружения из файла .env,
// который должен присутствовать только на физическом сервере, не в репозитории.
dotenv.config();

// подключаемся к серверу mongo
mongoose.connect('mongodb://0.0.0.0:27017/mestodb', { useNewUrlParser: true });
// IP = 0.0.0.0 вместо localhost для решения проблемы: MongoError: connect ECONNREFUSED
// https://stackoverflow.com/questions/46523321/mongoerror-connect-econnrefused-127-0-0-127017

// подключаем мидлвары, включая роуты и всё остальное...
addMiddlewares(app);

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin}: Произошла необработанная ошибка ${err.name} с текстом "${err.message}". Обратите внимание!`);
});

app.listen(PORT, () => {
  console.log(`Запущен сервер с портом ${PORT}`);
});
