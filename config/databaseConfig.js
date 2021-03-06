require('dotenv').config()
const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD,{
    host: 'localhost',
    dialect:'mysql',
    port: process.env.DATABASE_PORT,
    logging: false
})