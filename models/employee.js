// requiring mongooose because we need to use mongoose as ODS tool
// which will help us to work with db without knowing mongodb
const mongoose = require('mongoose');


const emp_details = new mongoose.Schema({
   name : {
    type : String , 
    required: true
    
   },
   //implement a function which sends error to user if he is entering username which already exist
   username :{
   type : String,
   required : true, 
   unique : true
   },
   password : {
    type : String,
    required : true
   },
   isAdmin : {
    type: Boolean,
    required : true // Reference to the issues model
   },
   reviewers : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee'
   }]
   
}
,
// we want to create two more fields created_at and updated_at
   // created_at - will change when the user is created
   // updated at will change when some thing related to user will change
   // during first sign up created and updated will same
// please make a note that timestamps is the second parameter
// of mongoose.schema()
   {
    timestamps : true
   }
);


const employees = mongoose.model('employee' , emp_details);

module.exports = employees;











