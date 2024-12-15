// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendActivationEmail } = require('../services/emailService');

// Регистрация пользователя
exports.register = async (req, res) => {
  const { email, password } = req.body;

  console.log("Email:", email);  // Добавим лог
  console.log("Password:", password); // Добавим лог


  try {
    // Проверка, существует ли уже пользователь
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Создание нового пользователя
    const user = await User.create({ email, password });

    // Генерация токена активации
    const activationToken = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });

    // Создание активационной ссылки
    const activationLink = `http://localhost:3000/api/activate/${activationToken}`;

    // Отправка письма
    await sendActivationEmail(user.email, activationLink);

    res.status(201).json({ message: 'Registration successful, please check your email (and also your Spam folder) to activate your account' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

// Активация аккаунта по токену
exports.activateAccount = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, 'secret_key'); // Проверка токена

    // Обновление статуса пользователя на активирован
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.isActive = true;
    await user.save();

    res.json({ message: `Email ${user.email} activated successfully!` });
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired activation token!' });
  }
};
