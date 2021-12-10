const Model = require('../models');
const fs = require('fs'); //package file system de node



exports.createPublication = async (req, res, next) => {
  
  try {
    
    let url = null;
    console.log(req.body);
    console.log(req.file);    
    if (req.file == undefined) {
      url = null;
    } else {  url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`};
    console.log("l'url de l'image est : " + url);
    await Model.Publication.create({
      author: req.body.author,
      authorId: req.body.authorId,
      title: req.body.title, 
      content: req.body.content,
      imageUrl: url,
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
    const filename = publication.imageUrl.split('/images/')[1];
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
      
      //on supprime l'image du backend
      fs.unlink(`images/${filename}`, (err) => {
        if (err) {
            console.log("failed to delete local image:"+err);
        } else {
            console.log('successfully deleted local image');                                
        }
      });
      //on supprime la publication
      {
      await Model.Publication.destroy({where: { id :req.params.id }})
      .then(() => res.status(200).json({ message: 'publication supprimée !'}))
      .catch(error => res.status(400).json({message: "Une erreur est survenue lors de la mise à jour de la base de donnée"},{error }))
      }
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
    let publicationId = (req.params.id);
    await Model.Publication.findOne ({ where: {id: req.params.id} })
    .then ( async () => {
    //si l'utilisateur a modifié l'image
      if (req.file !== undefined) {
        console.log("il y a une image");
        //on enregistre la nouvelle image
        const newUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const old = await Model.Publication.findOne ({ where: {id: publicationId} });
        const oldUrl = old.imageUrl;
        const oldFilename = oldUrl.split('/images/')[1];
        fs.unlink(`images/${oldFilename}`, (err) => {
          if (err) {
              console.log("failed to delete local image:"+err);
          } else {
              console.log('successfully deleted local image');                                
          }
        });

        Model.Publication.update(
          { content: req.body.content,
          imageUrl : newUrl},
          { where: { id: req.params.id } })
        //.then(() => res.status(201).json({ message: 'nouvelle image enregistrée'}))
        //.catch(error => res.status(401).json({ error }));

      //si l'utilisateur n'a pas modifié l'image
      } 
      
      else {console.log("il n'y a pas d'image");
        Model.Publication.update(
          { content: newContent},
          { where: { id: publicationId }}
        )
        .then(() => res.status(202).json({ message: 'nouveau texte sans image enregistrée'}))
        .catch(error => res.status(402).json({ error }));
    }
    })
    .then(() => res.status(203).json({ message: 'Publication modifiée !'}))
    .catch(error => res.status(403).json({ error }),
    console.log(error));
    }
  catch(err) { 
    res.status(400).json("probleme avec la modification de la publication")
    console.log(err);
  };   
};

/*
exports.modifyPublication = async (req, res, next) => {
  try { 
    let newContent = (req.body.content);
    let publicationId = (req.params.id);
    await Model.Publication.findOne ({ where: {id: req.params.id} })
    .then ( () => {
    //si l'utilisateur a modifié l'image
      if (req.file !== undefined) {
        console.log("il y a une image");
        //on enregistre la nouvelle image
        const newUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        Model.Publication.update(
          { content: req.body.content,
          imageUrl : newUrl},
          { where: { id: req.params.id } })

      //si l'utilisateur n'a pas modifié l'image
      } else {console.log("il n'y a pas d'image");
        Model.Publication.update(
          { content: newContent},
          { where: { id: publicationId } }
      )}
    })
    .then(() => res.status(200).json({ message: 'Publication modifiée !'}))
    .catch(error => res.status(400).json({ error }),
    console.log(error));
    }
  catch(err) { 
    res.status(401).json("probleme avec la modification de la publication")
    console.log(err);
  };   
};
*/

/*exports.likePublication = (req, res, next) => {
}*/

