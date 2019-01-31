const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connexion à la BDD'candidature'
mongoose.connect('mongodb://localhost/candidature',{useNewUrlParser:true}).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});

const app = express();

//Body Parser
let urlencodedParser = bodyParser.urlencoded({
    extended: true,
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/candidatures', require('./routes/candidatures'));
app.use('/admins', require('./routes/admins'));
app.use('/apprenants', require('./routes/apprenants'));
app.use('/candidats', require('./routes/candidats'));

console.log('le server est connecté sur le port 3010');
app.listen(3010);