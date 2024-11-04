const sequelize = require('./database');
const Product = require('./models/Product');
const Category = require('./models/Category');

const init = async () => {
  await sequelize.sync({ force: true }); // Необходимо для создания таблиц

  // Создание категорий
  const foodCategory = await Category.create({ name: 'Еда' });
  const householdCategory = await Category.create({ name: 'Бытовая химия' });

  // Пример создания продуктов для категории "Еда"
  await Product.create({ name: 'Бананы', price: 150, categoryId: foodCategory.id });
  await Product.create({ name: 'Яблоки', price: 100, categoryId: foodCategory.id });
  await Product.create({ name: 'Молоко', price: 95, categoryId: foodCategory.id });
  await Product.create({ name: 'Апельсины', price: 155, categoryId: foodCategory.id });
  await Product.create({ name: 'Шоколад', price: 87, categoryId: foodCategory.id });
  await Product.create({ name: 'Вода 1л', price: 45, categoryId: foodCategory.id });

  // Пример создания продуктов для категории "Бытовая химия"
  await Product.create({ name: 'Мыло', price: 25, categoryId: householdCategory.id });
  await Product.create({ name: 'Стиральный порошок', price: 150, categoryId: householdCategory.id });
  await Product.create({ name: 'Бальзам для стирки', price: 176, categoryId: householdCategory.id });

  console.log('Database initialized');
};

init();
