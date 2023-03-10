const Applicant = require('../models/applicants')

// get all applicants
const getApplicants = async (req, res) => {
    const applicants = await Applicant.find({}).sort({createdAt: -1})

    res.status(200).json(applicants)
}
// create new Applicant
const createApplicant = async (req, res) => {
    console.log("create applicant......")
    let rqst = JSON.parse(JSON.stringify(req.body))
    console.log(rqst)
    // add to the database
    try {
      let applicant = new Applicant(req.body)
      await applicant.save()
    //   res.status(200).redirect('/api/admin')
      res.status(200).send('applicant created!')
    } catch (error) {
      res.status(400).json({ "error": "cannot create new applicant" })
    }
  }
module.exports = {
    getApplicants,
    createApplicant
  }