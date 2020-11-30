const path = require('path');
const { sequelize } = require(path.join(__dirname, '..', 'index.js'));
const { DataTypes } = require('sequelize');

const SecurityType = sequelize.define(
    'SecurityType',
    {
        type: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false
    }
);

module.exports = SecurityType;