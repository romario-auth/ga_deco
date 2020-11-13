const express = require('express')
const router = express.Router()
const Contract = require('../models/Contract')

// List Contract
router.get('/event/:event', (req, res) => {
    let contractEvent = req.params.event

    Contract.findAndCountAll({ 
        where: {event_id: contractEvent},
        order: [
            ['updatedAt', 'DESC']
    ]})
    .then(
        contracts => {if(contracts.count > 0){
            res.send(contracts)} else
            {
                res.redirect('/notfound')
            }
        })
    .catch(err => console.log('Erro lits Contract' + err))
})


// Add Contract
router.post('/add', (req, res) => {
    let {event_id, articles_id, value} = req.body

    // Insert
    Contract.create({
        event_id,
        articles_id,
        value
    })
    .then(() => res.redirect('/event'))
    .catch(err => console.log('Erro add Contract: ' + err))
})

module.exports = router