const express = require('express')
const router = express.Router()
const Job = require('../models/job')
const Applicant = require('../models/applicants')
const {
    getJob,
    getJobs,
    createJob,
    deleteJob,
    updateJob} = require('../controllers/jobController')


//GET all Job
router.get('/', getJobs)

//add page
router.get('/add', function(req, res, next) {
    res.render('add');
  });

//details page
router.get('/details/:id', async function(req, res, next) {
    const jobId = req.params.id;
    const applicants = await Applicant.find({ jobId: jobId })
    const applicantsCount = await Applicant.countDocuments({ jobId: jobId })
    let job = await Job.findById(jobId)
    res.render('details',{ job: job, applicants: applicants, applicantsCount: applicantsCount.toString() });
  });

//edit page
router.get('/edit/:id', async function(req, res, next) {
   let job = await Job.findById(req.params.id)
    res.render('edit', {job});
  });

//GET single Job
router.get('/:id',getJob)

//POST single Job
router.post('/create', createJob)

//DELETE single Job
router.get('/delete/:id', deleteJob)

//UPDATE single Job
router.post('/edit/:id',updateJob)


module.exports = router

// async function (req, res, next) {
//   console.log(req.params.id)
//   let job = await Job.findById(req.params.id);
//   console.log(job)
//   job.title = req.body.title;
//   job.details = req.body.details;
//   await job.save();
//   res.status(200).redirect("/api/admin");
// }