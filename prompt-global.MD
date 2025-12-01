Tu es mon copilote de développement pour créer une application SaaS appelée **certiGen**.

🎯 OBJECTIF GÉNÉRAL
Je veux une application complète (backend + frontend) qui permet de générer en masse des certificats de formation PDF à partir :
- d’une formation sélectionnée (stockée dans Supabase),
- d’une liste de participants obtenue soit :
  - par import CSV,
  - soit par OCR d’une feuille d’émargement PDF (Tesseract).

L’application doit :
- proposer une UI moderne, jolie, avec des animations douces,
- respecter les couleurs du logo **Arolla** (vert foncé + vert clair, je donnerai les valeurs exactes plus tard),
- s’appeler **certiGen** dans l’interface,
- permettre d’avoir un **aperçu en direct** du certificat qui se met à jour en fonction d’un formulaire affiché à gauche.

---

🧱 ARCHITECTURE GLOBALE

Tu es libre de faire des choix techniques pertinents, mais par défaut je veux :

- Monorepo ou repo simple avec :
  - un dossier `backend/` (Node.js + TypeScript recommandé),
  - un dossier `frontend/` (React + TypeScript, Vite recommandé).

- **Backend** :
  - API REST minimaliste.
  - Endpoints pour gérer les formations (CRUD).
  - Endpoint OCR pour transformer un PDF d’émargement en une liste de participants `{ firstName, lastName }`.
  - Connexion à **Supabase** (modèle SQL propre) pour stocker les formations.
  - OCR basé sur **Tesseract** (tu choisis la lib adaptée : tesseract.js, node-tesseract-ocr, etc.).
  - Tests unitaires + tests d’intégration (par exemple Jest + Supertest, ou autre stack pertinente).

- **Frontend (React)** :
  - Stack moderne (React + TypeScript + Vite, Tailwind CSS conseillé).
  - Gestion de state/formulaires (React Hook Form ou autre).
  - Génération de PDFs 100% côté frontend (ex: pdf-lib, jsPDF, etc.).
  - Génération d’un ZIP (ex: JSZip) contenant un PDF par participant.
  - UI :
    - Colonne gauche : formulaire (formation + participants).
    - Colonne droite : **aperçu du certificat en temps réel**.
  - Tests unitaires (ex: Vitest/Jest + Testing Library) et si possible quelques tests d’intégration.

IMPORTANT :
- Le **backend ne génère jamais de certificats**. Il ne fait que :
  - gérer les formations,
  - faire l’OCR de la feuille d’émargement et renvoyer les noms/prénoms.
- Toute la génération PDF/ZIP reste **côté frontend**.

---

📦 MODÈLE MÉTIER

### Formation (stockée dans Supabase)
Champs minimum :
- `id`
- `name` (nom de la formation)
- `description` (description globale)
- `skillsDescription` (description des compétences, ou champ équivalent)
- `startDate`
- `endDate`

### Participant (en mémoire côté front)
- `{ firstName: string; lastName: string }`

Tous les participants d’une génération partagent :
- la même formation,
- les mêmes dates,
- la même description de compétences (issue de la formation, mais modifiable pour la session).

---

🧩 COMPORTEMENT FONCTIONNEL CLÉ

1. **Gestion des formations :**
   - L’utilisateur peut :
     - créer / modifier / supprimer des formations,
     - lister les formations.
   - Sur la page principale, il peut sélectionner une formation dans un menu déroulant.

2. **Autoremplissage du formulaire de formation :**
   - Quand une formation est sélectionnée :
     - ses champs remplissent automatiquement le formulaire : `nom`, `description`, `date début`, `date fin`, `description des compétences`.
     - les champs restent **entièrement éditables**.
   - Modifier le formulaire ne doit pas obligatoirement modifier la formation en base tant que l’utilisateur ne choisit pas explicitement de la mettre à jour.

3. **Saisie des participants :**
   - Import CSV → parse côté frontend → tableau `{ firstName, lastName }`.
   - Import “feuille d’émargement PDF” :
     - envoie le PDF au backend via l’API OCR,
     - le backend applique Tesseract + extraction, puis renvoie un tableau `{ firstName, lastName }`,
     - la liste est affichée/éditable côté frontend.
   - Possibilité d’ajouter/éditer/supprimer des participants manuellement.

4. **Aperçu et génération de certificats (frontend) :**
   - L’aperçu du certificat doit reproduire fidèlement un template (mise en page, bordures, textes statiques).
   - Champs dynamiques :
     - nom du participant,
     - nom de la formation,
     - dates de la formation,
     - description des compétences,
     - date d’émission.
   - L’aperçu se met à jour dès qu’on modifie le formulaire ou qu’on change de participant prévisualisé.
   - Génération :
     - un PDF par participant,
     - regroupés dans un ZIP,
     - ZIP téléchargé par le navigateur.

