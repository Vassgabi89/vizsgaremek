const express = require('express');
const MyTicket = require('./model');
const controller = require('../base/controller')(MyTicket);

const router = express.Router();

router.get('/', (req, res, next) => {
    return controller.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
    return controller.findOne(req, res, next);
});

router.post('/', (req, res, next) => {
    return controller.insertOne(req, res, next);
});

module.exports = router;
