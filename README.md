# ScoreTracker

Application web de suivi de résultats sportifs et e-sport en temps réel. Développée en React/Vite avec un backend Express, elle couvre le football (Ligue 1, Premier League), le rugby (Top 14, Pro D2, Champions Cup, Challenge Cup) et League of Legends.

🌐 **[Démo live](https://score-tracker-production-426b.up.railway.app)**

---

## Fonctionnalités

- **Suivi en direct** — résultats, scores et classements pour la Ligue 1, la Premier League, le Top 14, le Pro D2 et les coupes européennes de rugby
- **League of Legends** — tournois, classements, historique de matchs et brackets de compétition via l'API PandaScore
- **Détails de match** — compositions d'équipe pour le rugby (terrain interactif) et stats complètes pour les matchs LoL (picks, bans, KDA, gold, tours, dragons, barons)
- **Recherche** — recherche d'équipes e-sport et consultation de leur historique de matchs
- **Navigation par journée** — pagination pour naviguer entre les journées de championnat

---

## Stack technique

| Couche | Technologies |
|--------|-------------|
| Frontend | React 18, Vite, React Router, Axios, Tailwind CSS |
| Backend | Node.js, Express, Axios |
| APIs | PandaScore (LoL), football-data.org (Foot), scraping LNR / EPCRugby |
| Déploiement | Railway (2 services séparés) |

---

## Structure du projet

```
Score-Tracker/
├── frontend/
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   │   ├── Bracket.jsx       # Bracket de tournoi LoL
│   │   │   ├── LeagueModal.jsx   # Stats détaillées d'un match LoL
│   │   │   ├── RugbyModal.jsx    # Compositions rugby
│   │   │   ├── RugbyField.jsx    # Terrain rugby interactif
│   │   │   ├── TeamCard.jsx      # Carte d'équipe
│   │   │   ├── StandingsContainer.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Page d'accueil avec sélection de sport
│   │   │   ├── Football.jsx      # Page football
│   │   │   ├── Rugby.jsx         # Page rugby
│   │   │   ├── League.jsx        # Page League of Legends
│   │   │   └── Search.jsx        # Recherche d'équipes e-sport
│   │   ├── data/
│   │   │   └── Home.js           # Données statiques (ligues disponibles)
│   │   ├── assets/               # Images, logos
│   │   └── api.js                # URL du backend (variable d'env)
│   ├── .env                      # VITE_API_URL=http://localhost:3001
│   └── package.json
└── backend/
    ├── server.js                 # Serveur Express (toutes les routes API)
    ├── .env                      # PANDASCORE_API_KEY, FOOTBALL_API_KEY
    └── package.json
```

---

## Installation locale

### Prérequis

- Node.js 18+
- Un compte [PandaScore](https://pandascore.co) (clé API gratuite)
- Un compte [football-data.org](https://www.football-data.org) (clé API gratuite)

### Backend

```bash
cd backend
npm install
```

Crée un fichier `.env` :

```
PANDASCORE_API_KEY=ta_clé_pandascore
FOOTBALL_API_KEY=ta_clé_football_data
```

Lance le serveur :

```bash
npm run dev   # avec nodemon (rechargement automatique)
# ou
npm start     # node server.js
```

Le backend tourne sur `http://localhost:3001`.

### Frontend

```bash
cd frontend
npm install
```

Crée un fichier `.env` :

```
VITE_API_URL=http://localhost:3001
```

Lance le frontend :

```bash
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

---

## Variables d'environnement

| Variable | Service | Description |
|----------|---------|-------------|
| `PANDASCORE_API_KEY` | Backend | Clé API PandaScore (données LoL) |
| `FOOTBALL_API_KEY` | Backend | Clé API football-data.org (Ligue 1, PL) |
| `VITE_API_URL` | Frontend | URL du backend Express |

---