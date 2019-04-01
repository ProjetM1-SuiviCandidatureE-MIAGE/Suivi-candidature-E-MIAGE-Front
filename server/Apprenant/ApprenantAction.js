let auth = module.exports;

const ApprenantProcess = require("./apprenantProcess");

auth.checkAuth = function(req, res, next){
    ApprenantProcess.checkAuth(req, res);
};

// --INSCRIPTION Apprenant
function signupApprenant(req, res) {
  ApprenantProcess.checkAuth(req,res);
  }
  
 exports.signupApprenant = signupApprenant;