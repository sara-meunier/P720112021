var Sequelize = require('sequelize');
var sequelize = new Sequelize('groupomania', 'root', '@rDium4856PR', {
host: 'localhost',
dialect: 'mysql',
//logging: false,//passer a true pour voir les différentes requêtes effectuées par l'ORM
});

//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = module.exports = {};
exports.sequelize = sequelize;


const Publication = sequelize.define('publication', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  author: {type: Sequelize.STRING(255), allowNull: false, },
  title: {type: Sequelize.STRING(255), allowNull: false, unique: true},
  text: {type: Sequelize.STRING(255), allowNull: false, unique: true}
 },
  {tableName: 'publication', timestamps: false, underscored: true}
);
exports.Publication = Publication;
console.log(Publication === sequelize.models.Publication); // true
