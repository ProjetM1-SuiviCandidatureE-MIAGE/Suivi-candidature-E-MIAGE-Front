let express = require('express');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/candidature');

let app = express();

console.log('le server est connecté sur le port 3010');
app.listen(3010);