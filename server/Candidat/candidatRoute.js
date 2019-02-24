let router = require('express').Router();
const account = require('../Account/lib');
const candidatAction = require('./candidatAction');

//--inscription
router.post('/signup', account.signupCandidat);

//--Connexion
router.post('/login', account.loginCandidat);

//--afficher les candidatures
router.get('/candidat', candidatAction.getCandidat);


module.exports = router;