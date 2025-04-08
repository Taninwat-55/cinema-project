#!/bin/bash

# Cinema Website Setup Script
# This script sets up the project by installing dependencies and initializing the database

# Print colored text
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🎬 Setting up Cinema Website project...${NC}"

# Install root dependencies
echo -e "${GREEN}📦 Installing root dependencies...${NC}"
npm install

# Set up client
echo -e "${GREEN}🖥️ Setting up client...${NC}"
cd client
npm install
cd ..

# Set up server
echo -e "${GREEN}🖥️ Setting up server...${NC}"
cd server
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo -e "${YELLOW}Creating .env file...${NC}"
  echo "PORT=3000" > .env
  echo "OMDB_API_KEY=your_api_key_here" >> .env
  echo -e "${YELLOW}⚠️ Please edit the .env file and add your OMDB API key.${NC}"
fi

# Make sure database directory exists
mkdir -p server/db

# Initialize database if it doesn't exist
if [ ! -f db/cinema.db ]; then
  echo -e "${GREEN}🗄️ Setting up database...${NC}"
  # Check if schema.sql exists
  if [ -f db/schema.sql ]; then
    # Create the database using better-sqlite3
    node -e "
      const Database = require('better-sqlite3');
      const fs = require('fs');
      const path = require('path');
      
      try {
        const db = new Database('db/cinema.db');
        console.log('Database created successfully!');
        
        // Enable foreign keys
        db.pragma('foreign_keys = ON');
        
        // Read and execute schema
        const schema = fs.readFileSync(path.join(__dirname, 'db/schema.sql'), 'utf8');
        const statements = schema.split(';').filter(stmt => stmt.trim());
        
        statements.forEach(statement => {
          if (statement.trim()) {
            try {
              db.exec(statement + ';');
            } catch (err) {
              console.error('Error executing SQL statement:', err.message);
              console.error('Statement:', statement);
            }
          }
        });
        
        console.log('Schema applied successfully!');
        db.close();
      } catch (err) {
        console.error('Error setting up database:', err.message);
        process.exit(1);
      }
    "
  else
    echo -e "${YELLOW}⚠️ Schema file not found. Please create db/schema.sql${NC}"
  fi
else
  echo -e "${YELLOW}Database already exists. Skipping database creation.${NC}"
fi

# Prompt user to seed the database
echo ""
echo -e "${YELLOW}Do you want to seed the database with sample movies? (y/n)${NC}"
read -r answer
if [[ "$answer" =~ ^[Yy]$ ]]; then
  echo -e "${GREEN}🌱 Seeding database with sample movies...${NC}"
  node seeds/insertMovies.js
fi

echo -e "${GREEN}✅ Setup complete! Start the application with 'npm run dev'${NC}"