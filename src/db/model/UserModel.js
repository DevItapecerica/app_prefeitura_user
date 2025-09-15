import { DataTypes } from "sequelize";
import db from "../context.js";

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    ramal: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "null",
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    setor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstLogin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    paranoid: true, // Habilita soft delete
  }
);

export default User;
