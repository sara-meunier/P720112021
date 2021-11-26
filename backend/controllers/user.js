const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//var Sequelize = require('sequelize');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)//on "sale" le mot de passe 10 fois
    .then(hash => {
      User.create({ // la methode .create = build + save
        username: req.body.username,
        email: req.body.email,
        password: hash,
        role: req.body.role        
      })
      .then(() => { res.status(201).json({ message: 'Utilisateur créé !' });
                    console.log(user instanceof user)}) // true)
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error : 'probleme avec la creation du user'}));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//exports.profil= 