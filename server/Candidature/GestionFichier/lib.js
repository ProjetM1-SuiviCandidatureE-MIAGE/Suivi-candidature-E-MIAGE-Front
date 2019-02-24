const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
let router = require('express').Router();
const gfs = require('gfs');

// Mongo URI
const mongoURI = 'mongodb://localhost/candidature';
// Creation storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// @route GET /
// @desc charger le formulaire
router.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check s'il y a des fichiers
    if (!files || files.length === 0) {
      res.render('index', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('index', { files: files });
    }
  });
});

// @route POST /upload
// @desc  Télécharge le fichier dans la base de données
router.post('/upload', upload.single('file'), (req, res) => {
  // res.json({ file: req.file });
  res.redirect('/');
});

// @route GET /files
// @desc  Afficher tous les fichiers en JSON
router.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Vérifier si les fichiers
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'Aucun fichier n\'existe'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Afficher un objet d'un fichier unique
router.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Vérifier si les fichiers
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'Aucun fichier n\'existe'
      });
    }
    //le fichier existe
    return res.json(file);
  });
});

//--- FAIRE AFFICHER LE FICHIER EN FORMAT IMAGE (et dl images au cas ou ça peut servir) ---

// @route GET /image/:filename
// @desc Afficher l'image
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'Aucun fichier n\'existe'
      });
    }

    // Check si image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Lire la sortie sur le navigateur
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Pas une image'
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Supprimer un fichier
router.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.redirect('/');
  });
});

module.exports = router;