const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Message = require("./message.modesl");

const MediaFile = sequelize.define(
  "MediaFile",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnailPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    duration: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    tableName: "media_files",
    timestamps: false,
  }
);

MediaFile.belongsTo(Message);
Message.belongsTo(MediaFile);

module.exports = MediaFile;
