const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

app.listen(3000,()=>{
    console.log('App is listening');
});