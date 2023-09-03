'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      owner: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      cnpj: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING(14)
      },
      cep: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(8)
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING(8)
      },
      whatsapp: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(11)
      },
      email: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING
      },
      site: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING
      },
      instagram: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING
      },
      facebook: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING
      },
      desc: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      profile_picture_address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('companies');
  }
};
