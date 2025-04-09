# 🎬 Cinema Website

A cinema website project with online movie information and booking capabilities.

## ✨ Features

- Browse a list of current movies
- Watch trailers and see detailed movie info
- View available screenings per movie
- Book tickets for specific screenings
- Choose number of tickets (adult/child/senior)
- Select seats via a graphical seat map
- View total price for the booking
- Receive a unique booking number
- Sign in to view your bookings
- Admin interface for managing movies & screenings

---

## 🧰 Tech Stack

### Frontend

- React (with Vite)
- React Router DOM (v7+)
- Component-based structure
- Conditional rendering & hooks

### Backend

- Express.js
- SQLite + better-sqlite3
- OMDb API for fetching movie data

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js `v23.2.0`
- npm `v11.2.0`  
  _(If you use NVM, run: `nvm use 23.2.0`)_

---

### 🛠 Installation

Clone the repository

```bash
git clone https://github.com/Taninwat-55/cinema-project
cd cinema-project
npm run setup
```

### 🧪 Start the development server

```bash
npm run dev
```

## Manual Setup (If setup.sh doesn't work)

### Install root dependencies

```bash
npm install
cd client && npm install
cd ../server && npm install
```

### Create .env manually in /server

```bash
PORT=3000
OMDB_API_KEY=your_api_key_here
```

### Start database manually via SQLiteStudio or seed scripts:

```bash
NODE_ENV=development node server/seeds/seedAll.js
```

### Then return to root and start app:

```bash
cd ..
npm run dev
```

## Development Workflow

1. Before starting a new task

```bash
git checkout main
git pull
git checkout -b feature/your-feature-name
```

2. Make your changes

3. Commit and push your changes

```bash
git add .
git commit -m "Description of your changes"
git push 
```

4. Before create a Pull Request on GitHub

```bash
git checkout main
git pull

git checkout feature/your-feature-name
git merge main
```

5. Create a Pull Request

- Go to GitHub and open a PR from feature/your-feature-name → main
- Review
- Once Approved, merge into main

6. Merge your branch with main

Step 1 - Update the local main
```bash
git checkout main (or master)
git pull
```

Step 2 - Merge main into your feature
```bash
git checkout your-feature-branch
git merge main (or master)
```

## Database Structure

The project uses SQLite with the following tables:

- movies: Stores movie information
- theaters: Cinema theaters/rooms
- showings: Movie screening times
- seats: Individual seats in theaters
- bookings: Customer bookings
- booked_seats: Seats included in bookings
- users: User accounts

## API Endpoints

### Movies

- GET /api/movies - List all movies
- GET /api/movies/:id - Get one movie details
- GET /api/movies/:id/showings – All showings for movie

### Showings

- GET /api/showings - List all showings
- GET /api/showings/:id - Get showing info
- GET /api/seats/:showingId/available – Available seats for showing

### Bookings

- POST /api/bookings - Create a new booking
- GET /api/bookings/:userId - Get bookings for a user

### 💡 Notes

- Seed script automatically deletes and resets all tables when run in development.
- To reset database: run NODE_ENV=development node server/seeds/seedAll.js
- Database is .gitignored, each dev gets their own local DB.

### Authors

- Taninwat
- Hedvig
- Milad
- Valmir

### 🧼 Coming soon

- Admin dashboard
- User login
- Email confirmation after booking
- Rating & review system
