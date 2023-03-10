const Job = require('../models/job')
const mongoose = require('mongoose')

// get all job
const getJobs = async (req, res) => {
  let page = Number(req.query.page) || 1
  let limit = Number(req.query.limit) || 2
  let skip = (page -1) * limit
  const job = await Job.find({}).skip(skip).limit(limit).sort({createdAt: -1})

  const total = await Job.countDocuments({})
  res.header('Access-Control-Expose-Headers', 'x-total-count') // expose x-total-count header
  res.set('x-total-count', total.toString()) // convert total to string and set header
  res.status(200).json(job)
}

// get a single job
const getJob = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such job'})
  }

  const job = await Job.findById(id)

  if (!job) {
    return res.status(404).json({error: 'No such job'})
  }

  res.status(200).json(job)
}

// create a new job
const createJob = async (req, res) => {
  console.log("create job......")
  let rqst = JSON.parse(JSON.stringify(req.body))
  console.log(rqst)
  // add to the database
  try {
    let job = new Job(req.body)
    await job.save()
    res.status(200).redirect('/api/admin')
    // res.status(200).send('job created!')
  } catch (error) {
    res.status(400).json({ "error": "cannot create new job" })
  }
}

// delete a job
const deleteJob = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such job'})
  }

  const job = await Job.findOneAndDelete({_id: id})

  if(!job) {
    return res.status(400).json({error: 'No such job'})
  }

  res.status(200).redirect('/api/admin')
}

// update a job
const updateJob = async (req, res) => {
  const { id } = req.params
  console.log("id is"+id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such job'})
  }

  const job = await Job.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!job) {
    return res.status(400).json({error: 'No such job'})
  }

  res.status(200).redirect("/api/admin")
}

module.exports = {
  getJob,
  getJobs,
  createJob,
  deleteJob,
  updateJob
}