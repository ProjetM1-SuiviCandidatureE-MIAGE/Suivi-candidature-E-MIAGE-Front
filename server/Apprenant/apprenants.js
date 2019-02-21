let router = require('express').Router();
let Apprenant = require('./../models/Apprenant');
let account = require('./Account/lib.js');

//--inscription
router.post('/signup', account.signupApprenant );

//--Connexion
router.post('/login', account.loginApprenant);

module.exports = router;

