const Model = require('../models');
const fs = require('fs'); //package file system de node



exports.createPublication = async (req, res, next) => {
  try {
    await Model.Publication.create({
      author: req.body.author,
      title: req.body.title, 
      content: req.body.content,
      userId: req.body.userId,
    })
    res.status(201).json({ message: 'L\'utilisateur à été créé' })
  }
  catch(err) { res.status(400).json("probleme avec la creation du post")
  console.log(err);};
};

exports.getAllPublication = (req, res, next) => {
  Model.Publication.findAll({
    order : [['createdAt', 'DESC']]
  }).then(
    (publications) => {
      res.status(200).json(publications);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deletePublication = async (req, res, next) => {
  try {
    const publication = await Model.Publication.findOne({ where: {id : req.params.id} 
    });
    if (publication !== null){ 
      console.log(publication.id)
      //on supprime d'abord les commentaires de la publication si il y en a

      const commentaire = await Model.Comment.findOne({where: {publicationId : publication.id}})

      if (commentaire !== null) {
        Model.Comment.destroy({ where: { publicationId :publication.id}})
        .then(() => res.status(200).json({ message: 'commentaires de la publication supprimés !'}))
      } else {
        console.log("pas de commentaire à supprimer")
      };
      
      //on supprime la publication
      await Model.Publication.destroy({where: { id :req.params.id }})
      .then(() => res.status(200).json({ message: 'publication supprimée !'}))
      
      .catch(error => res.status(400).json({message: "Une erreur est survenue lors de la mise à jour de la base de donnée"},{error }))
    }
    else {res.status(502).json({ error })}
  }
  catch (err) {
    console.log(err);
    res.status(500).json('Une erreur est survenue')
  }
};

exports.getOnePublication = (req, res, next) => {
    Model.Publication.findOne ({ where: {id: req.params.id} })
    .then(
      (publication) => {
        res.status(200).json(publication);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

exports.modifyPublication = async (req, res, next) => {
  try { 
    let newContent = (req.body.content);
    await Model.Publication.findOne ({ where: {id: req.params.id} })
    .then ( () => 
      Model.Publication.update(
        { content: newContent,},
        { where: { id: req.params.id } }
      ))
      .then(() => res.status(200).json({ message: 'Publication modifiée !'}))
      .catch(error => res.status(400).json({ error }));
    }
  catch(err) { 
    res.status(401).json("probleme avec la modification de la publication")
    console.log(err);
  };   
};

/*exports.likePublication = (req, res, next) => {
}*/

