let router = require('express').Router();

let Admin = require('./../models/Admin');
let account = require('./Account/lib.js');


//--inscription
router.post('/signup', account.signup );

//--Connexion
router.post('/login', account.login);

module.exports = router;