const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/user');
const publicationRoutes = require ('./routes/publication');


const app = express();
const path = require('path'); //chemin de notre systeme de fichier



//on teste la connexion à la base de données

var Sequelize = require('sequelize');
var sequelize = new Sequelize('groupomania',process.env.mySQL_user,process.env.mySQL_password, {
host: 'localhost',
dialect: 'mysql',
//logging: false,//passer a true pour voir les différentes requêtes effectuées par l'ORM
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  //------------ Eviter les problemes de CORS  
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*'); //on peut acceder à notre API depuis nimporte quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // on peut acceder ces header aux requetes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // on peut envoyer des requetes avec ces methodes
    next();
  });

app.use(express.json());


//----------- utilisation routes

app.use('/images', express.static(path.join(__dirname, 'images'))); //indique a express qu'il faut gérer la ressource image de façon statique
app.use('/api/auth', userRoutes);
app.use('/api/publication', publicationRoutes);
app.use('/api/user', userRoutes);
  

//export de l'app
module.exports = app;