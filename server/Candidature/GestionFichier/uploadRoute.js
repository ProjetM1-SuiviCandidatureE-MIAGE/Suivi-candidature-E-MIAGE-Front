const router = require('express').Router();

const multer = require('./GestionFicher/multer-config');

const uploadAction = require('./GestionFichier/uploadAction');

router.post('createUploadFichier/', multer, uploadAction.createCandidature);
router.put('updateUploadFichier/:id',  multer, uploadAction.modifyCandidature);
router.delete('deleteUploadFichier/:id', uploadAction.deleteCandidature);

module.exports = router;