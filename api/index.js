const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const Sequelize = require('sequelize');

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

const taskRoute = require('./routes/task.routes');

require('dotenv').config();

//Setup middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/task",taskRoute);

let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
};

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
.then(() => {
  
  console.log('Connection has been established successfully.');
  
  app.listen(process.env.port,()=>{
      console.log('App is listening');
  });
  
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
