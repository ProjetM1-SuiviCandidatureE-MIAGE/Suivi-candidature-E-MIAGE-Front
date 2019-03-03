const Admin = require("../Admin/adminModel");
const Apprenant = require("../Apprenant/apprenantModel");
const Candidat = require("../Candidat/candidatModel");
const bcrypt = require("bcrypt");

// --INSCRIPTION ADMINISTRATEUR
function signup(req, res) {
  if (!req.body.mail || !req.body.mdp) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    console.log(req.body.mail);
    res.status(400).json({
      text: "Requête invalide"
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    let admin = {
      mail: req.body.mail,
      //mdp: req.body.mdp
      mdp: bcrypt.hashSync(req.body.mdp, salt)
    };
    let findAdmin = new Promise(function(resolve, reject) {
      Admin.findOne(
        {
          mail: admin.mail
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

    findAdmin.then(
      function() {
        let _a = new Admin(admin);
        _a.save(function(err, admin) {
          if (err) {
            res.status(500).json({
              text: "Erreur interne"
            });
          } else {
            res.status(200).json({
              text: "Succès",
              token: admin.getToken()
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

// --INSCRIPTION CANDIDAT
function signupCandidat(req, res) {
  if (!req.body.mail || !req.body.mdp) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    console.log(req.body.mail);
    res.status(400).json({
      text: "Requête invalide"
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    let candidat = {
      mail: req.body.mail,
      //mdp: req.body.mdp
      mdp: bcrypt.hashSync(req.body.mdp, salt)
    };
    let findCandidat = new Promise(function(resolve, reject) {
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
        let _a = new Admin(candidat);
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
      mail: req.body.mail,
      //mdp: req.body.mdp
      mdp: bcrypt.hashSync(req.body.mdp, salt)
    };
    let findApprenant = new Promise(function(resolve, reject) {
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
        let _a = new Admin(apprenant);
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

//-- CONNEXION en tant que Candidat
function loginCandidat(req, res) {
  if (!req.body.mail || !req.body.mdp) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    res.status(400).json({
      text: "Requête invalide"
    });
  } else {
    Candidat.findOne(
      {
        mail: req.body.mail
      },
      function(err, candidat) {
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
              token: candidat.getToken(),
              text: "Authentification réussi"
            });
          } else {
            console.log("not connected");
            res.status(401).json({
              text: "Mot de passe incorrect"
            });
          }
        }
      }
    );
  }
}

//-- CONNEXION en tant qu'Apprenant
function loginApprenant(req, res) {
  if (!req.body.mail || !req.body.mdp) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    res.status(400).json({
      text: "Requête invalide"
    });
  } else {
    Apprenant.findOne(
      {
        mail: req.body.mail
      },
      function(err, apprenant) {
        if (err) {
          res.status(500).json({
            text: "Erreur interne"
          });
        } else if (!apprenant) {
          res.status(401).json({
            text: "L'utilisateur n'existe pas"
          });
        } else {
          if (apprenant.authenticate(req.body.mdp)) {
            console.log("connected");
            res.status(200).json({
              token: apprenant.getToken(),
              text: "Authentification réussi"
            });
          } else {
            console.log("not connected");
            res.status(401).json({
              text: "Mot de passe incorrect"
            });
          }
        }
      }
    );
  }
}

//-- CONNEXION en tant qu'Admin
function login(req, res) {
  if (!req.body.mail || !req.body.mdp) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    res.status(400).json({
      text: "Requête invalide"
    });
  } else {
    Admin.findOne(
      {
        mail: req.body.mail
      },
      function(err, admin) {
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
              token: admin.getToken(),
              text: "Authentification réussi"
            });
          } else {
            console.log("not connected");
            res.status(401).json({
              text: "Mot de passe incorrect"
            });
          }
        }
      }
    );
  }
}

//On exporte nos six fonctions

exports.login = login;
exports.signup = signup;

exports.loginCandidat = loginCandidat;
exports.signupCandidat = signupCandidat;

exports.loginApprenant = loginApprenant;
exports.signupApprenant = signupApprenant;