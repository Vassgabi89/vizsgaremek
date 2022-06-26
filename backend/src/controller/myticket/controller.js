const express = require('express');
const createError = require('http-errors');

const Model = require('./model');
const service = require('./service');

exports.create = (req, res, next) => {
    return service.create(req.body)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return service.findAll()
        .then( entity => {
            res.json(entity);
        });
};

exports.findOne = (req, res, next) => {
    return service.findOne(req.params.id)
        .then( entity => {
            if (!entity) {
                return next(new createError.NotFound("Myticket not found"));
            }
            return res.json(entity);
        });
};

