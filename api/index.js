const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

mongoose.connect(process.env.db_url,options,()=>{
    app.listen(process.env.port,()=>{
        console.log('App is listening');
    });
});