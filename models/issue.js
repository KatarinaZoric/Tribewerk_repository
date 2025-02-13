const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Agent = require('./agent');

const Issue = sequelize.define('Issue', {
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'resolved'),
    defaultValue: 'pending'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  resolved_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
    tableName: 'issues',
    timestamps: false, 
    freezeTableName: true,
    underscored: true 
  });

Issue.belongsTo(Agent, { foreignKey: 'assigned_agent_id' });
Agent.hasMany(Issue, { foreignKey: 'assigned_agent_id' });

module.exports = Issue;
