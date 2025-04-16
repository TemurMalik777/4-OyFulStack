const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  display_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_blocked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: 'contacts',
  timestamps: false,
});

Contact.belongsTo(User)
User.hasMany(Contact)

module.exports = Contact;