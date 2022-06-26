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
                return next(new createError.NotFound("ticket not found"));
            }
            return res.json(entity);
        });
};

exports.update = (req, res, next) => {

    return service.update(req.params.id, req.body)
        .then(entity => {
            res.json(entity);
        })
        .catch( err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return service.delete(req.params.id)
        .then( () => res.json({}) )
        .catch( err => {

            if (err.message === "Not found") {
                return next(
                    new createError.NotFound(err.message)
                )
            }

            next(new createError.InternalServerError(err.message));
        } );
};

/*const baseService = require('../base/service');
const Ticket = require('./model');
const service = baseService(Ticket);

exports.findAll = (req, res, next) => {

    return service.findAll()
        .then( list => res.json(list) );
};
*/