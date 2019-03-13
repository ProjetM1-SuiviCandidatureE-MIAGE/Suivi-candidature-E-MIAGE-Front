const Candidat = require("./candidatModel");
const auth = module.exports;

// AUTHENTIFICATION
auth.checkAuth = function(req, res, next) {
  if (!req.body.mail || !req.body.mdp) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    res.status(400).json({
      text: "Mot de passe vide ou mail vide"
    });
  } else {
    Candidat.findOne({ mail: req.body.mail }, function(err, candidat) {
      if (err) {
        res.status(500).json({
          text: "Erreur interne"
        });
      } else if (!candidat) {
        res.status(401).json({
          text: "L'utilisateur n'existe pas"
        });
      } else {
        if (candidat.authenticate(req.body.mdp)) {
          console.log("connected");
          res.status(200).json({
            text: "Authentification réussi",
            token: candidat.getToken()
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
// new Candidat
function newCandidat(req, res) {
  console.log(JSON.stringify(req.body));
  const newCandidat = new Candidat(req.body);
  newCandidat.id = newCandidat._id;

  newCandidat.save().then(
    () => {
      res.status(200).json(newCandidat);
    },
    err => {
      res.status(400).json(err);
    }
  );
}

// get candidat
function getCandidat(req, res) {
  console.log(JSON.stringify(req.body));
  Candidat.findOne({ nom: req.params.candidat })
    .populate("candidatures")
    .then(
      candidat => {
        if (!candidat) return res.status(404).send("candidat introuvable");
        res.render("index", {
          candidat: candidat,
          candidatures: candidat.candidatures
        });
      },
      err => console.log(err)
    );
}

exports.newCandidat = newCandidat;
exports.getCandidat = getCandidat;
