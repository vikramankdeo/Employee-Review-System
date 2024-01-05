const e = require('express');
const employee = require('../models/employee.js');
const Review = require('../models/Review.js');
//const new_issue = require('../models/issues.js');
const mongoose = require('mongoose');



module.exports.home_page = async function(req , res){
  return res.render('home' , {
    title : "Employee Review System" , layout: false
});
}
module.exports.Emp_form = function(req, res){
    console.log("controler called")
    return res.render('Admin_Add_emp' , {
        title : "Add Employee" 
    });
}


module.exports.Add_Employee = function(req, res){
    console.log(req.body);
    let x = false;
    if(req.body.isAdmin === 'on'){
        x = true;
    }
    else{
        x = false;
    }
    req.body.isAdmin = x;
    //add  a check for password and confirm password
    employee.create(req.body);
    return res.redirect('/Admin/home/');
}


module.exports.home = async function(req , res ){
  if(req.user.isAdmin){
    return res.redirect('/Admin/home/');
  }
  else{
      return res.redirect('/Employee/home/');
  }
};


module.exports.Admin_home =async function(req, res){
    await employee.find({}).sort({ createdAt: -1 }).then(employees => {
        return res.render('Admin_Emp_details', {
            Employee: employees // Pass retrieved employees to the rendered view
        });
    }).catch(err => {
        console.error('Error fetching employees:', err);
        return res.status(500).send('Internal Server Error'); // Sending an error response in case of failure
    });
};


module.exports.Update_Emp =async function(req, res){
    const employeeId = req.params.id;
    
    const emp = await employee.findById(employeeId);
    console.log(emp);
    return res.render('Admin_Update_emp' , {title : "abc" , Employee : emp });
  
    
};



module.exports.Update_form = async function(req, res) {
    const employeeId = req.params.id; // Get the employee ID from the request parameters
    let x = false;
    if(req.body.isAdmin === 'on'){
        x = true;
    }
    else{
        x = false;
    }
    req.body.isAdmin = x;
    const updatedEmployeeData = req.body; // Updated employee data sent in the request body
    
    try {
        const updatedEmployee = await employee.findByIdAndUpdate(
            employeeId,
            updatedEmployeeData,
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).send('Employee not found');
        }

        return res.redirect('/Admin/home');
    } catch (err) {
        console.error('Error updating employee:', err);
        return res.status(500).send('Internal Server Error');
    }
};


module.exports.deletedEmployee =  async (req, res) => {
    const employeeId = req.params.id; // Get the employee ID from the request parameters
    console.log(employeeId);
    try {
        // Find the employee by ID and delete them from the database
        const deletedEmployee = await employee.findByIdAndDelete(employeeId);
        const result = await Review.deleteMany({
          $or: [{ emp_id: employeeId }, { reviewer_id: employeeId }]
        });
        console.log("deletion calle",result);
        if (!deletedEmployee) {
            return res.status(404).send('Employee not found');
        }

        return res.status(200).send('Employee deleted successfully');
    } catch (err) {
        console.error('Error deleting employee:', err);
        return res.status(500).send('Internal Server Error');
    }
};




// Express route handler to render a page with all employees
module.exports.check = async function(req, res){
    try {
      // Fetch all employees from the database
      const allEmployees = await employee.find({});
  
      // Render the 'employees' EJS page and pass the 'allEmployees' data to it
      res.render('Admin_Assign_Reviewer' , { employees: allEmployees });
    } catch (err) {
      // Handle error if fetching employees fails
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }
  };
  

  module.exports.Add_Reviewer = async function(req, res){
    const jsonString = req.body; // Assuming data is sent as a JSON string

  try {
    const jsonData = jsonString; // Parse the JSON string to a JavaScript object
    console.log('Received JSON data:', jsonData);
    const reviewerIds = jsonData.selectedUsernames;
    //delete all the rows reviewer for the emp_Id in reviews table 
    await employee.findByIdAndUpdate(
        jsonData.selectedValue,
        { $unset: { reviewers: '' } },
        { new: true });
    //delete all items in reviewers array in front of given emp_id
    await Review.deleteMany({ emp_id: jsonData.selectedValue })


    const promises = reviewerIds.map(reviewerId => {
        const newReview = new Review({
          emp_id: jsonData.selectedValue,
          reviewer_id: reviewerId
        });
        newReview.save();
      });
  
    const createdReviews = await Promise.all(promises);
    
    const updatedEmployee = await employee.findByIdAndUpdate(
        jsonData.selectedValue,
        { $addToSet: { reviewers: { $each: jsonData.selectedUsernames } } },
        { new: true }
      );
  
      if (!updatedEmployee) {
        console.log('Employee not found');
        // Handle if the employee with the given ID is not found
      } else {
        console.log('Reviewers added successfully:', updatedEmployee);
        // Handle success and perform further actions
      }
    return res.status(200).json({ redirectTo: '/Admin/check' });
  } catch (error) {
    console.error('Error parsing JSON:', error);
    res.status(400).send('Invalid JSON data');
  }
  };


