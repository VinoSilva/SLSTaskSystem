const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const Sequelize = require('sequelize');

const http = require('http');

const whitelist = ["http://localhost:3000"];

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var models = require('./model');

// const socketIO = require('socket.io');

const fs = require('fs');

const realtime = require('./utilities/realtime');

const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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

const server = http.createServer({
  requestCert: false,
  rejectUnauthorized: false
},app);

realtime.connect(server);

models.sequelize.sync()
.then(function(){
  
  console.log('Connection has been established successfully.');
  
  server.listen(process.env.port,()=>{
      console.log('App is listening');
  });

})
.catch((err)=>{
  console.log(err);
});