# Carbone

**Carbone** est une plateforme événementielle conçue pour favoriser les connexions entre participant·es, en s’inspirant du carbone, l’élément chimique capable de former le plus de liaisons.

## 🌐 Architecture

Le système repose sur deux interfaces distinctes :

- [`admin.carbone.com`](http://admin.carbone.com) – Interface d’administration
- [`bond.carbone.com`](http://bond.carbone.com) – Interface utilisateur

## 🔗 Fonctionnement général

### Génération d'identifiants

À l’entrée de l’événement, chaque participant·e reçoit un badge avec un QR code menant à une URL unique :

`https://carbone.com/{generatedID}`


Exemple : `https://carbone.com/QcfDr4Dp32`

---

## 🧠 Backend & Base de données

- **Supabase** stocke les identifiants et les informations utilisateurs : nom, prénom, email/téléphone, entreprise, etc.
- Lors du scan d’un QR code :
  - Si aucune donnée n’est associée à l’ID (ex. `nom = ""`), l’utilisateur est redirigé vers une **page d’inscription**.
  - L’ID est sauvegardé dans le `localStorage`.
  - Une fois le formulaire rempli, les données sont **envoyées à Supabase via une requête POST**.

---

## 📝 Formulaire d'inscription

- Nom et prénom
- Email ou numéro de contact
- Entreprise (champ optionnel avec case **"Je n’ai pas d’entreprise"**)

### (Optionnel)
Si le temps le permet :
- Choix de **trois centres d’intérêt**
- Génération d’un **dégradé hexadécimal personnalisé** via l’API OpenAI

---

## 👥 Interface utilisateur

- Scan du QR code d’un tiers : accès à son profil (infos publiques), uniquement si l’utilisateur est **connecté (via `localStorage`)**
- Scan de son propre QR code : accès à `[bond.carbone.com/profile](http://bond.carbone.com/profile)`
- Depuis cette page :
  - Consultation de son profil
  - Accès aux contacts enregistrés
  - Possibilité d’**envoyer une seule fois par email** la liste de ses contacts (avec pop-up d’avertissement)

---

## 🧭 Navigation

L’interface comporte :

- Un **header** avec logo centré
- Un **menu hamburger** à droite avec superposition
  - Profil
  - Enregistrements
  - Termes et conditions

⚠️ **L’acceptation des termes et conditions est obligatoire** pour utiliser Carbone.

---

## 🛠️ Technologies

- **Frontend** :
  - [React Bits](https://www.reactbits.dev/) (prioritaire)
  - [GSAP](https://greensock.com/gsap/) pour les animations
- **Backend** :
  - Supabase
  - API OpenAI (optionnelle – génération de dégradé)

🎨 **Palette de couleurs** : moderne et épurée

---

## 🔐 Administration

Depuis [`admin.carbone.com`](http://admin.carbone.com) :

- Génération d’IDs utilisateur
- Suppression d’IDs en masse (par ex. à la fin d’un événement)

---

## 📦 À venir

- Intégration des centres d’intérêt et de la carte personnalisée
- Dashboard statistique pour l’admin (scans, connexions, taux de complétion)
- Mode offline pour le scan et l’enregistrement temporaire des profils
