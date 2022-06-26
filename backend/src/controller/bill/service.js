const Bill = require('./model');

exports.create = body => {
    const bill = new Bill (body);
    return bill.save();
};

exports.findAll = () => MarvelCharacter.find().populate();

exports.findOne = id => MarvelCharacter.findById(id).populate();

