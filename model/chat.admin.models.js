const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Chat = require("./chat.models");
const User = require("./user.model");

const ChatAdmins = sequelize.define(
  "ChatAdmins",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    can_edit_messages: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_delete_message: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_add_members: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_invite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_pin_messages: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    // promoted_at: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
  },
  {
    tableName: "chat_admins",
    timestamps: false,
  }
);

ChatAdmins.belongsTo(Chat);
Chat.hasMany(ChatAdmins);

ChatAdmins.belongsTo(User);
User.hasMany(ChatAdmins);

module.exports = ChatAdmins;
