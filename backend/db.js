const Sequelize = require('sequelize');
require('dotenv').config({ path: require('find-config')('.env') });

const sequelize = new Sequelize({
    host: 'db', // Alteração aqui para o nome do serviço
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}