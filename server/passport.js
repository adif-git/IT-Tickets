const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy
const User = require('./models/User')
const bcrypt = require('bcryptjs')

const cookieExtractor = req => {
    let token = null
    if(req && req.cookies){
        token = req.cookies["access_token"]
    }
    return token
}

// Authorization after user being authenticated from local strategy
passport.use(new jwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET}, async (payload,done)=>{
    try{
        const user = await User.findById({_id: payload.sub})         
        if(user){
            return done(null,user)
        }
        else{
            req.autherror = "User not found"
            return done(null,false)
        }
        
    }
    catch(err){
        return done(err)
    }}
))

// Middleware authentication local strategy using username and password
passport.use(new LocalStrategy({passReqToCallback: true}, async (req, username, password, done)=>{
    try{
        const user = await User.findOne({username})
        if(!user){
            req.autherror = "User not found"
            return done(null,false)
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            req.autherror = "Password incorrect"
            return done(null,false)
        }
        return done(null,user)
        
    }
    catch(err){
        return done(err)
    }
}))
  