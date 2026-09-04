# Game & Glory

A polished game-discovery catalog built with React, Vite, Tailwind CSS, and a Django REST API. The interface includes a responsive featured carousel, searchable and filterable catalog, favorites, authentication modals, and an original artwork set with fallbacks for every title.

## Run locally

### API

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API runs at `http://localhost:8000/api/`.

### Web app

```powershell
cd gaming-website
npm install
npm run dev
```

The Vite app runs at `http://localhost:5173/`. Copy `gaming-website/.env.example` to `gaming-website/.env` when you need to override the API URL. The root `.env.example` documents the Django environment variables to set in your shell or deployment platform.

## Quality checks

```powershell
python manage.py check
python manage.py test
cd gaming-website
npm run lint
npm run build
```

## Main endpoints

- `GET /api/games/` — browse games
- `POST /api/users/register/` — create an account
- `POST /api/token/` — obtain access and refresh tokens
- `POST /api/token/refresh/` — refresh an access token
