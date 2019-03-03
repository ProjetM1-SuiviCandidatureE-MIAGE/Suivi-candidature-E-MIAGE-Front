const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//--CONSTANT POUR LE TEST GESTION DES FICHIERS
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
//--END CONSTANT

// Connexion à la BDD'candidature'
mongoose.connect('mongodb://localhost/candidature',{useNewUrlParser:true}).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});

const app = express();
const mongoURI = 'mongodb://localhost/candidature';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

//Body Parser
let urlencodedParser = bodyParser.urlencoded({
    extended: true,
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//--PARTIE TEST POUR LA GESTION DES FICHIERS----
app.use(methodOverride('_method'));

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
//-- END PARTIE TEST POUR LA GESTION DES FICHIERS---

//---TEST UPLOAD FICHIER
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));
//---FIN TEST UPLOAD FICHIER 

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/candidatures', require('./Candidature/candidatureRoute'));
app.use('/admins', require('./Admin/adminRoute'));
app.use('/apprenants', require('./Apprenant/apprenantRoute'));
app.use('/candidats', require('./Candidat/candidatRoute'));

console.log('le server est connecté sur le port 3010');
app.listen(3010);