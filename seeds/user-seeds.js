const { User } = require('../models');

const userData = [{
        "username": "Ermi Dejene",
        "email": "ermi55@gmail.com",
        "password": "password1"
    },
    {
        "username": "Jemal yosef",
        "email": "kemal@gmail.com",
        "password": "password2"
    },
    {
        "username": "Tadesse Galpok",
        "email": "amare34@gmail.com",
        "password": "password3"
    },
    {
        "username": "Nancy Batman",
        "email": "nancy@congress.com",
        "password": "password4"
    },
    {
        "username": "Bernie Thompson",
        "email": "bernieS@congress.com",
        "password": "password5"
    },
    {
        "username": "Mathias DeLigit",
        "email": "mathiasDeligit@ajax.com",
        "password": "password6"
    }
]

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUsers;