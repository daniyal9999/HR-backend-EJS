require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
var path = require('path');
const cors = require("cors");
const jobRoutes = require('./routes/jobs')
const adminRoutes = require('./routes/admin')
const applicantRoutes = require('./routes/applicants')
var session = require('express-session')
var sessionAuth = require('./middlewares/sessionAuth')

const app = express()
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(sessionAuth)

//middlewares
app.use(
    cors({
      origin: "*",
    })
  );
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/jobs',jobRoutes)
app.use('/api/applicants',applicantRoutes)
app.use('/api/admin',adminRoutes)


//Connecting to mongo
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    app.listen(4000,()=>{
        console.log("listening on 4000")
    })
})
.catch((error)=>{console.log(error.message)})