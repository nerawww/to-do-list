# 📝 To-Do List

Une application complète de gestion de tâches développée avec React.js pour le frontend et Node.js/Express pour le backend.

## 🌟 Fonctionnalités

- ✅ **Authentification utilisateur** (inscription/connexion avec JWT)
- ✅ **Gestion des tâches** (créer, lire, modifier, supprimer)
- ✅ **Interface utilisateur moderne** avec Tailwind CSS et DaisyUI
- ✅ **Sécurisation des routes** avec middleware d'authentification
- ✅ **Base de données MongoDB** pour la persistance des données
- ✅ **Validation des données** côté serveur
- ✅ **Responsive design** - Compatible mobile et desktop

## 🛠️ Technologies utilisées

### Frontend

- **React 19** - Framework JavaScript
- **Vite** - Outil de build rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **DaisyUI** - Composants UI pour Tailwind
- **React Router Dom** - Navigation côté client
- **React Icons** - Icônes pour l'interface
- **JWT Decode** - Décodage des tokens JWT

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** avec **Mongoose** - Base de données et ODM
- **JWT** - Authentification par tokens
- **Bcrypt** - Hachage des mots de passe
- **CORS** - Gestion des requêtes cross-origin
- **Dotenv** - Variables d'environnement

## 📁 Structure du projet

```
09_to-do-list/
├── package.json
├── README.md
├── backend/
│   ├── .env
│   ├── app.js
│   ├── package.json
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── taskRoute.js
│   │   └── userRoute.js
│   └── utils/
│       └── verifyToken.js
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   ├── App.css
    │   ├── components/
    │   │   ├── Item.jsx
    │   │   └── TaskModal.jsx
    │   └── pages/
    │       ├── AccountActivated.jsx
    │       ├── Login.jsx
    │       ├── Register.jsx
    │       └── Task.jsx
    └── public/
```

## 🚀 Installation et démarrage

### Prérequis

- **Node.js** (version 16 ou supérieure)
- **MongoDB** (local ou MongoDB Atlas)
- **npm** ou **yarn**

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd 09_to-do-list
```

### 2. Configuration du Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` dans le dossier backend :

```env
MONGO_URL=mongodb://localhost:27017/todolist
# ou pour MongoDB Atlas:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/todolist

PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
```

Démarrer le serveur backend :

```bash
# Mode développement
npm run dev

# ou mode production
node app.js
```

Le serveur sera accessible sur `http://localhost:5000`

### 3. Configuration du Frontend

```bash
cd ../frontend
npm install
```

Démarrer l'application frontend :

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🔗 API Endpoints

### Authentification

| Méthode | Endpoint | Description | Body |
|---------|----------|-------------|------|
| `POST` | `/register` | Inscription d'un nouvel utilisateur | `{username, email, password}` |
| `POST` | `/login` | Connexion utilisateur | `{email, password}` |

### Tâches (routes protégées - nécessitent un token JWT)

| Méthode | Endpoint | Description | Headers | Body |
|---------|----------|-------------|---------|------|
| `GET` | `/task` | Récupérer toutes les tâches de l'utilisateur | `Authorization: Bearer <token>` | - |
| `POST` | `/task` | Créer une nouvelle tâche | `Authorization: Bearer <token>` | `{title}` |
| `PUT` | `/task/:id` | Modifier une tâche | `Authorization: Bearer <token>` | `{title, status}` |
| `DELETE` | `/task/:id` | Supprimer une tâche | `Authorization: Bearer <token>` | - |

## 💾 Modèles de données

### User

```javascript
{
  username: String (requis),
  email: String (requis, unique),
  password: String (requis, haché avec bcrypt),
  role: String (défaut: "user"),
  isVerified: Boolean (défaut: false),
  createdAt: Date (auto-généré),
  updatedAt: Date (auto-généré)
}
```

### Task

