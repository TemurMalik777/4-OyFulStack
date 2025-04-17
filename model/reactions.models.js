const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reaction = sequelize.define('Reaction', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
//   messageId: {
//     type: DataTypes.BIGINT,
//     allowNull: false,
//   },
//   userId: {
//     type: DataTypes.BIGINT,
//     allowNull: false,
//   },
  emoji: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reacted_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'reactions',
  timestamps: false,
});

module.exports = Reaction;