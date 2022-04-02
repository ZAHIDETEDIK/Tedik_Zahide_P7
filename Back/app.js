const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');



const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/likes');


const app = express();
require('dotenv').config();
const mysql = require("mysql");
const { connect } = require('http2');
const db = mysql.createConnection({ 
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
});
db.connect(error => {
    if (error) throw error;
    console.log('Connexion à la base de données réussie !')
});
module.exports=connect;

app.use(helmet());
app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin', '*'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/auth', articleRoutes);
app.use('/api/auth', commentRoutes);
app.use('/api/auth', likeRoutes);

module.exports = app;