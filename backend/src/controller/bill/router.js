const express = require('express');
const Bill = require('./model');
const controller = require('../base/controller')(Bill);

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
