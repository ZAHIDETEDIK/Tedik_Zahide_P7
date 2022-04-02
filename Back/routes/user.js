const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const validatePassword = require('../middlewares/validate-password');
const userCtrl = require('../controllers/user');

// Création d'un utilisateur OK
    router.post('/register/', validatePassword, userCtrl.register);

// Connection d'un utilisateur enregistré 
    router.post('/login/', userCtrl.login);

// Connection de l'utilisateur en cours de login pour vérifier la validité du token et récupérer ses données
    router.get('/me', auth, userCtrl.getMyDatas);

// Déconnection de l'utilisateur
    router.post('/logout', auth, userCtrl.logout)

// Trouver Un utilisateur par son id 
    router.get('/user/:id', auth, userCtrl.getOneUserById);

// Retrouver tous les utilisateurs 
    router.get('/users/', auth, userCtrl.getAllUsers);

// Modifier les données utilisateur
    router.put('/user/update/:userId', auth, userCtrl.updateUser);

// Effacer un utilisateur 
    router.delete('/user/delete/:userId', auth, userCtrl.deleteUser);

module.exports = router;