'use strict';

/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      ramal: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      setor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      firstLogin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};