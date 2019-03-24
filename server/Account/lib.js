const Apprenant = require("../Apprenant/apprenantModel");
const Candidat = require("../Candidat/candidatModel");
const bcrypt = require("bcrypt");

// --INSCRIPTION CANDIDAT
function signupCandidat(req, res) {
  if (!req.body.mail || !req.body.mdp || !req.body.nom || !req.body.prenom) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    console.log(req.body.mail);
    res.status(400).json({
      text: "Un champ est vide ou reqête invalide !"
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const candidat = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      mail: req.body.mail,
      mdp: bcrypt.hashSync(req.body.mdp, salt)
    };
    const findCandidat = new Promise(function(resolve, reject) {
      Candidat.findOne(
        {
          mail: candidat.mail
        },
        function(err, result) {
          if (err) {
            reject(500);
          } else {
            if (result) {
              reject(204);
            } else {
              resolve(true);
            }
          }
        }
      );
    });

    findCandidat.then(
      function() {
        const _a = new Candidat(candidat);
        _a.save(function(err, candidat) {
          if (err) {
            res.status(500).json({
              text: "Erreur interne"
            });
          } else {
            res.status(200).json({
              text: "Succès",
              token: candidat.getToken()
            });
          }
        });
      },
      function(error) {
        switch (error) {
          case 500:
            res.status(500).json({
              text: "Erreur interne"
            });
            break;
          case 204:
            res.status(204).json({
              text: "L'adresse email existe déjà"
            });
            break;
          default:
            res.status(500).json({
              text: "Erreur interne"
            });
        }
      }
    );
  }
}

// --INSCRIPTION APPRENANT
function signupApprenant(req, res) {
  if (!req.body.mail || !req.body.mdp) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    console.log(req.body.mail);
    res.status(400).json({
      text: "mot de passe ou mail invalide"
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    let apprenant = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      mail: req.body.mail,
      mdp: bcrypt.hashSync(req.body.mdp, salt)
    };
    const findApprenant = new Promise(function(resolve, reject) {
      Apprenant.findOne(
        {
          mail: apprenant.mail
        },
        function(err, result) {
          if (err) {
            reject(500);
          } else {
            if (result) {
              reject(204);
            } else {
              resolve(true);
            }
          }
        }
      );
    });

    findApprenant.then(
      function() {
        const _a = new Apprenant(apprenant);
        _a.save(function(err, apprenant) {
          if (err) {
            res.status(500).json({
              text: "Erreur interne"
            });
          } else {
            res.status(200).json({
              text: "Succès",
              token: apprenant.getToken()
            });
          }
        });
      },
      function(error) {
        switch (error) {
          case 500:
            res.status(500).json({
              text: "Erreur interne"
            });
            break;
          case 204:
            res.status(204).json({
              text: "L'adresse email existe déjà"
            });
            break;
          default:
            res.status(500).json({
              text: "Erreur interne"
            });
        }
      }
    );
  }
}

//On exporte nos 3 fonctions

exports.signupCandidat = signupCandidat;
exports.signupApprenant = signupApprenant;
