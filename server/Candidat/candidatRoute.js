let router = require('express').Router();
const account = require('../Account/lib');
const candidatAction = require('./candidatAction');

//--inscription
router.post('/signup', account.signupCandidat);

//--Connexion
//router.post('/login', account.loginCandidat);

router.post('/login', candidatAction.checkAuth);

//--Creation d'une candidature
router.post('/newCandidat',candidatAction.newCandidat);

//--afficher les candidatures
router.get('/candidat', candidatAction.getCandidat);


module.exports = router;