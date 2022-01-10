const { User } = require('../models');

const userData = [{
        "username": "ermi",
        "email": "ermi55@gmail.com",
        "password": "password1"
    },
    {
        "username": "kemal",
        "email": "kemal@gmail.com",
        "password": "password2"
    },
    {
        "username": "amare",
        "email": "amare34@gmail.com",
        "password": "password3"
    },
    {
        "username": "nancy",
        "email": "nancy@congress.com",
        "password": "password4"
    },
    {
        "username": "bernie",
        "email": "bernieS@congress.com",
        "password": "password5"
    },
    {
        "username": "mathias",
        "email": "mathiasDeligit@ajax.com",
        "password": "password6"
    }
]

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUsers;