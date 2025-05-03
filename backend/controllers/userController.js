const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  // Логируем полученные данные для отладки
  console.log('Полученные данные для регистрации:', req.body);

  // Проверяем, что все обязательные поля присутствуют
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Все поля (username, email, password) обязательны для заполнения' });
  }

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  // Логируем полученные данные для отладки
  console.log('Полученные данные для логина:', req.body);

  // Проверяем, что email и password присутствуют
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email и пароль обязательны для заполнения' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Неверные учетные данные' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Неверные учетные данные' });
    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error('Ошибка логина:', error);
    res.status(500).json({ error: error.message });
  }
};
