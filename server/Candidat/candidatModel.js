const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../config/config');

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const candidatSchema = new mongoose.Schema({
  nom : {
    type : String,
    require : [true,'Le champs prenom ne peut pas être vide']
  },
  prenom : {
      type : String,
      require : [true,'Le champs prenom ne peut pas être vide']
  },
  mail : {
      type: String,
      require: [true,'Le champs mail ne peut pas être vide']
  },
  mdp : {
      type : String,
      require : [true,'Le champs mdp ne peut pas être vide']

  }
});


//champs qui n'est pas stocké dans la base calculé et permet la relation entre les différents candidats
candidatSchema.virtual('candidatures', {
    ref: 'Candidature',
    localField: '_id',
    foreignField: 'candidat'
});

candidatSchema.methods = {
	authenticate: function (password) {
		return bcrypt.compareSync(password, this.mdp);
	},
	getToken: function () {
		return jwt.encode(this, config.secret);
	}
}



const Candidat = mongoose.model('Candidat', candidatSchema);
module.exports = Candidat;