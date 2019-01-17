let mongoose = require('mongoose');
let adminSchema = new mongoose.Schema({
    

});
let Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;