const path = require('path');
const { Sequelize } = require('sequelize');
const conn = require(path.join(__dirname, 'config', 'index'));

const sequelize = new Sequelize({
    database: conn.DATABASE,
    dialect: conn.DIALECT,
    host: conn.HOST,
    password: conn.PASSWORD,
    port: conn.PORT,
    timezone: conn.TIMEZONE, 
    username: conn.USERNAME,
    logging: false,
    useUTC: false, 
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
    },
});

require('./model/index');

module.exports = { sequelize };