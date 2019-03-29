let auth = module.exports;
const Apprenant = require('./apprenantModel');
const bcrypt = require("bcrypt");

auth.checkAuth = function(req, res, next){
    console.info('Check Auth');

    // -- Recup Token Authorization
    let token = req.headers.authorization || req.query.authorization;

   // mongoose.model('apprenantModel')
   Apprenant.findOne({token : token}).then((user)=>{
        if(user){
            req.currentUser = user;
            next();
        }else{
            res.status(401).json({message : "Not Authorize"})
        }
    },(err)=>{
        res.status(400).json(err)
    });
};

// --INSCRIPTION Apprenant
function signupApprenant(req, res) {
    console.log("signUp");
    console.log(Apprenant.validateEmail);
    console.log("signUp2");
  
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Regex pour verifier le mail
  
    if (!req.body.mail || !req.body.mdp || !req.body.nom || !req.body.prenom || !req.body.mdpConfirmation) {
      //Le cas où l'email ou bien le password ne serait pas soumit ou nul
      console.log(req.body.mail);
      res.status(400).json({
        text: "Un champ est vide ou requête invalide !"
      });
    } 
    else if (req.body.mdpConfirmation !== req.body.mdp){
      res.status(401).json({
        text: "Les mots de passe ne correspondent pas"
      });
    }
  
    
    //---------Verification du mail--------
    else if (!re.test(req.body.mail)){
      res.status(401).json({
        text: "Le mail n'est pas correct."
      });
    }
  
    /*else if (Candidat.validateEmail(req.mail)){
      res.status(401).json({
        text: "Le mail n'est pas correct."
      });
    }*/
    else {
      const salt = bcrypt.genSaltSync(10);
      const candidat = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        mdp: bcrypt.hashSync(req.body.mdp, salt)
      };
      const findCandidat = new Promise(function(resolve, reject) {
        Apprenant.findOne(
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
          const _a = new Apprenant(candidat);
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
  
 exports.signupApprenant = signupApprenant;