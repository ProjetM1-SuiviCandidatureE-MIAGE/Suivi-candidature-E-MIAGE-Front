const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../config/config');

let adminSchema = new mongoose.Schema({
    
    nom : String,
    prenom : String,
    mail : String,
    mdp : String,
    droit : String
    

});

adminSchema.methods = {
	authenticate: function (password) {
		return passwordHash.verify(mdp, this.password);
	},
	getToken: function () {
		return jwt.encode(this, config.secret);
	}
}

let Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;