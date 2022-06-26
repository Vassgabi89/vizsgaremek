const Model = require('./model');

exports.create = body => {
    const entity = new Model (body);
    return entity.save();
};

exports.findAll = () => MarvelCharacter.find().populate();

exports.findOne = id => MarvelCharacter.findById(id).populate();

