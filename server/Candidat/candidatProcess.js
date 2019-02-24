let express = require('express').app(),
    app = express();
   
   

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


const Routes = require('./candidatRoute');
const Actions = require('./candidatAction');
const Model = require('./candidatModel');

