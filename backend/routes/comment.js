const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const commentsCtrl = require('../controllers/comment');
router.post('/',auth, multer, commentsCtrl.createComment);
router.get('/',auth, multer, commentsCtrl.getAllComment);

//routes à venir pour admin et user concerné
//router.put('/:id', auth, multer, commentsCtrl.modifyComment);
//router.delete('/:id', auth, commentsCtrl.deleteComment);

module.exports = router;