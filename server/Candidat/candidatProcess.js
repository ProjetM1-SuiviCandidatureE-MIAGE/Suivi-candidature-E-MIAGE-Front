const Candidat = require('./Candidat');

   

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

exports.getCandidat = getCandidat;