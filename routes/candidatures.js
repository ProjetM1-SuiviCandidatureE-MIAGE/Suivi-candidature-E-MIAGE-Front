let router = require('express').Router();

let Candidature = require('../models/Candidature');

let Candidat = require ('../models/Candidat');

//--afficher toutes les candidatures
router.get('/gAC', (req, res)=>{
    Candidature.find({}).populate('candidats').then(candidatures => {
        res.render('index', { candidatures: candidatures });
    })
});

//Get all candidatures
router.get('/testGet', function(req,res) {
    Candidature.find( {}, function(err,candidatures) {
        if(err) {
            console.log(err);
        }
        console.log("hello" + candidatures);
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
router.post('/newCandidature', (req, res) =>{
    console.log(JSON.stringify(req.body));
    let newCandidature = new Candidature(req.body);
    newCandidature.id = newCandidature._id;

    newCandidature.save().then(()=>{
        res.status(200).json(newCandidature)
    },(err)=>{
        res.status(400).json(err);
    })
});

//-- modification des informations pour une candidature
router.put('/edit/:id', (req, res) =>{
    Candidature.findOne({id : req.params.id}).then((candidature)=>{
        if(candidature){
            res.status(200).json(candidature)
        }else{
            res.status(404).json({message : "Not Found"})
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
        res.render('nom du chemin DAMIEN', { candidature: candidature });
    },
    err => res.status(500).send(err));
});

module.exports = router;