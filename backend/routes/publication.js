const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const publicationsCtrl = require('../controllers/publication');
router.post('/', multer, publicationsCtrl.createPublication);
router.get('/', multer, publicationsCtrl.getAllPublication);
router.get('/:id', publicationsCtrl.getOnePublication);

/*



router.get('/:id', auth, publicationsCtrl.getOnePublication);


router.put('/:id', auth, multer, publicationsCtrl.modifyPublication);
router.delete('/:id', auth, publicationsCtrl.deletePublication);

router.post('/:id/like',auth, publicationsCtrl.likePublication);// gere l'ajout de like ou dislike
*/


module.exports = router;