const Sequelize = require('sequelize');
const db = require('../db/connection');

const Event = db.define('event', {
    date: {
        type: Sequelize.DATE,
    },
    address: {
        type: Sequelize.STRING,
    },
    client: {
        type: Sequelize.STRING,
    }
});

module.exports = Event;