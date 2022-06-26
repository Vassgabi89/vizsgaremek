const mongoose = require('mongoose');

/*{
      "name": "Trans-Siberian Express",
      "country": "Russia",
      "year": 1891,
      "description": "The..."
    }*/

const TrainSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    year: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Train', TrainSchema);