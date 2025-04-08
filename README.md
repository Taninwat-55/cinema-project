# Cinema Website

A cinema website project with online movie information and booking capabilities.

## Features

- View list of current movies
- Watch trailers and see detailed movie information
- View movie screenings
- Book tickets for specific screenings
- Select number of tickets (adult/senior/child)
- Select seats using a graphical theater map
- See total price for booking
- Receive unique booking number
- Login to view upcoming and past bookings
- Admin interface for managing movies and screenings

## Tech Stack

### Frontend
- React with Vite
- React Router for navigation
- Component-based architecture
- Dynamic rendering of theater seats

### Backend
- Express.js
- SQLite with better-sqlite3
- OMDb API for movie information

## Getting Started

### Prerequisites
- Node.js 23.2.0
- npm 11.2.0

### Installation

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/Taninwat-55/cinema-project
   cd cinema-project
   \`\`\`

2. Run the setup script
   \`\`\`bash
   ./setup.sh
   \`\`\`

3. Start the development servers
   \`\`\`bash
   npm run dev
   \`\`\`

### Development Workflow

1. Create a feature branch
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

2. Make your changes

3. Commit and push your changes
   \`\`\`bash
   git add .
   git commit -m "Description of your changes"
   git push -u origin feature/your-feature-name
   \`\`\`

4. Create a Pull Request on GitHub

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
- GET /api/movies/:id - Get movie details

### Showings
- GET /api/showings - List all showings
- GET /api/showings/:movieId - Get showings for a movie

### Bookings
- POST /api/bookings - Create a new booking
- GET /api/bookings/:userId - Get bookings for a user
