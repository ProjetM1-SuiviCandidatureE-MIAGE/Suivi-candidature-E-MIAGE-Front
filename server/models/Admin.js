const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
		return bcrypt.compareSync(password, this.mdp);
	},
	getToken: function () {
		return jwt.encode(this, config.secret);
	}
}

let Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;