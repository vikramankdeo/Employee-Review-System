const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Employee = require('../controllers/Employee_controller');
const passport = require('passport');
//calling passport.setAuthenticatedUser to make sure user is set for the 1st page rendered after sign in 
// router.get('/home',Employee.home);


//router.post('/submit', AddProjectConrtoller.add_project);

module.exports = router;