# 🎨 GUIDE COMPLET : FRONTEND REACT

## 📋 Résumé

Vous avez reçu une application React **complète et fonctionnelle** avec :

```
✅ Authentification JWT
✅ Pages listing (contrats, deadlines, alertes)
✅ Client API intégré (axios)
✅ Gestion d'état (Zustand)
✅ Design professionnel (TailwindCSS)
✅ Routage (React Router)
```

---

## 📁 Structure du projet

```
frontend/
├── src/
│   ├── components/
│   │   ├── LoginForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── ContractList.jsx
│   │   ├── DeadlinesList.jsx
│   │   └── AlertsList.jsx
│   │
│   ├── api/
│   │   └── client.js              ← Client API
│   │
│   ├── store/
│   │   └── authStore.js           ← Gestion authentification
│   │
│   ├── App.jsx                    ← Routage principal
│   ├── main.jsx                   ← Point d'entrée
│   └── index.css                  ← Styles TailwindCSS
│
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🚀 DÉMARRAGE RAPIDE (5 minutes)

### Étape 1 : Créer le dossier frontend

```bash
cd C:\projets\abk-kandadji
mkdir frontend
cd frontend
```

### Étape 2 : Copier les fichiers

Téléchargez depuis les outputs et placez les fichiers :

**Fichiers de configuration :**
- `frontend-package.json` → `package.json`
- `frontend-vite.config.js` → `vite.config.js`
- `frontend-tailwind.config.js` → `tailwind.config.js`
- `frontend-postcss.config.js` → `postcss.config.js`
- `frontend-index.html` → `index.html`

**Fichiers source (créer dossiers src/) :**
```
src/
├── api/
│   └── client.js
├── store/
│   └── authStore.js
├── components/
│   ├── LoginForm.jsx
│   ├── Navbar.jsx
│   ├── ContractList.jsx
│   ├── DeadlinesList.jsx
│   └── AlertsList.jsx
├── App.jsx
├── main.jsx
└── index.css
```

### Étape 3 : Installer les dépendances

```bash
npm install
```

### Étape 4 : Démarrer le serveur de développement

```bash
npm run dev
```

Vous devriez voir :
```
VITE v5.0.0  ready in 123 ms

➜  Local:   http://localhost:3001/
```

### Étape 5 : Ouvrir le navigateur

Allez à : **http://localhost:3001**

Vous devriez voir la **page de login** ! ✅

---

## 🔐 SE CONNECTER

**Utilisateur de test :**
- Email: `dg@abk.ne`
- Mot de passe: `password`

Après login, vous verrez le **dashboard** avec :
- Navigation vers Contrats, Échéances, Alertes
- Cartes de statistiques
- Listes de données

---

## 📊 Pages disponibles

| Page | URL | Contenu |
|------|-----|---------|
| Login | `/login` | Formulaire authentification |
| Dashboard | `/` | Statistiques et overview |
| Contrats | `/contracts` | Tableau des contrats |
| Échéances | `/deadlines` | Tableau des échéances |
| Alertes | `/alerts` | Tableau des alertes |

---

## 🔄 Comment ça fonctionne ?

### 1. Authentification

Quand vous cliquez "Se connecter" :

```
1. LoginForm envoie email + password
2. authAPI.login() appelle POST /api/auth/login
3. Token reçu et sauvegardé en localStorage
4. useAuthStore met à jour l'état
5. Redirection vers /
```

### 2. Requêtes API

Tous les appels API passent par le **client.js** :

```javascript
// Exemple : Récupérer les contrats
const response = await contractsAPI.getAll();

// Internement :
// - Récupère le token de localStorage
// - Ajoute Authorization header
// - Appelle GET /api/contracts
// - Retourne la réponse
```

### 3. Gestion d'état

**Zustand** gère l'authentification :

```javascript
// Accès depuis n'importe quel composant
const { user, logout } = useAuthStore();
```

---

## 📝 Exemples de code

### Ajouter une nouvelle page

Créer `src/pages/MyPage.jsx` :

```javascript
export default function MyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Ma Page</h1>
    </div>
  );
}
```

Ajouter la route dans `App.jsx` :

```javascript
<Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
```

### Appeler l'API

```javascript
import { contractsAPI } from '../api/client';

const [contracts, setContracts] = useState([]);

useEffect(() => {
  contractsAPI.getAll()
    .then(res => setContracts(res.data.data.contracts))
    .catch(err => console.error(err));
}, []);
```

### Utiliser TailwindCSS

```jsx
<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
  Cliquer
</button>
```

---

## 🚨 Dépannage

### "Cannot GET /login"

Vérifiez que vous êtes sur `http://localhost:3001` (pas 3000)

### "API call failed"

1. Vérifiez que le serveur backend est en cours d'exécution (`npm run dev` sur le port 3000)
2. Vérifiez les logs dans la console du navigateur (F12)

### Token expiré

Le token dure 24h. Après : vous serez redirigé vers `/login`

---

## 🎨 Personnaliser le design

**Ajouter une couleur personnalisée :**

Éditez `tailwind.config.js` :

```javascript
theme: {
  extend: {
    colors: {
      'abk-blue': '#003d82',
    }
  },
}
```

Utilisez : `<div className="bg-abk-blue">...</div>`

---

## 📦 Construire pour production

```bash
npm run build
```

Cela génère un dossier `dist/` avec l'app minifiée prête à déployer.

---

## ✅ CHECKLIST DE DÉMARRAGE

- [ ] Fichiers copiés dans `frontend/`
- [ ] `npm install` exécuté
- [ ] `npm run dev` lancé
- [ ] http://localhost:3001 accessible
- [ ] Page login affichée
- [ ] Login avec dg@abk.ne / password fonctionne
- [ ] Dashboard visible
- [ ] Liens de navigation cliquables

---

## 🚀 PROCHAINES ÉTAPES

1. ✅ Frontend lancé et fonctionne
2. 📝 Ajouter formulaires CRUD (créer, modifier, supprimer)
3. 📊 Ajouter dashboards avec graphiques
4. 📧 Intégrer vraies alertes par email
5. 🧪 Ajouter tests unitaires

---

**Le frontend React est prêt à l'emploi ! 🎉**

Lancez `npm run dev` et testez ! 🚀
