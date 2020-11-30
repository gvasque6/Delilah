const path = require('path');
const { sequelize } = require(path.join(__dirname, '..', 'index.js'));

const OrderStatus = sequelize.define(
    'OrderStatus',
    {
        timestamps: true,
        updatedAt: false
    }
);

module.exports = OrderStatus;