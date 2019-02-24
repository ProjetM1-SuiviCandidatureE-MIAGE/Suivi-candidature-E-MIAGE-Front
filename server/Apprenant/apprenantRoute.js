const router = require('express').Router();

const account = require('../Account/lib');

//--inscription
router.post('/signup', account.signupApprenant );

//--Connexion
router.post('/login', account.loginApprenant);

module.exports = router;

