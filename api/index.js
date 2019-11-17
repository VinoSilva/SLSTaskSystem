const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");

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

mongoose.connect(process.env.test_url,options,()=>{
    app.listen(process.env.port,()=>{
        console.log('App is listening');
    });
});