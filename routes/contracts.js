const express = require('express')
const router = express.Router()
const Contract = require('../models/Contract')
const Article = require('../models/Article')
const Event = require('../models/Event')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


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
    let termSearch = req.query.term

    let query = '%' + termSearch + '%'
               
    Event.findByPk(idEvent)
    .then((event) => {

        if(event === null)
        {
            res.redirect('/notfound');
        }else
        {
            // Give back Search if term
            if(!termSearch)
            {
                console.log("\n\n ****Devolver o Evento: " + req.path)
                res.render('eventManager', {event});
            }
            else{
                Article.findAll({
                    where: {
                        description: {[Op.like]: query}
                    }
                })
                .then((resultSearch) => {
                    res.render('eventManager', {event,termSearch, resultSearch});
                    console.log("\n\n ****Fazer busca 1: " + req.path)
                })
                .catch((err) => console.log("Error search Article"))
            }
        }
    })
    .catch((err) => console.log("Erro get Event for Manager contract"))

})



// Add Contract
router.post('/article/add/', (req, res) => {
    let idEvent = req.body.idEvent
    let idArticle = req.body.idArticle
    let valueContract = req.body.valueContract

    // Insert
    Contract.create({
        event_id: idEvent,
        article_id: idArticle,
        value: valueContract
    })
    .then(() => res.redirect('/aplicativo/contract/event/'+idEvent))
    .catch(err => console.log('Erro add Contract: ' + err))
})

// Delete Contract
router.post('/article/delete/', (req, res) => {
    
    let idEvent = req.body.idEvent;    
    let idArticle = req.body.idArticle;
    
    Contract.destroy({
        where: {event_id: idEvent, article_id: idArticle}
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