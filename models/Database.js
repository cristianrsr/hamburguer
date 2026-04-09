'use strict';
import { Sequelize } from 'sequelize';
import process from 'process';
import 'dotenv/config'; // Carrega as variáveis do .env automaticamente

// Configuração direta pelo process.env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false, // Opcional: limpa o console
  }
);


export default sequelize;