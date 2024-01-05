const express = require('express');
const path = require('path');
const port = 8002;
const db = require('./config/mongoose');
let cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(express.json()); // Parse JSON bodies
app.use(express.static('./assets'));

const ejs = require('ejs');

// use express router


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);

app.use(session({
    name:'codial',
    secret:'iamvdsingh',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000 * 60 * 100 )
    }

}));


/* 
Passport will serialize the user data and store it in the session. 
passport.session() retrieves the user data from the session during subsequent 
requests and deserializes it,
making it available in req.user.
*/
app.use(passport.initialize());
app.use(passport.session())

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port , function(err){
    if (err) {
        console.log("error in runningn the server");
    }
    else {
        console.log("server running good");
    }
});
