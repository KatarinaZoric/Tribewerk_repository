const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('tw', 'postgres', 'katarina0506', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = { sequelize };
