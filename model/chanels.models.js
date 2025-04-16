const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Channel = sequelize.define('Channel', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  chat_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  subscribers_count: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'channels',
  timestamps: false,
});

module.exports = Channel;