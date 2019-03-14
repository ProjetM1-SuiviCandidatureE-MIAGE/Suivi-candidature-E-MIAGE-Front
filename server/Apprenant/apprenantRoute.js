const router = require('express').Router();
const apprenantAction = require('./apprenantAction');
const account = require('../Account/lib');

//--inscription
router.post('/signup', account.signupApprenant );

//--Connexion
//router.post('/login', account.loginApprenant);
router.post('/login', apprenantAction.checkAuth);

module.exports = router;

