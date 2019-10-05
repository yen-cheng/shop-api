const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    imgUrl: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
});

module.exports = Product;