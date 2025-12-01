# certiGen - PROJECT.MD

## Plan global
1. Initialisation du projet (structure, documentation, tooling de base)
2. Backend (API formations + OCR, Supabase, tests complets)
3. Frontend (Vite+React, gestion formations+participants, aperçu et génération PDF/ZIP)
4. Finitions (UX, robustesse, documentation, assurance qualité)

## Suivi des étapes
### Étape 1 — Initialisation du projet *(terminée)*
- Objectif : poser l’ossature monorepo et documenter le plan de travail.
- Ce qui a été fait :
  - Création des dossiers `backend/` et `frontend/` avec `src/`.
  - Initialisation d’un `package.json` basique pour le backend.
  - Scaffolding du frontend React+TS via Vite.
  - Ajout d’un `.gitignore` adapté et de ce `PROJECT.MD`.
- Tests associés : aucun pour le moment (squelette initial).
- TODO/questions ouvertes : Reste à choisir les dépendances exactes (Express, Supabase, Tesseract, Tailwind, pdf-lib, Zip) et variables d’environnement.

### Étape 2 — Backend *(en cours)*  
- Objectif : mettre en place l’API Express TypeScript et les bases Supabase + OCR avec Tesseract.  
- Micro-étapes :
  1. Initialiser TypeScript, Express, Supabase client et tooling (lint, scripts, dotenv) dans `backend/`. *(terminée)*  
     - Configuration du compilateur TypeScript (`tsconfig.json`) et scripts `dev/build/start`.
     - Ajout d’ESLint flat config, de `ts-node-dev`, et d’un `.env.example` qui liste `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `PORT`.
     - Création d’un server Express minimal (`src/server.ts`), d’un helper d’environnement (`src/config/env.ts`) et d’un client Supabase (`src/lib/supabaseClient.ts`).
     - Route `GET /api/health` et `/api/supabase/health` pour vérifier que l’API répond et que Supabase est joignable même sans tables (futur).
  2. Concevoir la couche `formations` (modèle Supabase + services CRUD) et ajouter les migrations/SQL. *(terminée)*  
     - Migration SQL `sql/migrations/001_create_formations_table.sql` avec table `formations` et champs attendus (UUID, dates, description, compétences).
     - Typage partagé (`src/models/formation.ts`) et services supabase (CRUD avec mapping camelCase/snake_case).
     - Router `src/routes/formations.routes.ts` exposant GET/POST/PUT/DELETE + validation minimale et ajout au serveur (`server.ts`).
     - Script `scripts/seedFormations.ts` pour insérer les 26 formations fournies (ajouté/ exécuté avec les identifiants Supabase fournis).
     - Tests à venir : couverture Jest/Supertest pour les services + endpoints une fois qu’un environnement Supabase de test sera disponible.
  3. Implémenter l’endpoint OCR (`POST /api/ocr/attendance`) avec Tesseract et gestion du multipart.
     - 3.1 Choisir et installer la librairie OCR (`tesseract.js` ou équivalent) et `multer` pour recevoir le PDF en multipart. *(terminée)*  
        - Ajout de `tesseract.js` et `multer` à `backend/package.json` pour extraire du texte depuis les PDFs et gérer les uploads multipart.
     - 3.2 Écrire un service OCR qui accepte un buffer PDF, appelle Tesseract (langue FR/EN) et normalise les lignes en `{ firstName, lastName }`. *(à venir)*  
     - 3.3 Ajouter la route `POST /api/ocr/attendance` avec middleware multipart + validation minimale, puis renvoyer le tableau JSON. *(à venir)*  
     - 3.4 Couvrir la logique par des tests unitaires (mock Tesseract) et une intégration Supertest qui simule l’upload d’un PDF. *(à venir)*  
  4. Écrire les tests unitaires pour la logique formations + OCR et les tests d’intégration (Supertest). *(débutés)*  
     - Ajout de Jest/ts-jest, Supertest, cross-env et configuration `jest.config.ts` pour les tests backend.  
     - Scripts : `npm run test` lance `cross-env NODE_ENV=test jest --passWithNoTests`.  
     - Couverture initiale : `tests/formations.routes.test.ts` vérifie `GET /api/formations`, `GET /api/formations/:id`, `POST /api/formations`, `PUT /api/formations/:id` et `DELETE /api/formations/:id` via Supertest avec services mockés.
- Tests associés : aucun encore, tests prévus pour chaque micro-étape dès qu’une logique métier est ajoutée.  
- TODO/questions ouvertes : définir les modèles `formations`, les migrations Supabase, paramétrer Tesseract et planifier les suites de tests (Jest + Supertest).

### Étapes suivantes (À venir)
- Étape 3 — Frontend
  - Sub-étapes : setup Tailwind, gestion formations, participants (CSV/OCR), aperçu, génération PDF/ZIP.
- Étape 4 — Finitions
  - Sub-étapes : UX/animations, documentation, tests finaux, cleanup.
