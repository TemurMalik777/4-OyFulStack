const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Message = require("./message.modesl");

const MessageEdit = sequelize.define(
  "MessageEdit",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    //   messageId: {
    //     type: DataTypes.BIGINT,
    //     allowNull: false,
    //   },
    previous_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    new_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    edited_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "message_edits",
    timestamps: false,
  }
);

MessageEdit.belongsTo(Message);
Message.hasMany(MessageEdit);

module.exports = MessageEdit;
