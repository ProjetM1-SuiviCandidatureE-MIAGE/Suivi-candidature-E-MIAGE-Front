const router = require('express').Router();
const adminAction = require('./adminAction');
const account = require('../Account/lib');


//--inscription
router.post('/signup', account.signup );

//--Connexion
//router.post('/login', account.login);
router.post('/login', adminAction.checkAuth);
module.exports = router;