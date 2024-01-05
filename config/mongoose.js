

// getting-started.js
//require the library
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  //127.0.0.1:27017/test  means localhost:port/db_name
  //connect to db
  await mongoose.connect('mongodb://127.0.0.1:27017/DBIT');
  console.log("connected to db ");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// we have require mongoose and then we have connected to db 
//the connection which is there in between mongoose and db is db_var


//acquire the connection
const db_var = mongoose.connection;

db_var.on('error', console.error.bind(console, 'error connecting to server'));

db_var.once('open' , function(){
    console.log('succesfully connected to db');
})

return db_var;
