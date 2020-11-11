const express   = require('express')
const router    = express.Router()
const Article   = require('../models/Article')

router.get('/list', (req, res) =>{
    Article.findAll({order: [
        ['id', 'DESC']
    ]})
    .then(articles => {
        res.send(articles);
    })
    .catch(err => console.log('Erro Articles get: ' + err))
})

// add Article
router.post('/add', (req, res) => {
    let {name, acquisition, paid, description} = req.body;

    // insert
    Article.create({
        name,
        acquisition,
        paid,
        description
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router