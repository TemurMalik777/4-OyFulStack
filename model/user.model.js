const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255)
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profil_photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_seem: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    refresh_token: {
      type: DataTypes.STRING(500),
    },
  },
  {
    tableName: "users",
    timestamps: false, // agar createdAt va updatedAt kerak bo'lmasa
  }
);

module.exports = User;
