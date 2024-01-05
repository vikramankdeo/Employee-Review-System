const mongoose = require('mongoose');


const review_det = new mongoose.Schema({
   emp_id : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee',
      required : true
    
   },
   reviewer_id : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee',
      required : true
    
   },
   review : {
      type: String,
      require: true
   }
   
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


const reviews = mongoose.model('review' , review_det);

module.exports = reviews;





