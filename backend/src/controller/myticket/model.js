const mongoose = require('mongoose');

/*"departure_location": "Buliu",
   "arrival_location": "Pu’an",
   "departure_date": "06/01/2022",
   "departure_time": "6:49 AM",
   "travel_time": "13:54",
   "arrival_date": "02/12/2022",
   "arrival_time": "1:47 PM",
   "transfers": 3,
   "class": 1,
   "trainID": 0,
   "price"*/

const MyTicketSchema = mongoose.Schema({
    departure_location: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[A-ZÁÉÍÓÚÖŐÜŰ][a-záéíóöőúüűA-ZÁÉÍÓÚÖŐÜŰ0-9\ \.\,\-]{2,49}$/.test(v)
            }
        }
    },
    arrival_location: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[A-ZÁÉÍÓÚÖŐÜŰ][a-záéíóöőúüűA-ZÁÉÍÓÚÖŐÜŰ0-9\ \.\,\-]{2,49}$/.test(v)
            }
        }
    },
    departure_date: {
        type: Date,
        required: true,
        default: new Date()
    },
    departure_time: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^([1-9]|1[0-2]):([0-9]|[0-5][0-9]) [AP]M$/.test(v)
            }
        }
    },
    arrival_date: {
        type: Date,
        required: true,
        default: new Date()
    },
    arrival_time: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^([1-9]|1[0-2]):([0-9]|[0-5][0-9]) [AP]M$/.test(v)
            }
        }
    },
    travel_time: {
        type: String,
        validate: {
            validator: function(v) {
                return /^([0-9]{1,2}):([0-5]{0,1}[0-9])$/.test(v)
            }
        }
    },
    services: {
        type: String,
        default: ''
    },
    transfers: {
        type: Number,
        default: 0
    },
    class: {
        type: Number,
        enum: [1, 2, 3] //lista megadása, ezek lehetnek a lehetséges értékek
    },
    trainID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trains'
    },
    price: {
        type: Number,
        validate: {
            validator: function(v) {
                return /^[1-9][0-9]{0,9}$/.test(v)
            }
        }
    },
    passengers: {
        type: Number,
        default: 0
    },
    reducedFare: {
        type: Number,
        default: 0
    },
    fullPrice: {
        type: Number,
        default: 0
    },
    user: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('MyTicket', MyTicketSchema);