const mysql = require ('mysql');

// Constructeur
const User = function(user) {
    this.pseudo = user.pseudo,
    this.email = user.email,
    this.photo= user.photo,
    this.password = user.password,
    this.service = user.service,   
    this.isAdmin= 0
};

//Création d'un utilisateur OK
User.create = (newUser, result) => {
    db.query(
        "INSERT INTO groupomania.users SET ?",
        newUser,
        (err, res) => {
            if (err) {
                console.log(' non créé' + err);
                result(err, null);
                return;
            }
            console.log('créé');
            result(null, {id: res.id, ...newUser});
        }
    );
};

//Supprimer un utilisateur (user ou admin) OK
User.deleteOne = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM groupomania.users WHERE id=${userId}`,
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

//Trouver un user par son id (rôle admmin) OK
User.findById = (userId) => {
    return new Promise((resolve, reject)=> {
        db.query(
            `SELECT * FROM groupomania.users WHERE id=${userId}`,
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

//Trouver un utilisateur (login) OK
User.findOne = (email, result) => {
    db.query(
        "SELECT * FROM groupomania.users WHERE email=?",
        email, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res[0]);
    });
};

//Trouver tous les utilisateurs (admin) OK
User.findAll = (result) => {
    db.query('SELECT * FROM groupomania.users', (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    });
};

//Mettre a jour les données d'un utilisateur
User.updateOne = (userId, user) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE groupomania.users SET pseudo="${user.pseudo}", email="${user.email}", photo="${user.photo}", service="${user.service}", isAdmin="${user.isAdmin}" WHERE id=${userId}`,
            function (error, result) {
                if (error) {
                    reject (error);
                    console.log("raté: " + error);
                } else {
                    resolve (result);
                    console.log("Utilisateur " + {id: userId } + " modifié avec succès !");
                }
            }
        )
    })
};

module.exports = User;