const Model = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
  try {
      const userObject = req.body;
      const hash = await bcrypt.hash(userObject.password, 10);

      const doublon = await Model.User.findOne({ //on verifie que l'adresse mail est unique
        where: { email: req.body.email }
      });
      if (doublon === null){ console.log("pas de doublon")
      await Model.User.create({
        name: req.body.name,
        role: req.body.role, 
        password: hash,
        email: req.body.email,
        admin: false,
      })}
      
      else {
        console.log( doublon instanceof Model.User);
        console.log(doublon.email);
        console.log("L'adresse mail est déjà utilisée");}
      
      res.status(201).json({ message: 'L\'utilisateur à été créé' })
  } catch (err) {
    console.log(err);
      res.status(500).json('Something went wrong')
  }
}





exports.login = (req, res, next) => {
  Model.User.findOne({ where: {email: req.body.email} })
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