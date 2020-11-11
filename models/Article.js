const Sequelize = require('sequelize');
const db = require('../db/connection');

const Article = db.define('article', {
    name: {
        type: Sequelize.STRING,
    },
    acquisition: {
        type: Sequelize.DATE,
    },
    paid: {
        type: Sequelize.DOUBLE,
    },
    description: {
        type: Sequelize.STRING,
    }

});

module.exports = Article;