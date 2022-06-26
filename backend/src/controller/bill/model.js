const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    myTicketID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Myticket'
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
    }
});

module.exports = mongoose.model('Bill', BillSchema);