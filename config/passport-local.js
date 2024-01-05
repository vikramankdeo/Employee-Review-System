const passport = require('passport');
const User = require('../models/employee');
const  error  = require('console');

const localStrategy = require('passport-local').Strategy;


//we need to tell passport to use local strategy

//passport.use() function is part of the Passport.js library and 
//is used to specify the authentication strategy that your 
// application should use. When you call passport.use(), 
// you are telling Passport.js which strategy you want to use 
// for authentication. In this case, you're specifying the 
// "local" strategy.

//local
//authentication using passport
passport.use(new localStrategy({
    usernameField: 'username'
},
//passport js will be called as middle in index.js 
//when called it will look for the name "email" , "password" in 
//the submitted form once it get the correct name 
//it will fetch the "email" , "password" from there
async function(username , password , done){
    await User.findOne({username:username})
    .then (result => {
        if(!result || result.password !== password){
            console.log("not found");
            return done(null , false);
        }
        //once the authentication is successfull , this done will 
        //call the serialize function and pass parameter "result"
        //which is the 1st parameter of passport.serialization function
        //named as "user"
        console.log("user found");
        return done(null , result);

    })
    .catch((error)=>{
        console.log("Error");
    })



})

);



//serialize the user to decide which key to be kept in cookies
/*User Session (Server-Side): When a user logs in and Passport.js 
calls passport.serializeUser, the user's data (usually a unique 
identifier, such as the user's ID) is stored in the user's 
session on the server. This session data allows the server to 
recognize and authenticate the user on subsequent requests.


Cookie (Client-Side): The user's session data, or a 
unique session identifier, is often stored as a cookie on the 
user's browser. This cookie helps link the user's browser with 
their server-side session. When the user makes subsequent 
requests, the browser sends this cookie along with the request. 
Passport.js uses the session identifier in the cookie to look up
 the corresponding session data on the server.

*/

/*
The passport.serializeUser function is automatically called by 
Passport.js when a user logs in or their authentication is 
successful.
You don't need to explicitly call this function in 
your code. Instead, Passport.js handles this process for you.
*/
// serialize the user to decide which key need to put in cookies
passport.serializeUser(async function(user , done){
    done(null , user.id);
});



//deserialize the user from the key in cookies
passport.deserializeUser(async function(id , done){
    console.log("deserial called");
    await User.findById(id)
    .then(user => {
        return done(null , user);
    })
    .catch((error)=>{
        console.log("Error in dev", error);
        return done(error);

    })
});


passport.checkAuthentication = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }

    return res.redirect('/')

};


passport.setAuthenticatedUser = function(req, res, next){
    console.log("authent is called");
    if (req.isAuthenticated()){
        res.locals.user = req.user;
        console.log("authent is ",res.locals);
    }
    next();
};


module.exports = passport;
