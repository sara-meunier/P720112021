const multer = require('multer');

const MIME_TYPES = { //dictionnaire pour les extension de fichiers
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({// pour enregistrer le fichier sur le disque
  destination: (req, file, callback) => {
    callback(null, 'images'); //null pour dire qu'il n'y a pas d'erreur, images est le dossier de destination
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');// pour supprimer les espaces du nom et les remplacer par des underscores
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension); //pour etre sur d'avoir un nom de fichier unique
  }
});

module.exports = multer({storage: storage}).single('image');