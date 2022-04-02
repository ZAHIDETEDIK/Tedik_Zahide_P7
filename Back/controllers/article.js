const Article = require('../models/article');
const mysql = require('mysql');


// Créer et sauver un Article OK !! format de date !!
exports.createArticle = (req, res, next) => {
    //Validation de requête
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide !",
        });
    }
    // Création d'un article
    const article = new Article({
        title: req.body.title,
        body: req.body.body,
        image: req.body.image,
        created_at: req.body.created_at,
        user_id: req.body.user_id
    });
    // Sauvegarde dans la DB
    Article.create(article, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Des erreurs se sont produites !",
            });
        }
        console.log(data);
        res.send(data);
    });
};

// suppprimer un article OK
exports.deleteArticle = (req, res, next) => {
    Article.deleteOne(req.params.articleId)
    .then(article => res.status(200).json(article))
    .catch(error => res.status(404).json ({ error }));
};

// modifier un Article OK !! format de date !!
exports.modifyArticle = (req, res, next) => {
    let article  = req.body;
    let articleId = req.params.articleId;
    console.log(articleId + " " + article);
    Article.updateOne(articleId, article)
    .then(() => res.status(200).json({ message: 'Article modifié !'}))
    .catch(error => res.status(404).json({ error }));
};

// récupérer TOUS les articles de TOUS les utilisateurs OK
exports.getArticles = (req, res, next) => {
    Article.findAll((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "des erreurs se sont produites",
            });
        }
        res.send(data);
    })
};

// récupérer TOUS les articles triés par date de création 
exports.getArticlesByCreatedDate = (req, res, next) => {
    Article.findAllByCreatedAt((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "des erreurs se sont produites",
            });
        }
        res.send(data);
    })
};

// récupérer TOUS les articles triés par date de mise ajour 
exports.getArticlesByUpdatedDate = (req, res, next) => {
    Article.findAllByUpdatedAt((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "des erreurs se sont produites",
            });
        }
        res.send(data);
    })
};

// Récupérer un article précis à partir de son id 
exports.getOneArticle = (req, res, next) => {
    Article.findOne(req.params.id)
    .then(article => res.status(200).json(article))
    .catch(error => res.status(404).json({ error }));
};

// récupérer tous les articles d'UN utilisateur 
exports.getArticlesOfOneUser = (req, res, next) => {
    Article.findAllByUser(req.params.user_id)
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(404).json({ error }));
};
