let router = require('express').Router();
let Apprenant = require('./Apprenant');
let account = require('../Account/lib');

//--inscription
router.post('/signup', account.signupApprenant );

//--Connexion
router.post('/login', account.loginApprenant);

module.exports = router;

