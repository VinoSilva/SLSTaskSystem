var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
require('dotenv').config();

var db = {};

var dbName = null;
var hostName = null;


//Refactor later to use config.js
if(env === 'development'){
    dbName = process.env.devdb;
    hostName = process.env.hostname;
}
else if(env === 'production'){
    dbName = process.env.db;
}
else{ //It is test
    dbName = process.env.testdb;
    hostName = process.env.hostname;
}

var sequelize = new Sequelize(dbName,process.env.user,process.env.pass,{
    host: hostName,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    // logging: false
});


var files = fs.readdirSync(__dirname,(err)=>{
    if(err){
        throw err;
    }
});


files.filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
    var model = sequelize['import'](path.join(__dirname,file));
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
});
  
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;