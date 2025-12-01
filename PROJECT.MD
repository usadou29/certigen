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
     - Ajout d’ESLint (+ ignore), de `ts-node-dev`, et d’un `.env.example` qui liste `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `PORT`.
     - Création d’un server Express minimal (`src/server.ts`), d’un helper d’environnement (`src/config/env.ts`) et d’un client Supabase (`src/lib/supabaseClient.ts`).
     - Route `GET /api/health` et `/api/supabase/health` pour vérifier que l’API répond et que Supabase est joignable même sans tables (futur).
  2. Concevoir la couche `formations` (modèle Supabase + services CRUD) et ajouter les migrations/SQL.
  3. Implémenter l’endpoint OCR (`POST /api/ocr/attendance`) avec Tesseract et gestion du multipart.
  4. Écrire les tests unitaires pour la logique formations + OCR et les tests d’intégration (Supertest).
- Tests associés : aucun encore, tests prévus pour chaque micro-étape dès qu’une logique métier est ajoutée.  
- TODO/questions ouvertes : définir les modèles `formations`, les migrations Supabase, paramétrer Tesseract et planifier les suites de tests (Jest + Supertest).

### Étapes suivantes (À venir)
- Étape 3 — Frontend
  - Sub-étapes : setup Tailwind, gestion formations, participants (CSV/OCR), aperçu, génération PDF/ZIP.
- Étape 4 — Finitions
  - Sub-étapes : UX/animations, documentation, tests finaux, cleanup.
