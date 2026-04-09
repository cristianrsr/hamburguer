'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      data : {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.NOW
      },
      mesa :{
        type : Sequelize.INTEGER,
        allowNull : false
      },
      nome_cliente :{
        type: Sequelize.STRING,
        allowNull : false
      },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
      deletedAt: { type: Sequelize.DATE } 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pedidos');
  }
};
