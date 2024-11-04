// server.js
const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./database'); // Подключение к базе данных
const productController = require('./controllers/ProductController'); // Проверьте путь

// Middleware для обработки JSON в теле запроса
app.use(express.json());

// Маршруты для получения и добавления продуктов
app.get('/api/products', productController.getProducts);
app.get('/api/products/category/:categoryId', productController.getProductsByCategory); // Новый маршрут
app.post('/api/products', productController.addProduct);

// Запуск сервера
app.listen(port, async () => {
  await sequelize.authenticate();
  console.log(`Server is running on http://localhost:${port}`);
});
