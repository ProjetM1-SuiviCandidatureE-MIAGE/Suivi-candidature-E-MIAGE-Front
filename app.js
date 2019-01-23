const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/candidature');

const app = express();

//Body Parser
let urlencodedParser = bodyParser.urlencoded({
    extended: true,
    useNewUrlParser: true //Inutile ?
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//On définit la route Hello
app.get('/hello',function(req,res){
    res.json("Hello World")
})

console.log('le server est connecté sur le port 3010');
app.listen(3010);