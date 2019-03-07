const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../config/config');

const validateEmail = function(email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email)
};
const apprenantSchema = new mongoose.Schema({

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

apprenantSchema.methods = {
	authenticate: function (password) {
		return bcrypt.compareSync(password, this.mdp);
	},
	getToken: function () {
		return jwt.encode(this, config.secret);
	}
}


const Apprenant = mongoose.model('Apprenant', apprenantSchema);
module.exports = Apprenant;