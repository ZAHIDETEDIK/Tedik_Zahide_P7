// Création d'un article OK
router.post('/createArticle/', auth, articleCtrl.createArticle);

// Suppression d'un article OK
router.delete('/article/delete/:articleId', auth, articleCtrl.deleteArticle);

// Modification d'un article
router.put('/article/update/:articleId', auth, articleCtrl.modifyArticle);

// Récupérer TOUS les articles 
router.get('/articles/', articleCtrl.getArticles);

// Récupérer tous les articles par date de création
router.get('/articles/createdAt/', auth, articleCtrl.getArticlesByCreatedDate);

// Récupérer tous les articles par date de mise a jour
router.get('/articles/updatedAt/', auth, articleCtrl.getArticlesByUpdatedDate);

// Récupérer un article par son id 
router.get('/article/:id', auth, articleCtrl.getOneArticle);

// Récupérer TOUS les articles d'UN utilisateur 
router.get('/articles/user/:user_id', auth, articleCtrl.getArticlesOfOneUser);



module.exports = router;