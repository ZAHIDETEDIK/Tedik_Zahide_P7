const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require ('dotenv').config

const User = require('../models/user');

// Création d'un nouvel utilisateur 
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 5)
    .then(hash => {
        const user = new User({
            username: req.body.username,
            email:req.body.email,
            password:hash,
            isAdmin: 0
        })
        user.save()// on utilise la méthode save sur notre user pour l'enregistrer dans la bdd
        .then(() => res.status(201).json({ message: 'Utilisateur crée' }))
        .catch(error => res.status(400).json({ message: 'il y à une erreur' }));
    
    })
    .catch(error => res.status(500).json( error + ' une erreur est survenue' ));
};

// Connection d'un utilisateur existant 

exports.login = (req, res) => {
    User.findOne(req.body.email, (err, data) => {

        if(!data){
            console.log('user pas trouvé')
            return res.status(401).json({error: 'utilisateur non trouvé'});
        }
        bcrypt.compare(req.body.password, data.password)
        .then(isValid => {
            if(!isValid){
                return res.status(401).json({error: 'mot de passe incorrect'});
            };
            const payload = {
                id: data.id,
                pseudo: data.pseudo,
                isAdmin: data.isAdmin,
                username:data.username,
                image:data.image,
            }
            res.status(200).json({
                ...payload,
                token: jwt.sign(
                payload,
            )
            })
        })
        .catch(error => res.status(500).json( error, 'salut les gars' ));
    });
};

// Vérification de token au login
exports.getMyDatas = (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    let decodedToken = jwt.verify(token);
    let id = JSON.parse(decodedToken.id);
    User.findById(id)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));

}

// Déconnection de l'utilisateur
exports.logout = (req, res) => {
    console.log(req.body);
    res.status(200).json({
        message: 'ok'
    });
}

// Modifications des données utilisateur
exports.updateUser = (req, res) => {
    let user = (req.body);
    let userId = req.params.userId;
    console.log(userId + " " + user);
    User.updateOne(userId, user)
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
    .catch(error => res.status(404).json({ error }));
}

// Trouver Un utilisateur par son id OK
exports.getOneUserById = (req, res) => {
    User.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};

// Trouver tous les utilisateurs (rôle admin) 
exports.getAllUsers = (req, res) => {
    User.findAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "des erreurs se sont produites",
            });
            console.log("Pas d'utilisateur !")
        }
        console.log('On a tout le monde');
        res.send(data);
    });
};


// Suppression d'un utilisateur (rôle admin) OK
exports.deleteUser = (req, res) => {
    User.deleteOne(req.params.userId)
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(404).json ({ error }));
}