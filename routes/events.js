const express   = require('express')
const router    = express.Router()
const Event     = require('../models/Event')

//List Event
router.get('/list', (req, res) => {
    Event.findAll({order: [
        ['id', 'DESC']
    ]})
    .then(events => {
        res.send(events)
    })
    .catch(err => console.log('Erro list Events' + err))
})

// Add Event
router.post('/add', (req, res) => {
    let {date, address, client} = req.body

    // Insert
    Event.create({
        date,
        address,
        client
    })
    .then(() => res.redirect('/event'))
    .catch(err => console.log('Add fail Events: ' + err))
})

module.exports = router