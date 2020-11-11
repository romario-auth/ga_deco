const Sequelize = require('sequelize');
const db = require('../db/connection');

const Contract = db.define('contract', {
    event_id: {
        type: Sequelize.INTEGER,
    },
    article_id: {
        type: Sequelize.INTEGER,
    },
    value: {
        type: Sequelize.DOUBLE,
    }
});

module.exports = Contract