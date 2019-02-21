const mongoose = require('mongoose');

//model pour une candidature
let candidatureSchema = new mongoose.Schema({

    etat : String,
    commentaire : String,
    date : String,
    dateTraitement : String,

    cv : {

        nom : String,
        date : String,
        fichier : String,
        type : String
    },

    lm : {

        nom : String,
        date : String,
        fichier : String,
        type : String
    },

    releveNote : {
        nom : String,
        date : String,
        fichier : String,
        type : String
    },

    autresFichier : [

        {
        nom : String,
        date : String,
        fichier : String,
        type : String,
        }
    ],

    candidat : {
        nom : String,
        prenom : String,
        mail : String,
        mdp : String
        /* type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidat' */

    }

});

let Candidature = mongoose.model('Candidature', candidatureSchema);
module.exports = Candidature;