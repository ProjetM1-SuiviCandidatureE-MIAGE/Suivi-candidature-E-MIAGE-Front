const mongoose = require('mongoose');

const validateEmail = function(email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email)
};
const apprenantSchema = new mongoose.Schema({

	nom : {
		type : String,
	//	required : [true,'Le champs truc nom ne peut pas être vide']
	},
	prenom : {
			type : String,
	//		required : [true,'Le champs prenom ne peut pas être vide']
	},
	mail : {
			type: String,
	//		required: [true,'Le champs mail ne peut pas être vide']

	},
	mdp : {
			type : String,
	//		required : [true,'Le champs mdp ne peut pas être vide']

	}
});


const Apprenant = mongoose.model('Apprenant', apprenantSchema);
module.exports = Apprenant;