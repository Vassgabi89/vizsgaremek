const fsp = require('fs').promises
const { join } = require('path')
const Ticket = require('../controller/ticket/model')
const Train = require('../controller/train/model')
const User = require('../controller/user/model');

( async () => {
    const ticketJson = await fsp.readFile(
        join(__dirname, 'tickets.json'),
        'utf8',
    )
    const tickets = JSON.parse(ticketJson)
    await Ticket.insertMany(tickets)
    
    
    const trainJson = await fsp.readFile(
        join(__dirname, 'trains.json'),
        'utf8',
    )
    const trains = JSON.parse(trainJson)
    await Train.insertMany(trains)

    const userJson = await fsp.readFile(
        join(__dirname, 'users.json'),
        'utf8',
    )
    const users = JSON.parse(userJson)
    await User.insertMany(users)
})()