'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('entregas', {
      pedido_id :{
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true
      },
      codigo_rastreio:{
        type: Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      endereco :{
        type: Sequelize.STRING,
        allowNull : false
      },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
      deletedAt: { type: Sequelize.DATE }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('entregas');
  }
};
