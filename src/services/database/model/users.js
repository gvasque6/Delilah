const crypto = require('crypto');
const path = require('path');
const { sequelize } = require(path.join(__dirname, '..', 'index.js'));
const { DataTypes } = require('sequelize');

const User = sequelize.define(
    'User',
    {
        full_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            set(password) {
                this.setDataValue('password', crypto.createHash('sha512').update(password).digest('hex'));
            }
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false,

    },

);

module.exports = User;