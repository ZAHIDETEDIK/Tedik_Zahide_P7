const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middlewares/auth');

// Créer un nouveau commentaire 
router.post('/createComment/', auth, commentCtrl.createComment);

// Récupérer tous les commentaires d'un article 
router.get('/comments/article/:articleId', commentCtrl.findAllComments);

// Récupérer un comment par son id (modification) 
router.get('/comment/:commentId', auth, commentCtrl.findCommentById);

// Mettre a jour un comment 
router.put('/comment/update/:commentId', auth, commentCtrl.updateComment);

// Effacer un comment 
router.delete('/comment/delete/:commentId', auth, commentCtrl.deleteOneComment);

module.exports = router;