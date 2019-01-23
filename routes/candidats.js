let router = require('express').Router();

let Candidat = require ('./../models/Candidat');
<<<<<<< HEAD

router.get('/candidat', (req, res) =>{

=======
//--afficher les candidatures
router.get('/:candidat', (req, res) =>{
    Candidat.findOne({ nom: req.params.candidat }).populate('candidatures').then(candidat => {
        if (!candidat)return res.status(404).send('candidat introuvable');
        res.render('chemin Damien pour les candidats', {
            candidat: candidat,
            candidatures: candidat.candidatures
        });
    }, err => console.log(err));
>>>>>>> e69bb6e1ebe6b4b96ce2e93c43bb560ce30d0f6f
});

module.exports = router;