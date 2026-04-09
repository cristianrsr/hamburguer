'use strict';

/** @type {import('sequelize-cli').Migration} */
export default{
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('produtos', 
      { 
        id:{
          type : Sequelize.INTEGER,
          allowNull : false,
          primaryKey : true
        },
        nome: { type: Sequelize.STRING, allowNull: false },
        descricao: { type: Sequelize.TEXT },
        preco: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
        disponivel: { type: Sequelize.BOOLEAN, defaultValue: true },
        categoriaId: {
          type: Sequelize.INTEGER,
          references: { model: 'categorias', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        createdAt: { type: Sequelize.DATE },
        updatedAt: { type: Sequelize.DATE },
        deletedAt: { type: Sequelize.DATE } 
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('produtos');
  }
};
