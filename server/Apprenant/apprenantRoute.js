const router = require('express').Router();
const apprenantAction = require('./apprenantAction');

//--inscription
router.post('/signup', apprenantAction.signupApprenant );

//--Connexion
//router.post('/login', account.loginApprenant);
router.post('/login', apprenantAction.checkAuth);

module.exports = router;

