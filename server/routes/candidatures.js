const router = require('express').Router();

const Candidature = require('../models/Candidature');

const Candidat = require ('../models/Candidat');

const ajoutCandidature = require ('./Candidatures/lib.js');

//--afficher toutes les candidatures
router.get('/gAC', (req, res)=>{
    Candidature.find({}).populate('candidats').then(candidatures => {
        res.send('index', { candidatures: candidatures });
    })
});

//Get all candidatures
router.get('/getAllCandidatures', function(req,res) {
    Candidature.find( {}, function(err,candidatures) {
        if(err) {
            console.log(err);
        }
        res.send(candidatures);
    });
});

//--afficher les nouvelle candidatures
router.get('/new', (req, res) => {
    Candidat.find({}).then(candidats => {
        let candidature = new Candidature();
        res.render('index', { candidature: candidature, candidats: candidats, endpoint: '/' });
    });

});

//--Creation d'une candidature
router.post('/newCandidature',ajoutCandidature.newCandidature);

//-- modification des informations pour une candidature
router.put('/edit/:id', (req, res) =>{
    console.log("coucou");
    Candidature.findOne({_id : req.params.id}).then((candidature)=>{
        if(candidature){
            res.status(200).send(candidature)
        }else{
            res.status(404).send({message : "Not Found"})
        }
    },(err)=>{
        res.status(400).json(err)
    });
});

//--Suppression d'une candidature
router.get('/delete/:id', (req, res) =>{
    Candidature.find({id : req.params.id}).deleteOne().then(()=>{
        res.status(204).json()
    },(err)=>{
        res.status(400).json(err);
    });
});

/*ATTENTION ECRIRE EN DERNIER*/ 
router.get('/:id', (req, res) =>{
    Candidature.findById(req.params.id).populate('candidats').then(candidature => {
        res.send('index', { candidature: candidature });
    },
    err => res.status(500).send(err));
});

module.exports = router;