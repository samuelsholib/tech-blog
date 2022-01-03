const { User } = require('../models');

const userData = [{
        "username": "ermi",
        "email": "ermi55@gmail.com",
        "password": "p@ssword1"
    },
    {
        "username": "kemal",
        "email": "kemal@gmail.com",
        "password": "p@ssword2"
    },
    {
        "username": "amare",
        "email": "amare34@gmail.com",
        "password": "p@ssword3"
    },
    {
        "username": "nancy",
        "email": "nancy@congress.com",
        "password": "p@ssword4"
    },
    {
        "username": "bernie",
        "email": "bernieS@congress.com",
        "password": "p@ssword5"
    },
    {
        "username": "mathias",
        "email": "mathiasDeligit@ajax.com",
        "password": "p@ssword6"
    }
]

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUsers;