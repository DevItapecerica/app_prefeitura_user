import { create } from "domain";

export default (sequelize, DataTypes) => {

const Users = sequelize.define(
  "Users",
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
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    setor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    paranoid: true
  }
);

return Users
}
