let router = require('express').Router();

let Admin = require('./Admin');
let account = require('../Account/lib');


//--inscription
router.post('/signup', account.signup );

//--Connexion
router.post('/login', account.login);

module.exports = router;