var Sequelize = require('sequelize');
var sequelize = new Sequelize('groupomania', 'root', '@rDium4856PR', {
host: 'localhost',
dialect: 'mysql',
//logging: false,//passer a true pour voir les différentes requêtes effectuées par l'ORM
});

//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = module.exports = {};
exports.sequelize = sequelize;


const User = sequelize.define('user', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  username: {type: Sequelize.STRING(255), allowNull: false, },
  email: {type: Sequelize.STRING(255), allowNull: false, unique: true},
  admin: {type:Sequelize.BOOLEAN, defaultValue:false }
},
  {tableName: 'user', timestamps: false, underscored: true}
);
exports.User = User;
console.log(User === sequelize.models.User); // true

/* Model synchronisation, à faire ici ?*/
//await User.sync();
//console.log("The table for the User model was just (re)created!");
