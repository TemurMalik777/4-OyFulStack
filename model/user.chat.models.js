const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserChat = sequelize.define('UserChat', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
//   userId: {
//     type: DataTypes.BIGINT,
//     allowNull: false,
//   },
  chatId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  joined_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'user_chats',
  timestamps: false,
});

module.exports = UserChat;