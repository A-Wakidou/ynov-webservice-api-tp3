const Sequelize = require('sequelize')
const db = require('../config/databaseConfig')

const users = db.define('users',
    {   
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull:false,
            autoIncrement: true
        },
        login: {
            type: Sequelize.STRING,
            allowNull:false
        },
        password: {
            type: Sequelize.STRING,
            allowNull:false
        },
        role: {
            type: Sequelize.STRING,
            allowNull:false           
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        underscored: true
    })


module.exports = users