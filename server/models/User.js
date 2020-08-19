const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        maxlength: 20
    },
    employeeID:{
        type: String,
        required: true,
        maxlength: 8
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['User', 'Admin'],
        required: true
    },
    contacts:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tickets:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }]
})

module.exports = mongoose.model('User', UserSchema)