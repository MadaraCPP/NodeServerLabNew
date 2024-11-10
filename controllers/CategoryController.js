const Category = require('../models/Category');

// Получение всех категорий
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Добавление новой категории
exports.addCategory = async (req, res) => {
    const { name } = req.body;
  
    try {
      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }
  
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };