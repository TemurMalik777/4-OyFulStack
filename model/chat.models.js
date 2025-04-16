const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Chat = sequelize.define('Chat', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  members_count: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
  },
  // created_at: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  //   defaultValue: DataTypes.NOW,
  // },
  // invite_link: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
}, {
  tableName: 'chat',
  timestamps: false,
});

module.exports = Chat;