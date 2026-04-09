import { Sequelize } from 'sequelize';

module.exports = async function () {
  const env = process.env.NODE_ENV || 'development';
  const config = require('../config/config.json')[env];

  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );

  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco realizada com sucesso');
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error);
  }

  return sequelize;
};
