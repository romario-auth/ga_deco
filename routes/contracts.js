const express = require('express')
const sequelize = require('../db/connection')
const router = express.Router()
const Contract = require('../models/Contract')
const Article = require('../models/Article')
const Event = require('../models/Event')


// Get 
router.get('/manager/event/:idEvent', (req, res) => {
    let idEvent = req.params.idEvent

    Contract.findAll({
        where: {event_id: idEvent},
        include:[
            {
                model: Event
            },
            {
                model: Article,
            }
        ]
        
    })
    .then((contracts) => {
        res.send(contracts);
    })
    .catch((err)=> console.log("Erro get contract+article", err))
})

// Get value dataEvent
router.get('/event/:idEvent', (req, res) => {
    let idEvent = req.params.idEvent

    if(idEvent > 0)
    {
        res.render('eventManager', {idEvent});
    }else
    {
        res.redirect('/notfound');
    }
})


// Delete Contract
router.post('/article/delete/', (req, res) => {
    
    let idContract = req.body.idContract;
    let idEvent = req.body.idEvent;
    
    Contract.destroy({
        where: {id: idContract}
    })
    .then(() => res.redirect('/aplicativo/contract/event/'+idEvent))
    .catch(err => console.log('Delete erro' + err))
})


// Get Contract
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