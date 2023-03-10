const express = require('express')
const router = express.Router()
const {
    getApplicants,
    createApplicant    } = require('../controllers/applicantController')

//GET all applicants
router.get('/', getApplicants)

//POST single applicant
router.post('/create', createApplicant)

module.exports = router