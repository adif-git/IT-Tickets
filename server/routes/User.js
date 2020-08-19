const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportConfig = require('../passport')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const Ticket = require('../models/Ticket')

router.post('/register', async (req,res)=>{
    try{
        const { username, employeeID, password, role, contacts } = req.body
        if(!username || !employeeID || !password || !role || !contacts){
            return res
            .status(400)
            .json({message: {msgBody: "Not all field have been entered", msgError: true}})
        }

        if(password.length < 5){
            return res
            .status(400)
            .json({message: {msgBody: "Password should be at least 5 character long", msgError: true}})
        }

        const userExist = await User.findOne({username: username})
        if(userExist){
            return res
            .status(400)
            .json({message: {msgBody: "User already exist", msgError: true}})
        }

        // Update submitted password with salt
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        req.body.password = passwordHash

        const newUser = new User(req.body)
        newUser.save(err =>
            {
                if(err){
                    res.status(500).json({message: {msgBody: "Error has occured when register user to database", msgError: true}}) 
                }
                else{
                    res.status(201).json({message: {msgBody: "Account succesfully created", msgError: false}})
                }
            })
    }
    catch(err)
    {
        res.status(500).json({message: {msgBody: err.message, msgError: true}})
    }
})

router.post('/login',(req,res,next)=>{
    // Check if all fields are filled
    const {username, password} = req.body
    if(!username || !password){
        return res
            .status(400)
            .json({message: {msgBody: "Not all field have been entered", msgError: true}})
    } else {next()}},
    // Passport Authentication
    passport.authenticate('local',{session: false, failWithError: true}),
    // Run if authentication succeed
    (req,res)=>{
        if(req.isAuthenticated()){
            const {_id,username,role } = req.user
            const token = JWT.sign({
                iss: "itticketingsystem",
                sub: _id
            },process.env.JWT_SECRET,{expiresIn: "1h"})

            res.cookie('access_token', token, {httpOnly: true, sameSite: true})
            res.status(200).json({isAuthenticated: true, user: {username, role}})
        }
    },
    // Run if authentication failed
    (err,req,res,next)=>{
        if(req.autherror){
            res.status(401).json({message: {msgBody: req.autherror, msgError: true}})
        }
    }
)

router.get('/logout', passport.authenticate('jwt',{session: false}),(req,res)=>{
    res.clearCookie('access_token')
    res.json({user:{username: "", role: ""}, success: true})
})

router.post('/ticket', (req,res,next)=>{
    // Check if all fields are filled
    const {title, description} = req.body
    if(!title || !description){
        return res
            .status(400)
            .json({message: {msgBody: "Not all field have been entered", msgError: true}})
    }
    else {
        next()
    }},passport.authenticate('jwt',{session: false}),
    
    (req,res)=>{
        const ticket = new Ticket(req.body)
        ticket.save(err=>{
            if(err){
                res.status(500).json({message: {msgBody: "Error has occured to database", msgError: true}})
            }
            else{
                req.user.tickets.push(ticket)
                req.user.save(err=>{
                    if(err){
                        res.status(500).json({message: {msgBody: "Error has occured when saving data to user", msgError: true}})
                    }
                    else{
                        res.status(200).json({message: {msgBody: "Succesfully created ticket", msgError: false}})
                    }
                })
            }
        })
    // Run if authentication failed
    },(err,req,res,next)=>{
        if(req.autherror){
            res.status(401).json({message: {msgBody: req.autherror, msgError: true}})
        }
    }
)

router.get('/tickets', passport.authenticate('jwt',{session: false}),(req,res)=>{
    User.findById({_id:req.user._id}).populate({path:'tickets', options:{sort:{'createdAt':-1}}}).exec((err,document)=>{
        if(err){
            res.status(500).json({message: {msgBody: "Error has occured to database", msgError: true}})
        }
        else{
            res.status(200).json({tickets: document.tickets, message: {msgBody: "Succesfully get tickets from database", msgError: false}})
        }
    })
})

router.get('/admin',passport.authenticate('jwt',{session: false}),async (req,res)=>{
    if(req.user.role === 'Admin'){
        // Add user attributes into ticket model reference from users model
        const tickets = await Ticket.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'tickets',
                    as: 'user'
                }
            },
            {
                $project: {
                    "user._id": 0,
                    "user.password": 0,
                    "user.tickets": 0,
                    "user.employeeID": 0,
                    "user.createdAt": 0,
                    "user.role": 0,
                    "user.contacts": 0
                }
            },
            {
                $sort: {createdAt: -1}
            }
        ])
        res.status(200).json({tickets: tickets, message: {msgBody: "Succesfully get tickets from database", msgError: false}})
    }
    else{
        res.status(403).json({message: {msgBody: "You're not admin", msgError: true}})
    }
})

router.post('/admin', passport.authenticate('jwt',{session: false}), (req,res)=>{
    const {_id} = req.body
    Ticket.findByIdAndUpdate(_id, {status: 'Closed'}, (err,document)=>{
        if(err){
            console.log(err)
        }
        else{
            res.status(200).json({message: {msgBody: "Succesfully closed ticket", msgError: false}})
        }
    })
})

router.get('/authenticated',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const {username, role} = req.user
    res.status(200).json({isAuthenticated: true, user: {username, role}})
})

module.exports = router