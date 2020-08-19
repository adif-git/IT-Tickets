const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const connectDB = require('./config/db')

// Load Config
dotenv.config({ path: './config/config.env' })

const app = express()
app.use(cookieParser())
app.use(express.json())

//Connect Database
connectDB()

// Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Router
app.use('/user', require('./routes/User'))

const CLIENT_BUILD_PATH = path.join(__dirname,'../client/build')
app.use(express.static(CLIENT_BUILD_PATH))
app.get('/', function(req,res){
    res.sendFile(path.join(CLIENT_BUILD_PATH), "index.html")
})


const PORT = process.env.PORT || 4949
app.listen(
    PORT,
    console.log(`Server run in ${process.env.NODE_ENV} mode on port ${PORT}`)
)