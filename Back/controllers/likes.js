const LikeDislike = require('../models/likes');
const mysql = require('mysql')

exports.addLikeDislike = (req,res) => {
    // Définir le constructeur
    const likeDislike = new LikeDislike({
        userId: req.body.userId,
        articleId: req.body.articleId,
        likes: req.body.likes,
        dislikes: req.body.dislikes
    });
    // Récupérer les avis d'un article
    LikeDislike.findByArticleId(req.body.articleId)
    .then(like => {
        //console.log(like);
        let userId = req.body.userId;
        //console.log(userId);
        let userWantsToLike = (req.body.likes === 1);
        //console.log(userWantsToLike);
        let userWantsToDislike = (req.body.dislikes === 1);
        //console.log(userWantsToDislike);
        let userWantsToCancel = (req.body.likes === 0 && req.body.dislikes ===0);
        //console.log(userWantsToCancel);
        let userCanLikeDislike = (!like.includes(userId));
        console.log(userCanLikeDislike);
        let userCanCancel = (like.includes(userId));
        console.log(userCanCancel);
        // Vérifier que l'utilisateur peut intéragir (qu'il ne l'a pas déjà fait)
        // Ou qu'il peut annuler son vote
        if (userWantsToLike && userCanLikeDislike) {
            // Lancer l'intéraction correspondante
            LikeDislike.like(likeDislike, (err, data) => {
                if(err) {
                    res.status(500).send({
                        message : err.message || "raté !"
                    });
                    console.log(data)
                    res.send(data);
                }
            })
        }
        if (userWantsToDislike && userCanLikeDislike) {
            LikeDislike.dislike(likeDislike, (err, data) => {
                if(err) {
                    res.status(500).send({
                        message : err.message || "raté !"
                    });
                    console.log(data)
                    res.send(data);
                }
            })

        }
        if (userWantsToCancel && userCanCancel) {
            LikeDislike.cancelLikeDislike(req.body.articleId, req.body.userId, (err, data) => {
                if(err) {
                    res.status(500).send({
                        message : err.message || "raté !"
                    });
                    console.log(data)
                    res.send(data);
                }
            })
        }
    })
    .catch(error => res.status(404).json({error: error | 'ça marche pas !'}))
}