const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//var Sequelize = require('sequelize');

/*exports.signup = (req, res, next) => {

  console.log("le serveur recoit :" + req.body.name);
  bcrypt.hash(req.body.password, 10)//on "sale" le mot de passe 10 fois

  .then(hash => {
    const newUser = {
      name: req.body.name,
      role: req.body.role, 
      password: hash,
      email: req.body.email };

    (async () => {
      await sequelize.sync();
      const utilisateur = await User.create(newUser);
      console.log(utilisateur.toJSON())
    })
    
 
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error : 'probleme avec la creation du user'}));
};
*/


exports.signup = async (req, res) => {
  try {
      //const userObject = req.body;
      const hash = await bcrypt.hash(userObject.password, 8);
      const newUser = {
        name: req.body.name,
        role: req.body.role, 
        password: hash,
        email: req.body.email };

      await User.create({newUser
      })
      res.status(201).json({ message: 'L\'utilisateur à été créé' })
  } catch (err) {
      res.status(500).json('Something went wrong')
  }
}

 /* bcrypt.hash(req.body.password, 10)//on "sale" le mot de passe 10 fois
    */
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