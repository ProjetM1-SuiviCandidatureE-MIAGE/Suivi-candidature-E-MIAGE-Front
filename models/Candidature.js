let mongoose = require('mongoose');
let candidatureSchema = new mongoose.Schema({

    etat : String,
    commentaire : String,
    date : String,

    cv : {

        nom : String,
        date : String,
        fichier : String
    },

    lm : {

        nom : String,
        date : String,
        fichier : String
    },

    releveNote : {
        nom : String,
        date : String,
        fichier : String
    },

    autresFichier : [

        {
        nom : String,
        date : String,
        fichier : String,
        }
    ],

    candidat : {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidat'

    }

});
let Candidature = mongoose.model('Candidature', candidatureSchema);
module.exports = Candidature;