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
      })
      res.status(201).json({ message: 'L\'utilisateur à été créé' })
    }
    else {
      res.status(400).json({ message: 'Cet email est déjà utilisé' })    
    }
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong')
  }
};

exports.login = (req, res, next) => {
  Model.User.findOne({ where: {email: req.body.email} })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(402).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            admin : user.admin,
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

exports.deleteUser = async (req, res, next) => {
  try {
    console.log(" user Id is: " + req.params.id);
    const utilisateur = await Model.User.findOne( { where: {id : req.params.id}});
    if (utilisateur !== null){
      //on commence par supprimer les publications de l'utilisateur
      const publication = await Model.Publication.findOne({where: {authorId : utilisateur.id}})
      if (publication !== null){
        Model.Publication.destroy({ where: { authorId :req.params.id}})
        .then(() => res.status(200).json({ message: 'publications de l\'utilisateur supprimés !'}))
        .catch(error => res.status(501).json({message: "erreur lors de la supression des publications "},{error }))
      } else {
        console.log("pas de publication à supprimer")
      };

      //on supprimer l'utilisateur
      await Model.User.destroy({
        where: { id :req.params.id }
      })
      .then(() => res.status(200).json({ message: 'utilisateur supprimé !'}))
      
      .catch(error => res.status(400).json({message: "erreur"},{error }))
    }
    else {res.status(502).json({ error })}
  }
  catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong')
  }
};