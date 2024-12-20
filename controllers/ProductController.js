// controllers/ProductController.js
const Product = require('../models/Product'); 
const Category = require('../models/Category'); 


// Получение всех продуктов
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Получение продуктов по категории
exports.getProductsByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const products = await Product.findAll({ where: { categoryId } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Добавление нового продукта
exports.addProduct = async (req, res) => {
  const { name, price, categoryId } = req.body; // Добавили categoryId
  try {
    // Проверка существования категории
    const category = await Category.findByPk(categoryId);
    if (!Category) {
      return res.status(400).json({ error: 'Category not found' });
    }

    // Создание продукта с привязкой к категории
    const product = await Product.create({ name, price, categoryId });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
