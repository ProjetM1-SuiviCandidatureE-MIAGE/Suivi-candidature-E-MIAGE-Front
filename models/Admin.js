let mongoose = require('mongoose');
let adminSchema = new mongoose.Schema({
    
    nom : String,
    prenom : String,
    mail : String,
    mdp : String,
    droit : String
    

});
let Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;