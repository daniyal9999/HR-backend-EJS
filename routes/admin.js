const express = require('express')
const router = express.Router()
const Job = require ('../models/job')
const Admin = require('../models/admin')

//GET all Job
router.get('/', async function(req, res, next) {
    console.log("admin here")
    let jobs = await Job.find({});
    //console.log(req.session.user);
    // console.log(blogs)
    res.render('list', {jobs});
  });

// Signup
router.post('/register', async function(req, res, next) {
  let user = new Admin(req.body);
  await user.save()
  // res.redirect('/');
  res.send("admin registered")
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', async function(req, res, next) {
  let user = await Admin.findOne({name:req.body.name, password:req.body.password});
  if(!user) return res.redirect('/login');
  req.session.userz = user;
  return res.redirect('/api/admin');
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  req.session.userz = null;
  res.redirect('/api/admin');
});

module.exports = router