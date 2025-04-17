const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChannelPost = sequelize.define('ChannelPost', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
//   channelId: {
//     type: DataTypes.BIGINT,
//     allowNull: false,
//   },
//   messageId: {
//     type: DataTypes.BIGINT,
//     allowNull: false,
//   },
  views_count: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'channel_post',
  timestamps: false,
});

module.exports = ChannelPost;