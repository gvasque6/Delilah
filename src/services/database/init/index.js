const path = require('path');

const {
    DishesList,
    PaymentType,
    SecurityType,
    StatusType,
    User,
} = require(path.join(__dirname, '..', 'model', 'index.js'));

module.exports = { populateBasicInfo };

async function populateBasicInfo() {
    
    await DishesList.bulkCreate([
        {
            name: 'Chiken Hamburger',
            name_short: 'ChHm',
            price: 25.25,
            img_path: './src/img/chickenham.png',
            is_available: true,
            description: 'A very tasty hamburger!'
        },
        {
            name: 'Hotdog',
            name_short: 'Hd',
            price: 11.77,
            img_path: './src/img/carne.png',
            is_available: true,
            description: 'A hotdog with tons of mustard!'
        }
    ]);

  
    await SecurityType.bulkCreate([
        {
            type: 'admin',
            description: 'Main admin'
        }, {
            type: 'user',
            description: 'regular user'
        }
    ]);


    await PaymentType.bulkCreate([
        {
            type: 'cash',
        }, {
            type: 'credit'
        }, {
            type: 'debit'
        }, {
            type: 'crypto'
        }
    ]);


    await StatusType.bulkCreate([
        {
            type: 'New',
            description: 'Nueva orden'
        }, {
            type: 'Confirmed',
            description: 'Orden Confirmada'
        }, {
            type: 'In Progress',
            description: 'Orden en progreso'
        }, {
            type: 'Sent',
            description: 'Orden enviada'
        }, {
            type: 'Received',
            description: 'Orden recibida'
        }, {
            type: 'Cancelled',
            description: 'Orden cancelada'
        }
    ]);

    await User.bulkCreate([
        {
            full_name: 'Andrea vasquez',
            username: 'admin',
            email: 'andreavl@hotmail.com',
            password: 'admin',
            phone: '+573057896523',
            address: 'Calle 33 88A 32',
            SecurityTypeId: (await SecurityType.findOne({ where: { type: 'admin' } })).get('id')
        },
        {
            full_name: 'Andrea Vasquez',
            username: 'adln',
            email: 'avasquez@gmail.com',
            password: 'anotherpassword',
            phone: '+5493455559333',
            address: 'Calle 2 sur #46 94',
            SecurityTypeId: (await SecurityType.findOne({ where: { type: 'user' } })).get('id')
        }
    ]);
};