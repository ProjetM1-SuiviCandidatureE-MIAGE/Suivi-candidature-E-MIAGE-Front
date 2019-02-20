const router = require('express').Router();
const mongoose = require('mongoose');
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

// -- UPDATE
router.put('/edit/:id', function (req, res) {
    console.log(JSON.stringify(req.body));
    Candidature.updateOne({_id : mongoose.Types.ObjectId(req.params.id)}, {$set : req.body}, (err, updatedCandidature)=>{
       if(err){
           res.status(400).json(err + {message: "problème"});
       }else{
           
           res.status(200).json(updatedCandidature)
       }
    });
});

/*router.post('/update', function (req,res) {
    Candidature.updateOne({_id : mongoose.Types.ObjectId(req.body.id)}, {$set : req.body}, (err, updatedCandidature)=>{
        if(err){
            res.status(400).json(err + {message: "problème"});
        }else{
            res.status(200).json(updatedCandidature)
        }
    });
});*/
// -- READ
router.get('/read/:id', function (req, res) {
    Candidature.findOne({_id : mongoose.Types.ObjectId(req.params.id)}).then((candidature)=>{
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
router.delete('/delete/:id', (req, res) =>{
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