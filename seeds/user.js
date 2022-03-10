const { img_num } = require('../utils/helpers');
const userData = [{
        "username": "Sal",
        "password": "password12345",
        "img_url": img_num()
    },
    {
        "username": "Lernantino",
        "password": "password12345",
        "img_url": img_num()
    },
    {
        "username": "Amiko",
        "password": "password12345",
        "img_url": img_num()
    }
]
module.exports = userData