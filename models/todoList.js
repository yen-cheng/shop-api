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
    detail:{
        type: Sequelize.STRING
    },
    type:{
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = TodoList;