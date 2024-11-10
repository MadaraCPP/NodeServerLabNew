const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Category = require('./Category');

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
    field: 'categoryId'  // Явное указание имени столбца
  },
}, {
  sequelize,
  modelName: 'Product',
});

// Объявляем связь
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;
