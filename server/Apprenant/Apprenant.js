let mongoose = require('mongoose');
let apprenantSchema = new mongoose.Schema({

    nom : String,
    prenom : String,
    mail : String,
    mdp : String
    

});
let Apprenant = mongoose.model('Apprenant', apprenantSchema);
module.exports = Apprenant;