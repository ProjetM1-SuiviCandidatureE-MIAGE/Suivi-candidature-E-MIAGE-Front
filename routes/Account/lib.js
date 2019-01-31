const Admin = require('../../models/Admin.js');
const passwordHash = require("password-hash");

// --INSCRIPTION ADMINISTRATEUR
function signup(req, res) {
    if (!req.body.mail || !req.body.mdp) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        let admin = {
            mail: req.body.mail,
            mdp: passwordHash.generate(req.body.mdp)
        }
        let findAdmin = new Promise(function (resolve, reject) {
            Admin.findOne({
                mail: admin.mail
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        })

        findAdmin.then(function () {
            let _a = new Admin(admin);
            _a.save(function (err, admin) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": admin.getToken()
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
}

//-- CONNEXION en tant qu'Admin
function login(req, res) {
    if (!req.body.mail || !req.body.mdp) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        Admin.findOne({
            mail: req.body.mail
        }, function (err, admin) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            } else if (!admin) {
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            } else {
                if (admin.authenticate(req.body.mdp)) {
                    res.status(200).json({
                        "token": admin.getToken(),
                        "text": "Authentification réussi"
                    })
                } else {
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
            }
        })
    }
}

//On exporte nos deux fonctions

exports.login = login;
exports.signup = signup;