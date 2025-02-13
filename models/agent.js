const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Agent = sequelize.define('Agent', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('available', 'busy'),
      allowNull: false
    }
   
  }, {
    tableName: 'agents', 
    freezeTableName: true,
    underscored: true,
    timestamps: true
  });
  
  module.exports = Agent;
  
