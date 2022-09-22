const express = require('express')
const app = express()
const mongoose = require('mongoose')
// Passport is authentication middleware for Node.js.
const passport = require('passport') 
//A session will contain some unique data about that 
//client to allow the server to keep track of the user’s state. 
//In session-based authentication, the user’s state is stored 
//in the server’s memory or a database.
const session = require('express-session')
//This module exports a single function which takes an instance of connect 
//(or Express) and returns a MongoDBStore class that can be used to store sessions 
//in MongoDB.
const MongoStore = require('connect-mongo')(session)
//Lets us override our forms to be able to use DELETE / PUT
const methodOverride = require("method-override");
//Flash is an extension of connect-flash with the ability 
//to define a flash message and render it without redirecting 
//the request
const flash = require('express-flash')
//HTTP request logger middleware for node.js
const logger = require('morgan')
//This Connects to Mongoose/MongoDB
const connectDB = require('./config/database')
//Connects to the Routes
const mainRoutes = require('./routes/main')
const postRoutes = require('./routes/posts')
const commentRoutes = require("./routes/comment")

//Use .env file in config folder
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

// Connects to MongoDB
connectDB()

//Middleware
//Using EJS for views
app.set('view engine', 'ejs')

//Static Folder
app.use(express.static('public'))

//Body Parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Logging
app.use(logger('dev'))

//Use forms for put / delete
app.use(methodOverride("_method"));

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Use flash messages for errors, info, ect...
app.use(flash())

//Setup Routes For Which The Server Is Listening
app.use('/', mainRoutes);
app.use('/posts', postRoutes);
app.use("/comments", commentRoutes);

//Server Running
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    