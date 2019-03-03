const mongoose = require('mongoose');

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

//model pour une candidature
const candidatureSchema = new mongoose.Schema({

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
        nom : {
            type : String,
        //  required : true
         //   required : [true,'Le champs truc prenom ne peut pas être vide']
        },
        prenom : {
            type : String,
          //  required : true
         //   required : [true,'Le champs prenom ne peut pas être vide']
        },
        mail : {
            type: String,
         //   required : true
         //   required: [true,'Le champs mail ne peut pas être vide']
        },
        mdp : {
            type : String,
         //   required : true
         //   required : [true,'Le champs mdp ne peut pas être vide']
       
        },
        /* type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidat' */
    }

});

const Candidature = mongoose.model('Candidature', candidatureSchema);
module.exports = Candidature;