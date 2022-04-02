const mysql = require('mysql');

// Constructeur
const LikeDislike = function(likeDislike) {
    this.likes = likeDislike.likes,
    this.dislikes = likeDislike.dislikes,
    this.users_id = likeDislike.userId,
    this.articles_id = likeDislike.articleId
};

// Like un article
LikeDislike.like = (newLike, result) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO groupomania.likes SET ?", newLike,
            (err, res) => {
                if (err) {
                    console.log("error: " +err);
                    result(err, null);
                    return;
                }
                console.log("Like créé " + {id: res.id, ...newLike });
                result(null, {id: res.id, ...newLike});
            }
        )
    })
};

// Dislike un article
LikeDislike.dislike = (newLike, result) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO groupomania.likes SET ?", newLike,
            (err, res) => {
                if (err) {
                    console.log("error: " +err);
                    result(err, null);
                    return;
                }
                console.log("Dislike créé " + {id: res.id, ...newLike });
                result(null, {id: res.id, ...newLike});
            }
        )
    })
};

// Annuler un Like/Dislike article
LikeDislike.cancelLikeDislike = (articleId, userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM groupomania.likes WHERE articles_id=${articleId} AND users_id=${userId}`,
            function (error, result) {
                if (error) {
                    reject (error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

// Trouver les avis d'un article
LikeDislike.findByArticleId = (articleId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM groupomania.likes WHERE articles_id=${articleId}`,
            function (error, result, fields) {
                if (error) {
                    reject (error);
                } else {
                    resolve (result);
                }
            }
        )
    })
};

module.exports = LikeDislike;