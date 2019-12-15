var should = require("chai").should();

const Sequelize = require('sequelize');

require("dotenv").config();

var models = require('../model/');

//Make function to completely clean drop the database and recreate it

function ClearDB(callback){
  models.sequelize.sync({force:true})
  .then(function(){
    console.log('Cleared DB');
    
    callback();
  })
  .catch((err)=>{
    callback(err);
  });
}

//Establish connection to mysql
before(function(done) {
   
// const sequelize = new Sequelize(process.env.devdb,process.env.user,process.env.pass, {
//   host: "localhost",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// }); 

// sequelize
// .authenticate()
// .then(function(){
//   this.sequelize = sequelize;
//   console.log('Successfully connected');
//   done();
// })

  models.sequelize.sync({force:true})
  .then(function(){

    console.log('Connection has been established successfully');

    this.ClearDB = ClearDB;

    done();

  })
  .catch((err)=>{
    throw err;
  });

});

// //Drop the database to cleanup previous data entries
// before(function(done) {

// });