```javascript
{
  title: String (requis),
  status: Boolean (défaut: false),
  userId: ObjectId (référence vers User, requis)
}
```

## 🎨 Interface utilisateur

L'application utilise DaisyUI pour un design moderne et responsive :

- **Page de connexion** - Formulaire d'authentification avec redirection automatique
- **Page d'inscription** - Création de compte utilisateur avec validation
- **Dashboard des tâches** - Gestion complète des tâches avec interface intuitive
- **Modal d'ajout** - Interface modale pour créer de nouvelles tâches
- **Composants réutilisables** - Architecture modulaire pour faciliter la maintenance

## 🔐 Sécurité

- **Hachage des mots de passe** avec bcrypt (salt rounds: 10)
- **Authentification JWT** pour sécuriser les routes protégées
- **Validation des données** côté serveur avec vérifications strictes
- **Middleware de vérification** des tokens avec gestion d'erreurs
- **Protection CORS** configurée pour les requêtes cross-origin
- **Vérification d'unicité** des emails et titres de tâches

## 📝 Utilisation

1. **Inscription** : 
   - Créer un compte avec nom d'utilisateur, email et mot de passe
   - Validation automatique des champs requis

2. **Connexion** : 
   - Se connecter avec email et mot de passe
   - Redirection automatique vers le dashboard

3. **Gestion des tâches** :
   - Cliquer sur le bouton "+" vert pour ajouter une tâche
   - Utiliser l'icône crayon (bleu) pour modifier une tâche
   - Utiliser l'icône poubelle (rouge) pour supprimer une tâche
   - Les tâches sont automatiquement sauvegardées

## 🚧 Améliorations possibles

### Fonctionnalités prioritaires

- [ ] **Implémentation complète de la fonction d'édition** des tâches
- [ ] **Activation du statut des tâches** (complété/non complété) avec mise à jour
- [ ] **Gestion des erreurs** côté frontend avec notifications

### Fonctionnalités avancées

- [ ] **Catégorisation des tâches** avec couleurs
- [ ] **Dates d'échéance** et rappels
- [ ] **Notifications push** pour les tâches importantes
- [ ] **Mode sombre/clair** avec préférence utilisateur
- [ ] **Recherche et filtres** avancés
- [ ] **Partage de tâches** entre utilisateurs
- [ ] **Drag & Drop** pour réorganiser les tâches
- [ ] **Statistiques** et tableaux de bord
- [ ] **Export/Import** des données
- [ ] **Application mobile** avec React Native

### Améliorations techniques

- [ ] **Tests unitaires** avec Jest
- [ ] **Tests d'intégration** pour l'API
- [ ] **Documentation API** avec Swagger
- [ ] **Déploiement automatisé** avec CI/CD
- [ ] **Monitoring** et logs
- [ ] **Cache Redis** pour les performances

## 🐛 Dépannage

### Problèmes courants

**Erreur de connexion MongoDB :**

```bash
# Vérifier que MongoDB est démarré
mongod --version

# Pour MongoDB local
brew services start mongodb-community
# ou
sudo systemctl start mongod
```

**Erreur CORS :**
- Vérifier que le backend tourne sur le port 5000
- S'assurer que les URLs correspondent dans le frontend

**Token invalide :**
- Vider le localStorage du navigateur
- Se reconnecter

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. Créer une **branche feature** (`git checkout -b feature/AmazingFeature`)
3. **Commiter** les changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une **Pull Request**

### Guidelines de contribution

- Suivre les conventions de nommage existantes
- Ajouter des commentaires explicatifs
- Tester les nouvelles fonctionnalités
- Mettre à jour la documentation si nécessaire

## 📞 Support

Pour toute question ou problème :
- Ouvrir une [issue](../../issues) sur GitHub
- Consulter la documentation des technologies utilisées
- Vérifier les logs dans la console du navigateur et du serveur

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Développé avec ❤️ en JavaScript**
