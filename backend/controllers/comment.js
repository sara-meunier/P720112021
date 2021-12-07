const Model = require('../models');
const fs = require('fs'); //package file system de node


exports.createComment = async (req, res, next) => {
  try {
    await Model.Comment.create({
      author: req.body.author,
      userId: req.body.userId,
      content: req.body.content,
      publicationId : req.body.publicationId,
    })
    res.status(201).json({ message: 'Le commentaire à été créé' })
  }
  catch(err) { 
    res.status(400).json("probleme avec la creation du commentaire")
    console.log(err);
  };
};

exports.getAllComment = (req, res, next) => {
  Model.Comment.findAll({
    order : [['createdAt', 'DESC']]
  }).then(
    (comments) => {
      res.status(200).json(comments);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
