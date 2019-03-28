const Candidature = require("./candidatureModel");
const Candidat = require("../Candidat/candidatModel");
   

// -- UPDATE
function editCandidature(req, res) {
    console.log("Req : "+req);
    Candidature.updateOne(
      { _id: req },
      { $set: req.body },
      (err, updatedCandidature) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(updatedCandidature);
        }
      }
    );
  }

  function getIdCandidature(req, res) {


    Candidature.findOne({"candidat.mail" : "pogoman28@gmail.com"}, function(err, result) {
        if (err) throw err;
        console.log("ID is : "+result._id);
      });
  }


  exports.editCandidature = editCandidature;
  exports.getIdCandidature = getIdCandidature;