module.exports.emp_home = async function(req , res){
    
    //controller for employee home page
    //console.log("user is ",req.user.id);
    let reviewerid = req.user.id;
    console.log(reviewerid);
    //find all teh employes where reviewer is reviewer_id
    try {
        const emptyReviews = await Review.find({
          reviewer_id: reviewerid,
         $or: [
    { review: { $eq: '' } }, // Match documents where 'review' field is empty
    { review: { $exists: false } } // Match documents where 'review' field is absent
  ]
        }).populate('emp_id' , '-password -isAdmin').exec();//send all fields excluding password
    console.log("emplo" , emptyReviews);
        console.log('Employees with empty reviews:', emptyReviews);

        // Handle retrieved documents as needed
        return res.render('Employee_Home', {employees:emptyReviews});
      } catch (err) {
        console.error('Error fetching employees:', err);
        // Handle any errors that occur during the fetch
        return res.send('Error fetching employees');
      }

};


module.exports.emp_submit_review =async function(req, res){
    console.log(req.params.id);
    const reviewIdToUpdate = req.params.id;
    console.log(req.body.review);
      try {
        const updatedReview = await Review.findOneAndUpdate(
          { _id: reviewIdToUpdate },
          { $set: { review:req.body.review} },
          { new: true }
        );
        console.log('Updated review:', updatedReview);
        // Handle the updated review
      } catch (err) {
        console.error('Error updating review:', err);
        // Handle the error
      }
      
    //console.log('Updated review:', updatedReview);
    return res.status(200).send('Employee deleted successfully');
};


module.exports.show_review =async function(req , res){

    console.log(req.params.id);
    let reviewerid = req.params.id;
    //console.log(reviewerid);
    //find all teh employes where reviewer is reviewer_id
    try {
        const employeeReviewsData = await Review.find({
          emp_id: reviewerid,
        }).populate('emp_id' , '-password -isAdmin')
          .populate('reviewer_id' , '-password -isAdmin' )
        .exec();//send all fields excluding password
        console.log('Employees reviews:', employeeReviewsData);
        // Handle retrieved documents as needed
        return res.render('employeeReviews.ejs', { employeeReviews: employeeReviewsData });
      } catch (err) {
        console.error('Error fetching employees:', err);
        // Handle any errors that occur during the fetch
        return res.send('Error fetching employees');
      }
    //find rows in Review table where emp_id is equal to given req.param.id(employeeId)
    //send all these rows to a page (render the page and send these rows)
    //similar to employee_Home page you will show reviews by emp and can change the review by submitting
    //the only diffrrence is that whatever review you will change taht will replace the older review in current page.
};


module.exports.Update_review =async function(req , res){
 
  console.log(req.body);
  const updatedReview = await Review.findOneAndUpdate(
    { _id: req.body.reviewId },
    { $set: { review : req.body.updatedReview} },
    { new: true }
  );
  console.log(updatedReview)
  return res.status(200).json({review : req.body.updatedReview});
}


module.exports.sign_in = function(req,res){
    //if already signed in redirect to homepage
    if (req.isAuthenticated()){
      return res.send('you are signed in');
    }
    return res.render('home', {title :'home' , user_id : req.params.id , layout : false});
};


module.exports.sign_up = function(req,res){
  //if already signed in redirect to homepage
  if (req.isAuthenticated()){
    return res.send('you are signed in');
  }
     return res.render('sign_up_page');
};

module.exports.sign_out = function(req , res){
  req.logout(err => {
    if (err) {
      // Handle any potential errors here
      console.error(err);
    }})
  return res.redirect('/');
}