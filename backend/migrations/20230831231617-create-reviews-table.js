'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      note: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      clientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'clients',
          key: 'id'
        }
      },
      companyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'companies',
          key: 'id'
        }
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

    // Add a unique constraint on the combination of clientId and companyId
    await queryInterface.addConstraint('reviews', {
      type: 'unique',
      name: 'unique_review_client_company',
      fields: ['clientId', 'companyId']
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Remove the unique constraint before dropping the table
    await queryInterface.removeConstraint('reviews', 'unique_review_client_company');
    await queryInterface.dropTable('reviews');
  }
};
