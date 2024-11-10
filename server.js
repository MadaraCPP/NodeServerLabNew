// server.js
const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./database'); // Подключение к базе данных
const productController = require('./controllers/ProductController'); 
const categoryController = require('./controllers/CategoryController');
const uploadController = require('./controllers/UploadController');
const path = require('path');


// Middleware для обработки JSON в теле запроса
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsPath = '/c/ProgaZadaniya/Tkachev v2/uploads'; // Путь к папке uploads

// Маршруты для получения и добавления продуктов и категорий
app.get('/api/products', productController.getProducts);
app.get('/api/category/:categoryId/products', productController.getProductsByCategory); // Вывод продуктов по Id категории
app.post('/api/products', productController.addProduct);
app.get('/api/categories', categoryController.getCategories); // Новый маршрут для получения всех категорий
app.post('/api/categories', categoryController.addCategory); // Маршрут для добавления категории

// Маршрут для загрузки файлов
app.post('/api/upload', uploadController.uploadFile);

// Раздача статических файлов из папки uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Запуск сервера
app.listen(port, async () => {
  try {
    await sequelize.authenticate(); // Проверка соединения
    await sequelize.sync( ); // Синхронизация таблиц
    console.log('Database synced successfully');
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});