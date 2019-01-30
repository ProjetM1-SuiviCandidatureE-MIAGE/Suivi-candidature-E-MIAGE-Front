const Candidature = require('../../models/Candidature.js');
const passwordHash = require("password-hash");

function newCandidature(req, res) {
    console.log(JSON.stringify(req.body));
    let newCandidature = new Candidature(req.body);
    newCandidature.id = newCandidature._id;

    newCandidature.save().then(()=>{
        res.status(200).json(newCandidature)
    },(err)=>{
        res.status(400).json(err);
    })
}


exports.newCandidature = newCandidature;