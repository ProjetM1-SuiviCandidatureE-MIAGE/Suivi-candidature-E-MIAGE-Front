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

router.get('/candidats', function(req, res){
    res.send({type:'GET'});
});
//update
router.put('/candidats/:id', function(req, res){
    res.send({type:'PUT'});
});


//-- modification des informations pour une candidature
/*router.put('/edit/:id', (req, res) =>{
    Candidature.findOne({id : req.params.id}).then((candidature)=>{
        if(candidature){
            res.status(200).send(candidature)
        }else{
            res.status(404).send({message : "Not Found"})
        }
    },(err)=>{
        res.status(400).json(err)
    }); 
     Candidature.findByIdAndUpdate({_id : req.param.id}, {$set : req.body}, (err, candidature) => {
        if(err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(candidature);
        }
    }) 
    
    Candidature.updateOne({_id: req.params.id}, {$set : req.body}, (err, candidature) => {
        if(err) {;
            res.status(400).send(err);
        } else {
            res.status(200).send(candidature)
        }
    })
});

router.put('/update', function(req, res) {
    var id = req.body._id;
    Candidature.updateOne(id, {$set : req.body}, (err, candidature) => {
        if(err) {;
            res.status(400).send(err);
            
        } else {
            res.status(200).send(candidature)
        }
    })
});*/
// -- UPDATE
router.put('/edit/:id', function (req, res) {
    Candidature.updateOne({id : req.params.id}, {$set : req.body}, (err, updatedCandidature)=>{
       if(err){
           res.status(400).json(err);
       }else{
           //res.send({type:'PUT'});
           res.status(200).json(updatedCandidature)
           
       }
    });
});

// -- READ
router.get('/update/:id', function (req, res) {
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
router.delete('/delete/:id', (req, res) =>{
    Candidature.find({id : req.params.id}).deleteOne().then(()=>{
       // res.send({type:'DELETE'})
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