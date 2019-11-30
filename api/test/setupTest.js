var should = require("chai").should();

const Sequelize = require('sequelize');

require("dotenv").config();

//Make function to completely clean drop the database and recreate it


//Establish connection to mysql
before(function(done) {
   
  const sequelize = new Sequelize(process.env.devdb,process.env.user,process.env.pass, {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }); 

  sequelize
  .authenticate()
  .then(function(){
    this.sequelize = sequelize;
    console.log('Successfully connected');
    done();
  })

});

// //Drop the database to cleanup previous data entries
// before(function(done) {

// });
