const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_server', 'postgres', '26042001', {
  host: 'localhost',
  dialect: 'postgres',
});

// Проверка подключения
const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

authenticateDatabase();

module.exports = sequelize;

//console.log(sequelize instanceof Sequelize); // Это должно вывести true
