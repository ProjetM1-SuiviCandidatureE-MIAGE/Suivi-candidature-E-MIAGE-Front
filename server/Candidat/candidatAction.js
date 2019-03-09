const Candidat = require('./candidatModel');
let auth = module.exports;

// AUTHENTIFICATION
auth.checkAuth = function(req, res, next){
    console.info('Check Auth');

    // --- Base de donnees
    let mongoose = require('mongoose');

    // -- Recup Token Authorization
    let token = req.headers.authorization || req.query.authorization;

    //mongoose.model('candidatModel')
    Candidat.findOne({token : token}).then((candidat)=>{
        if(candidat){
            console.log ("ok" + candidat);
            req.currentUser = candidat;
            next();
        }else{
            res.status(401).json({message : "Not Authorize"})
        }
    },(err)=>{
        res.status(400).json(err)
    });
};

// new Candidat
function newCandidat(req, res) {
    console.log(JSON.stringify(req.body));
    let newCandidat = new Candidat(req.body);
    newCandidat.id = newCandidat._id;

    newCandidat.save().then(()=>{
        res.status(200).json(newCandidat)
    },(err)=>{
        res.status(400).json(err);
    })
}

// get candidat
function getCandidat(req, res) {
    console.log(JSON.stringify(req.body));
    Candidat.findOne({ nom: req.params.candidat }).populate('candidatures').then(candidat => {
        if (!candidat)return res.status(404).send('candidat introuvable');
        res.render('index', {
            candidat: candidat,
            candidatures: candidat.candidatures
        });
    }, err => console.log(err));
}

exports.newCandidat = newCandidat;
exports.getCandidat = getCandidat;