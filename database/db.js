const Sequelize = require('sequelize');

const connection = new Sequelize('questions-db', 'root', 'aline123', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;
