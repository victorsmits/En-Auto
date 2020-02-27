require('dotenv').config();

module.exports = {
    development: {
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        host: process.env.host,
        dialect: 'mysql',
    },
    test: {
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        host: process.env.host,
        dialect: 'mysql',
    },
    production: {
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        host: process.env.host,
        dialect: 'mysql',
    },
};
