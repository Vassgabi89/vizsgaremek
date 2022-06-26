const express = require('express');
const baseService = require('../base/service');

module.exports = (model, populateList = []) => {
    const service = baseService(model, populateList);
    return {
        findAll(req, res, next) {
            return service.findAll()
                .then(list => res.json(list));
        },
        findOne(req, res, next) {
            return service.findOne(req.params.id)
                .then(entity => {
                    res.json(entity)});
        },
        updateOne(req, res, next) {
            return service.updateOne(req.params.id, req.body)
                .then(entity => res.json(entity)) //megállapodás, h post/put/patch esetén visszaküldjük a frontendnek a sikeresen létrehozott/ módosított felhasználót
                .catch(err => {
                    res.statusCode = 501;
                    res.json(err);
                });
        },
        insertOne(req, res, next) {
            return service.insertOne(req.body)
                .then(entity => res.json(entity))
                .catch(err => {
                    res.json(err);
                });
        },
        delete(req, res, next) {
            return service.delete(req.params.id)
                .then( () => res.json({}))
                .catch( err => {
                    res.json(err)
                })
        }
    };
};