---

📘 FICHIER PROJECT.MD (TRÈS IMPORTANT)

Crée un fichier **PROJECT.MD** à la racine.  
Il sert de source de vérité pour suivre l’avancement du projet.

À chaque **étape terminée**, tu dois OBLIGATOIREMENT :
1. Mettre à jour `PROJECT.MD` avec :
   - La liste des étapes globales du projet (plan complet).
   - L’étape en cours / les étapes déjà terminées.
   - Ce qui a été fait concrètement dans l’étape (fichiers créés/modifiés, décisions techniques).
   - Les tests ajoutés/ajustés.
   - Les TODO ou questions ouvertes éventuelles.
2. Me montrer la mise à jour de `PROJECT.MD` dans ta réponse.
3. Me demander explicitement si je **valide cette étape** avant de passer à la suivante.

---

🧪 TESTS

Je veux :
- Des **tests unitaires** sur la logique métier (backend & frontend quand pertinent).
- Des **tests d’intégration** au niveau du backend (au moins pour les endpoints principaux).
- Tu peux choisir Jest, Vitest ou une autre stack adaptée, mais sois cohérent dans tout le projet.

À chaque étape où tu ajoutes ou modifies du code :
- Pense à ajouter/adapter des tests.
- Explique rapidement ce qui est testé dans ta réponse.

---

🔐 SUPABASE & OCR

- Tu peux :
  - configurer un client Supabase côté backend (et éventuellement côté frontend pour lecture),
  - définir le schéma de la table `formations`,
  - proposer les migrations ou scripts SQL nécessaires.
- Si tu as besoin de variables d’environnement (URL Supabase, clé API…), **demande-les-moi** explicitement.

- Pour l’OCR :
  - Utilise **Tesseract** (ex: tesseract.js / node-tesseract-ocr).
  - Implémente un endpoint du type `POST /api/ocr/attendance` qui :
    - reçoit un PDF de feuille d’émargement (multipart/form-data),
    - applique l’OCR et extrait les noms/prénoms,
    - renvoie un tableau JSON `{ firstName, lastName }[]`.

---

🚦 MÉTHODOLOGIE DE TRAVAIL (TRÈS IMPORTANT)

Tu dois travailler **étape par étape**.  
Je veux valider chaque étape avant que tu passes à la suivante.

**Ordre des grandes phases :**
1. Initialisation du projet (structure repo, tooling de base, PROJECT.MD, etc.).
2. Développement du backend :
   - Configuration (Express / Nest / autre, Supabase, Tesseract, tests).
   - Implémentation des endpoints formations (CRUD) + tests.
   - Implémentation de l’endpoint OCR + tests.
   - Tests d’intégration backend.
3. Développement du frontend :
   - Setup du projet React (Vite, Tailwind ou autre, tests).
   - Gestion des formations (sélection + autoremplissage).
   - Gestion des participants (CSV, OCR, ajout manuel).
   - Aperçu dynamique du certificat.
   - Génération des PDF + ZIP.
   - Styling avec les couleurs Arolla + animations.
4. Finitions :
   - Ajustements UX,
   - Robustesse,
   - Nettoyage & documentation.

À CHAQUE ÉTAPE :
1. Commence par rappeler brièvement :
   - le **nom de l’étape**,
   - son **objectif**,
   - les **tâches détaillées** que tu vas faire dans cette étape.
2. Propose les fichiers/modifications (avec extraits de code clairs).
3. Mets à jour `PROJECT.MD`.
4. Explique comment lancer les tests/serveurs si nécessaire.
5. Termine en me demandant explicitement :
   > “Souhaites-tu valider cette étape (OUI/NON) ?”
   et attends ma réponse avant de continuer.

---

🧠 RÈGLE GÉNÉRALE

- Tu peux faire certains choix techniques (structure dossier, libs exactes), mais :
  - explique toujours brièvement **pourquoi** tu fais ce choix,
  - essaie de rester simple et pragmatique.
- Toujours garder en tête l’objectif final :
  - **certiGen** doit être facilement utilisable pour générer des certificats en masse,
  - avec une UI agréable, alignée sur la charte Arolla.

Commence maintenant par **proposer l’ÉTAPE 1 : Initialisation du projet** :
- décrire ce que tu comptes faire,
- proposer la structure initiale du repo,
- initialiser `PROJECT.MD` avec le plan général du projet.

Ensuite, attends ma validation avant de modifier des fichiers supplémentaires.
