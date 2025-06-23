# 📝 To-Do List

Une application complète de gestion de tâches développée avec React.js pour le frontend et Node.js/Express pour le backend.

## 🌟 Fonctionnalités

- ✅ Authentification utilisateur (inscription/connexion avec JWT)
- ✅ Gestion des tâches (créer, lire, modifier, supprimer)
- ✅ Interface utilisateur moderne avec Tailwind CSS et DaisyUI
- ✅ Sécurisation des routes avec middleware d'authentification
- ✅ Base de données MongoDB pour la persistance des données
- ✅ Validation des données côté serveur
- ✅ Responsive design - Compatible mobile et desktop

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
to-do-list/
├── backend/
│   ├── app.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoute.js
│   │   ├── taskRoute.js
│   │   └── userRoute.js
│   └── utils/
│       └── verifyToken.js
├── frontend/
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── AuthForm.jsx
│   │   │   ├── Item.jsx
│   │   │   └── TaskModal.jsx
│   │   └── pages/
│   │       ├── Admin.jsx
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       └── Task.jsx
```

## 🚀 Installation et démarrage

### Prérequis

- **Node.js** (version 16 ou supérieure)
- **MongoDB** (local ou MongoDB Atlas)
- **npm** ou **yarn**

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd to-do-list
```

### 2. Configuration du Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` dans le dossier backend :

```env
MONGO_URL=mongodb://localhost:27017/todolist
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
EMAIL_FROM=your_email@gmail.com
EMAIL_PASS=your_email_password
```

Démarrer le serveur backend :

```bash
npm run dev
# ou
node app.js
```

### 3. Configuration du Frontend

```bash
cd ../frontend
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🔗 API Endpoints

### Authentification

| Méthode | Endpoint    | Description                         | Body                          |
| ------- | ----------- | ----------------------------------- | ----------------------------- |
| POST    | `/register` | Inscription d'un nouvel utilisateur | `{username, email, password}` |
| POST    | `/login`    | Connexion utilisateur               | `{email, password}`           |

### Tâches (protégées, nécessite un token JWT)

| Méthode | Endpoint    | Description                 | Headers                         | Body              |
| ------- | ----------- | --------------------------- | ------------------------------- | ----------------- |
| GET     | `/task`     | Récupérer toutes les tâches | `Authorization: Bearer <token>` | -                 |
| POST    | `/task`     | Créer une nouvelle tâche    | `Authorization: Bearer <token>` | `{title}`         |
| PUT     | `/task/:id` | Modifier une tâche          | `Authorization: Bearer <token>` | `{title, status}` |
| DELETE  | `/task/:id` | Supprimer une tâche         | `Authorization: Bearer <token>` | -                 |

## 💾 Modèles de données

### User

```javascript
{
  username: String (requis),
  email: String (requis, unique),
  password: String (requis, haché avec bcrypt),
  role: String (défaut: "user"),
  isVerified: Boolean (défaut: false),
  createdAt: Date,
  updatedAt: Date
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

- Page de connexion et d'inscription
- Dashboard des tâches (ajout, édition, suppression)
- Interface d'administration (gestion des utilisateurs)

## 🔐 Sécurité

- Hachage des mots de passe avec bcrypt
- Authentification JWT pour sécuriser les routes
- Validation des données côté serveur
- Middleware de vérification des tokens

## 📝 Utilisation

1. Inscription : Créez un compte utilisateur.
2. Connexion : Connectez-vous avec vos identifiants.
3. Gestion des tâches : Ajoutez, modifiez, supprimez vos tâches.
4. Déconnexion : Cliquez sur le bouton de déconnexion.

## 🚧 Améliorations possibles

- [ ] Catégorisation des tâches
- [ ] Dates d'échéance et rappels
- [ ] Notifications push
- [ ] Mode sombre/clair
- [ ] Partage de tâches entre utilisateurs
- [ ] Tests unitaires et d'intégration

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez une branche feature
3. Commitez vos changements
4. Pushez la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

---

Développé avec ❤️ en JavaScript
