let router = require("express").Router();
const candidatAction = require("./candidatAction");

//--inscription
router.post("/signup", candidatAction.signupCandidat);

//--Connexion
router.post("/login", candidatAction.checkAuth);

//--afficher les candidatures
router.get("/candidat", candidatAction.getCandidat);

module.exports = router;
