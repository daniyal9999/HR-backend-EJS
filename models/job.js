const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    details: {
        type:String,
        required:true
    },
    requirements: {
        type:String,
        required:true
    },
    sector: {
        type:String,
        required:true
    },
    location: {
        type:String,
        required:true
    },
    salary: {
        type:String,
        required:true
    }
},{ timestamps:true })

module.exports = mongoose.model('Job', jobSchema)