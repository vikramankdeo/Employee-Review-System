const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Employee_controller = require('../controllers/Employee_controller');
router.get('/Add-Employee/page',passport.checkAuthentication, Employee_controller.Emp_form);
router.get('/home',passport.checkAuthentication, Employee_controller.Admin_home);
router.delete('/deleteEmployee/:id' ,passport.checkAuthentication, Employee_controller.deletedEmployee);
// route to update employee page and with the prefilled form
router.get('/Update-Employee/:id' ,passport.checkAuthentication, Employee_controller.Update_Emp);
router.post('/Update-Employee/update/:id' ,passport.checkAuthentication, Employee_controller.Update_form);
router.post('/Add-Employee/submit',passport.checkAuthentication,Employee_controller.Add_Employee);
router.post('/Add-Reviewer',passport.checkAuthentication,Employee_controller.Add_Reviewer);
router.use('/check',passport.checkAuthentication, Employee_controller.check);
router.get('/show-reviews/:id',passport.checkAuthentication, Employee_controller.show_review);
router.post('/updateReview/',passport.checkAuthentication, Employee_controller.Update_review);
//router.post('/submit', AddProjectConrtoller.add_project);


module.exports = router;