const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



// Require and use routes
const adminRoutes = require('./Admin');
const employeeRoutes = require('./Employee');
const home_router = require('./home_routes');
const Employee_controller = require('../controllers/Employee_controller');
const isAdmin = require('./adminAuthMiddleware');

/*
When a request is made to a route with passport.authenticate(), 
Passport middleware handles the initial authentication based on the 
provided strategy (e.g., LocalStrategy).

Once a user is authenticated and done(null, user) is called,
Passport serializes the user data into the session using serializeUser().

For subsequent requests, when Passport middleware detects the presence of a 
session (typically managed by express-session), 
it automatically invokes deserializeUser() to retrieve the user details from the session,
independent of the passport.authenticate() call.

The decision of when to perform deserialization is handled internally 
by Passport based on the presence of a session cookie or session data in the request
headers.
*/

//isAdmin middleware will allow only admin to access admin related page
router.use('/Admin',isAdmin,adminRoutes);
router.use('/Employee',employeeRoutes);
// router.use('/',home_router);
// router.get('/home/sign_in',Employee_controller.sign_in);
// router.get('/home/sign_up',Employee_controller.sign_up);

router.get('/',Employee_controller.home_page);
router.get('/sign-out',Employee_controller.sign_out);
//router.use('/Admin/Update-Employee', require('./Employee'));

//router.use('/Create_issue', require('./Create_issue'));

//router.use('/filteredIssues' , require('./Filter_issues'));
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;