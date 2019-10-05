const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-shop', 'root', 'mysqlpwd1221', {
    dialect: 'mysql', host: 'localhost'
});

module.exports = sequelize;