let auth = module.exports;
const Admin = require("./adminModel");

auth.checkAuth = function(req, res, next) {
  if (!req.body.mail || !req.body.mdp) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    res.status(400).json({
      text: "Mot de passe vide ou mail vide"
    });
  } else {
    Admin.findOne({ mail: req.body.mail }, function(err, admin) {
      if (err) {
        res.status(500).json({
          text: "Erreur interne"
        });
      } else if (!admin) {
        res.status(401).json({
          text: "L'utilisateur n'existe pas"
        });
      } else {
        if (admin.authenticate(req.body.mdp)) {
          console.log("connected");
          res.status(200).json({
            text: "Authentification réussi",
            token: admin.getToken()
          });
        } else {
          console.log("not connected");
          res.status(401).json({
            text: "Mot de passe incorrect"
          });
        }
      }
    });
  }
};
