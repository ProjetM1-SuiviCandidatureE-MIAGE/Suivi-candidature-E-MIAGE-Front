const Candidature = require('./candidatureModel');
const Candidat = require ('../Candidat/candidatModel');

//--ajouter une nouvelle candidature
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

//--afficher toutes les candidatures
function displayAll (req, res){
    Candidature.find({}).populate('candidats').then(candidatures => {
        res.send('index', { candidatures: candidatures });
    })
}

//Get all candidatures
function getAllCandidatures (req, res){
    Candidature.find( {}, function(err,candidatures) {
        if(err) {
            console.log(err);
        }
        res.send(candidatures);
    });
}

//--afficher les nouvelle candidatures
function DisplayNewCandidature (req, res){

    Candidat.find({}).then(candidats => {
        let candidature = new Candidature();
        res.render('index', { candidature: candidature, candidats: candidats, endpoint: '/' });
    });
}

// -- UPDATE
function editCandidature (req,res){
    Candidature.updateOne({_id : req.params.id}, {$set : req.body}, (err, updatedCandidature)=>{
        if(err){
            res.status(400).json(err);
        }else{
            res.status(200).json(updatedCandidature)
        }
    });
}

// -- READ
function readCandidature (req, res){
    Candidature.findOne({_id : req.params.id}).then((candidature)=>{
        if(candidature){
            res.status(200).json(candidature)
        }else{
            res.status(404).json({message : "Not Found"})
        }
    },(err)=>{
        res.status(400).json(err)
    });
}

//--Suppression d'une candidature
function deleteCandidature(req, res){
    Candidature.find({id : req.params.id}).deleteOne().then(()=>{
        res.status(204).json()
    },(err)=>{
        res.status(400).json(err);
    });
}

/*ATTENTION ECRIRE EN DERNIER
recupération d'une candidature en fonction de l'id*/ 
function getIdCandidat(req, res){
    Candidature.findById(req.params.id).populate('candidats').then(candidature => {
        res.send('index', { candidature: candidature });
    },
    err => res.status(500).send(err));
}

exports.newCandidature = newCandidature;
exports.displayAll = displayAll;
exports.getAllCandidatures = getAllCandidatures;
exports.DisplayNewCandidature = DisplayNewCandidature;
exports.editCandidature = editCandidature;
exports.readCandidature = readCandidature;
exports.deleteCandidature = deleteCandidature;
exports.getIdCandidat = getIdCandidat;