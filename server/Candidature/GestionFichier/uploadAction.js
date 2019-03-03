const Candidature = require ('../models/candidatureModel');
const fs = require('fs');

exports.createCandidature = (req, res, next) => {
  req.body.candidature = JSON.parse(req.body.candidature);
  const url = req.protocol + '://' + req.get('host');
  const candidature = new Candidature({
    cv :{
        nom: req.body.candidature.nom,
        date: req.body.candidature.date,
        fichier: url + '/images/' + req.file.filename
    },
    lm : {
        nom: req.body.candidature.nom,
        date: req.body.candidature.date,
        fichier: url + '/images/' + req.file.filename
    },
    releveNote : {
        nom: req.body.candidature.nom,
        date: req.body.candidature.date,
        fichier: url + '/images/' + req.file.filename
    }

    

  });
  candidature.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.modifyCandidature = (req, res, next) => {
  let candidature = new Candidature({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.candidature = JSON.parse(req.body.candidature);
    candidature = {
        cv :{
            nom: req.body.candidature.nom,
            date: req.body.candidature.date,
            fichier: url + '/images/' + req.file.filename
        },
        lm : {
            nom: req.body.candidature.nom,
            date: req.body.candidature.date,
            fichier: url + '/images/' + req.file.filename
        },
        releveNote : {
            nom: req.body.candidature.nom,
            date: req.body.candidature.date,
            fichier: url + '/images/' + req.file.filename
        }
    
    };
  } else {
    candidature = {
        cv :{
            nom: req.body.candidature.nom,
            date: req.body.candidature.date,
            fichier: req.body.fichier
        },
        lm : {
            nom: req.body.candidature.nom,
            date: req.body.candidature.date,
            fichier: req.body.fichier
        },
        releveNote : {
            nom: req.body.candidature.nom,
            date: req.body.candidature.date,
            fichier: req.body.fichier
        }
    };
  }
  Candidature.updateOne({_id: req.params.id}, candidature).then(
    () => {
      res.status(201).json({
        message: 'Candidature mise a jour avec succès!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteCandidature = (req, res, next) => {
    Candidature.findOne({_id: req.params.id}).then(
    (candidature) => {
      const filename = candidature.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Candidature.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Candidature Supprimé!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};
