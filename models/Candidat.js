let mongoose = require('mongoose');
let candidatSchema = new mongoose.Schema({

    nom : String,
    prenom : String,
    mail : String,
    mdp : String

});

//champs qui n'est pas stocké dans la base calculé et permet la relation entre les différents candidats
candidatSchema.virtual('candidatures', {
    ref: 'Candidature',
    localField: '_id',
    foreignField: 'candidat'
});

let Candidat = mongoose.model('Candidat', candidatSchema);
module.exports = Candidat;