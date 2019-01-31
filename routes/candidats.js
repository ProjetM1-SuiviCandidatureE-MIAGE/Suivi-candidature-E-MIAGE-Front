let router = require('express').Router();

let Candidat = require ('./../models/Candidat');
//--afficher les candidatures
router.get('/:candidat', (req, res) =>{
    Candidat.findOne({ nom: req.params.candidat }).populate('candidatures').then(candidat => {
        if (!candidat)return res.status(404).send('candidat introuvable');
        res.render('index', {
            candidat: candidat,
            candidatures: candidat.candidatures
        });
    }, err => console.log(err));
});

module.exports = router;