const express = require('express')
const router = express.Router()
const Contract = require('../models/Contract')
const Article = require('../models/Article')
const Event = require('../models/Event')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// Gadget Investment Article
router.get('/investment', (req, res) =>{
    Article.sum('paid')
    .then((sum) => {
        res.send({sum});
    })
    .catch(err => console.log('Erro Gadget investment: ' + err))
})

// Gadget return Contract/Article
router.get('/return', (req, res) =>{
    Contract.sum('value')
    .then((sumContract) => {

        Article.sum('paid')
        .then((sumArticle) => {
            let returnInvest = (sumContract / sumArticle *100);
            res.send({returnInvest});
        })
    })
    .catch(err => console.log('Erro Gadget Return: ' + err))
})

// Gadget total event
router.get('/event/total', (req, res) =>{
    Event.count()
    .then((total) => {
        res.send({total})
    })
    .catch(err => console.log('Erro Gadget Total Event: ' + err))
})

// Gadget total article
router.get('/article/total', (req, res) =>{
    Article.count()
    .then((total) => {
        res.send({total})
    })
    .catch(err => console.log('Erro Gadget Total Article: ' + err))
})


// Gadget max aluguel
router.get('/contract/max', (req, res) =>{
    Contract.max('value')
    .then((max) => {
        res.send({max})
    })
    .catch(err => console.log('Erro Gadget Max Aluguel: ' + err))
})

// Gadget last Rent
router.get('/contract/lastrent', (req, res) =>{
    Contract.findAll(
        {order: [
            ['id', 'DESC']
        ],
        limit: 7
        }
    )
    .then((contract) => {
        res.send({contract})
    })
    .catch(err => console.log('Erro Gadget last Rent: ' + err))
})

module.exports = router