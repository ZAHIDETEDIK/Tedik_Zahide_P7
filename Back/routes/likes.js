const express = require('express');
const router = express.Router()

const likeCtrl = require('../controllers/likes');
const auth = require('../middlewares/auth');

// Ajouter un like à un article
//router.post('/:articleId/like', auth, likeCtrl.addLike);
router.post('/:articleId/likeDislike', auth, likeCtrl.addLikeDislike);


module.exports = router;