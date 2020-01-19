const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const TodoList = sequelize.define('todolist', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content:{
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = TodoList;