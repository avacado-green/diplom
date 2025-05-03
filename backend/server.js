const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Загрузка переменных окружения
dotenv.config();

// Подключение к базе данных
connectDB();

const app = express();

// Middleware: обработка JSON и включение CORS.
// Разрешены запросы только с http://localhost:3000
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Регистрация маршрутов
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));

// Обработка несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

// Глобальный обработчик ошибок
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

