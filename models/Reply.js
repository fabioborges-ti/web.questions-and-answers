const Sequelize = require('sequelize');
const connection = require('../database/db');

const Reply = connection.define('replies', {
  reply: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

Reply.sync({
  force: false
});

module.exports = Reply;
