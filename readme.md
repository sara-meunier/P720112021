# Réseau social Groupomania

Description

### Prérequis

- node.js
- mysql installé

### Installation

Installer les dépendances du backend et frontend:

```
cd backend/
npm install
cd ..
cd groupomania_app/
npm install
```

Mettre en place la base de données:

- Créer la base de données groupomania
- Mettre à jour le fichier /backend/config/config.json
- Lancer les migrations:

```
cd backend/
npx sequelize-cli db:migrate
```

### Démarrer le projet

Démarrer le serveur

```
cd backend/
npm run start
```

Démarrer l'application

```
cd groupomania_app/
npm run serve
```

L'application sera accessible depuis http://localhost:8080/