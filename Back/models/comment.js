const mysql = require('mysql');

// Constructeur
const Comment = function(comment) {
    this.body = comment.body,
    this.users_id = comment.users_id,
    this.articles_id = comment.articles_id
};


// Création d'un commentaire OK
Comment.create = (newComment, result) => {
    db.query(
        "INSERT INTO groupomania.comments SET ?",
        newComment,
        (err, res) => {
            if (err) {
                console.log("error: " +err);
                result(err, null);
                return;
            }
            console.log("Commentaire créé " + {id: res.id, ...newComment });
            result(null, {id: res.id, ...newComment});
        }
    );
};

// Chercher tous les commentaires d'un article OK
Comment.findAll = (articleId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM groupomania.comments WHERE articles_id=${articleId}`, 
            function (error, result) {
                if (error) { 
                    reject (error);
                } else {
                    resolve (result);
                }
            }
        )
    })
};

// Modifier un commentaire OK
Comment.updateOne = (commentId, body) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE groupomania.comments SET body=${body} WHERE id=${commentId}`, 
            function (error, result) {
                if (error) { 
                    reject (error);
                    console.log(error + "y'a une nouille dans le potage !")
                } else {
                    resolve (result);
                    console.log('commentaire modifié !')
                }
            }
        )
    })
};

// Effacer un commentaire avec son id OK
Comment.deleteOneComment = (commentId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM groupomania.comments WHERE id=${commentId}`,
             function (error, result) {
                if (error) {
                    reject(error);
                    console.log(error + ' pas effacé');
                } else {
                resolve (result);
                console.log("utilisateur supprimé !");
                }
            }
        )
    })
};

// Trouver un article par son Id OK
Comment.findById = (commentId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM groupomania.comments WHERE id=${commentId}`, 
            function (error, result) {
                if (error) { 
                    reject (error);
                } else {
                    resolve (result);
                }
            }
        )
    })
};

module.exports = Comment;