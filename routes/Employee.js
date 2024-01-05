const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Employee_controller = require('../controllers/Employee_controller');




//route when employee logs in
// router.post('/sign-in/home/:id',Employee_controller.emp_home);
router.get('/sign-in/home',passport.authenticate(
    'local',
    {failureRedirect:'/'}
),passport.setAuthenticatedUser,
Employee_controller.home);
router.get('/home',passport.checkAuthentication,Employee_controller.emp_home);
//router.get('/home/:id',Employee_controller.emp_home);
router.post('/submitReview/:id',passport.checkAuthentication,Employee_controller.emp_submit_review);

module.exports =  router;
