const express = require('express');
const Train = require('./model');
const controller = require('../base/controller')(Train);

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

router.patch('/:id', (req, res, next) => {
    return controller.updateOne(req, res, next);
});

router.delete('/:id', (req, res, next) => {
    return controller.delete(req, res, next);
});


module.exports = router;
