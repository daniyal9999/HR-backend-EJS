const mongoose = require('mongoose')

const Schema = mongoose.Schema

const applicantSchema = new Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    },
    jobId: {
        type:String,
        required:true
    },
    resumeUrl: {
        type:String,
        required:true
    },
    coverletterUrl: {
        type:String,
        required:true
    }
  },{ timestamps:true })

module.exports = mongoose.model('Applicant', applicantSchema)