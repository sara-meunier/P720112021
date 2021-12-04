const Publication = require('../models/publication');
const fs = require('fs'); //package file system de node
//changement

/*
exports.createPublication = (req, res, next) => {
  const publicationObject = JSON.parse(req.body.publication);
  const publication = new Publication({
    ...publicationObject,
    //recuperer le userid dans le store
    //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersdisLiked: [],
  });
  publication.save()
    .then(() => res.status(201).json({ message: 'Publication enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllPublication = (req, res, next) => {
    Publication.find().then(
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

exports.deletePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
      .then(thing => {
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Publication.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};

exports.getOnePublication = (req, res, next) => {
    Publication.findOne({
      _id: req.params.id
    }).then(
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

exports.modifyPublication = (req, res, next) => {
    const publicationObject = req.file ? //si il y a une nouvelle image
      {
        ...JSON.parse(req.body.publication),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body }; //sinon on traite l'objet entrant

      Publication.updateOne({ _id: req.params.id }, { ...publicationObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.likePublication = (req, res, next) => {
  const userId = req.body.userId;

  Publication.findOne({_id: req.params.id})
  .then((publication) => { 

    let likesPublication = publication.likes;
    let usersLiked = publication.usersLiked;
    let indexLiked = usersLiked.indexOf(userId);

    let dislikesPublication = publication.dislikes;
    let usersDisliked = publication.usersDisliked;
    let indexDisliked = usersDisliked.indexOf(userId);

    switch (req.body.like) {
      case 1 : 
      if (indexLiked != -1) {
        console.log("id de  la deja dans le tableau des likes");
      }
      else {
        likesPublication ++; //on ajoute un like
        usersLiked.push(userId); //on ajoute l'id de l'utilisateur dans le tableau
          
        Publication.updateOne({ _id: req.params.id }, {likes : likesPublication, usersLiked : usersLiked}) //update de la base de donnée
        .then (() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
      }     
      break;
  
      case 0:
        if (indexLiked != -1) {//l'utilisateur a deja aimé la sauce
          likesPublication --;// on annule le like
          usersLiked.splice(indexLiked,1); //on retire l'utilisateur du tableau like
  
          Publication.updateOne({ _id: req.params.id }, {likes : likesPublication, usersLiked : usersLiked}) //update de la base de données
          .then (() => res.status(200).json({ message: 'Like de l utilisateur retiré'}))
          .catch(error => res.status(400).json({ error }));
        }
        else{
          if (indexDisliked != -1){//l'utilisateur a deja disliké la sauce
            dislikesPublication --; //on annule le dislike
            usersDisliked.splice(indexDisliked,1); //on retire l'utilisateur du tableau de dislike
    
            Publication.updateOne({ _id: req.params.id }, {dislikes : dislikesPublication, usersDisliked : usersDisliked}) //update de la base de données
            .then (() => res.status(200).json({ message: 'Dislike de l utilisateur retiré'}))
            .catch(error => res.status(400).json({ error }));          
          }
          else {
            res.status(400).json({ error })
          }
        };
      break;
  
      case -1 :
        if (indexDisliked != -1) {
          console.log("id deja dans le tableau des dislikes");
        }
        else {
          dislikesPublication ++; //on ajoute un dislike
          usersDisliked.push(userId); //on ajoute l'id de l'utilisateur dans le tableau de dislike

          Publication.updateOne({ _id: req.params.id }, {dislikes : dislikesSauce, usersDisliked : usersDisliked}) //update de la base de donnée
          .then (() => res.status(200).json({ message: 'Sauce modifiée !'}))
          .catch(error => res.status(400).json({ error }));
        };
      break;
  
      default :  
        res.status(200).json({message :"like pris en compte"});
      break;
    };  
  });
}

