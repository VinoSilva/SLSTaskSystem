var should = require("chai").should();
const mongoose = require("mongoose");

require("dotenv").config();

let dropDatabase = function(done,callback) {

  let dropAfterTest = true;

  if(dropAfterTest)
  {
    mongoose.connection.db
      .dropDatabase()
      .then(() => {
        if(callback){

          callback();
        }
        else{
          done();
        }
      })
      .catch(err => {
        console.error(err);
  
        if (err.code === 26) {
          console.log("Ignore error mongoose 26");

          if(callback){
            callback();
          }
          else{
            done();
          }

        } else {
          throw err;
        }
      });
  }
  else{
    //Don't drop the database

    if(callback){
      callback();
    }
    else{
      done();
    }
  }
};

//Establish connection to mongoDB
before(function(done) {
  mongoose.Promise = global.Promise;

  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose.connect(process.env.test_url, options, () => {
    let db = mongoose.connection;

    db.on("error", error => {
      console.error(console, error);
    });

    console.log("App connected to db:" + process.env.test_url);

    this.dropDatabase = dropDatabase;

    done();
  });
});

//Drop the database to cleanup previous data entries
before(function(done) {
  this.dropDatabase(done);
});
