const router = require('express').Router();

const account = require('../Account/lib');


//--inscription
router.post('/signup', account.signup );

//--Connexion
router.post('/login', account.login);

module.exports = router;