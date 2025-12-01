# certiGen - PROJECT.MD

## Plan global
1. Initialisation du projet (structure, documentation, tooling de base)
2. Backend (API formations + OCR, Supabase, tests complets)
3. Frontend (Vite+React, gestion formations+participants, aperçu et génération PDF/ZIP)
4. Finitions (UX, robustesse, documentation, assurance qualité)

## Suivi des étapes
### Étape 1 — Initialisation du projet *(en cours)*
- Objectif : poser l’ossature monorepo et documenter le plan de travail.
- Ce qui a été fait :
  - Création des dossiers `backend/` et `frontend/` avec `src/`.
  - Initialisation d’un `package.json` basique pour le backend.
  - Scaffolding du frontend React+TS via Vite.
  - Ajout d’un `.gitignore` adapté et de ce `PROJECT.MD`.
- Tests associés : aucun pour le moment (squelette initial).
- TODO/questions ouvertes : Reste à choisir les dépendances exactes (Express, Supabase, Tesseract, Tailwind, pdf-lib, Zip) et variables d’environnement.

### Étapes suivantes (À venir)
- Étape 2 — Backend
  - Sub-étapes : config Express/TS, Supabase + migrations, OCR endpoint + tests.
- Étape 3 — Frontend
  - Sub-étapes : setup Tailwind, gestion formations, participants (CSV/OCR), aperçu, génération PDF/ZIP.
- Étape 4 — Finitions
  - Sub-étapes : UX/animations, documentation, tests finaux, cleanup.
