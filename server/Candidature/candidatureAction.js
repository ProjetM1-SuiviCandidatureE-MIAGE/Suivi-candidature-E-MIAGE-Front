const Candidat = require("../Candidat/candidatModel");
const CandidatureProcess = require("./candidatureProcess");

//--ajouter une nouvelle candidature
function newCandidature(req, res) {
  CandidatureProcess.newCandidature(req, res);
}

//--afficher toutes les candidatures
function displayAll(req, res) {
 CandidatureProcess.displayAll(req,res);
}

//--récupérer toute les candidatures
function getAllCandidatures(req, res) {
  CandidatureProcess.getAllCandidatures(req,res);
}

//--afficher les nouvelle candidatures
function DisplayNewCandidature(req, res) {
  CandidatureProcess.DisplayNewCandidature(req,res);
}

function editCandidature(req, res) {

  let candidat = new Candidat(req.body);
  let idParam = CandidatureProcess.getIdCandidature(candidat);
  
  setTimeout(function() {
    console.log("idParam : "+idParam);
    CandidatureProcess.editCandidature(idParam);
  }, 3000);
  
  
}

// -- READ
function readCandidature(req, res) {
  CandidatureProcess.readCandidature(req,res)
}

//--Suppression d'une candidature
function deleteCandidature(req, res) {
  CandidatureProcess.deleteCandidature(req,res);
}

/*ATTENTION ECRIRE EN DERNIER
recupération d'une candidature en fonction de l'id*/

function getIdCandidat(req, res) {
  CandidatureProcess.getIdCandidature(req,res);
}

exports.newCandidature = newCandidature;
exports.displayAll = displayAll;
exports.getAllCandidatures = getAllCandidatures;
exports.DisplayNewCandidature = DisplayNewCandidature;
exports.editCandidature = editCandidature;
exports.readCandidature = readCandidature;
exports.deleteCandidature = deleteCandidature;
exports.getIdCandidat = getIdCandidat;
