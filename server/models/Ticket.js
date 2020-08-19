const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'Submitted',
        enum: ['Submitted', 'Closed']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Ticket', TicketSchema)