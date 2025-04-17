const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MessageRead = sequelize.define('MessageRead', {
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
  read_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'message_reads',
  timestamps: false,
});

module.exports = MessageRead;