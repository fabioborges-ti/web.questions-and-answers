const Sequelize = require('sequelize');
const connection = require('../database/db');

const Question = connection.define('questions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Question
  .sync({ 
    force: false 
  })
  .then(() => {
    console.log('Scheme Question created successfully.')    
  });

module.exports = Question;
