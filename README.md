# RetroStream
RetroStream — Personalized Movie & TV Discovery Platform

RetroStream is a responsive web application built with React, designed to help users explore movies and TV shows, view detailed information, and maintain a personal watchlist. It integrates with The Movie Database (TMDB) API for real-time media data and uses Firebase Authentication + Firestore to enable secure login and persistent user watchlists across sessions and devices.

🎬 Features

🔐 User Authentication with Firebase (Sign Up / Login / Logout)

⭐ Personalized Watchlist synced to Firestore

🎞️ Dynamic Home Page with trending & popular media carousels

🔍 Search feature to quickly find movies & shows

🎥 Detailed Media View with descriptions, ratings & release info

🛡️ Protected Routes (Watchlist & Profile require login)

📱 Responsive Design using Tailwind CSS for smooth mobile & desktop experience

🧱 Tech Stack
Category	Technology
Frontend	React.js, React Router DOM, Context API
Styling	Tailwind CSS, PostCSS, Autoprefixer
Build Tool	Vite
Authentication	Firebase Auth
Database	Firebase Firestore
External API	TMDB (The Movie Database API)

🗂️ Project Structure
RetroStream/
│
├─ src/
│  ├─ components/      # Reusable UI components (Navbar, MovieCard, etc.)
│  ├─ pages/           # Page components (Home, Watchlist, Login, etc.)
│  ├─ auth/            # Auth context + Watchlist state management
│  ├─ api/             # TMDB API integration logic
│  └─ firebase.js      # Firebase app configuration
│
├─ public/             # Static assets
├─ package.json
├─ vite.config.js
└─ README.md

🔧 Setup & Installation

Clone the repository:

git clone https://github.com/akxsh-77/RetroStream.git


Go to the project folder:

cd RetroStream


Install dependencies:

npm install


Create a .env file and add your TMDB + Firebase configuration:

VITE_TMDB_API_KEY=your_key_here
VITE_FIREBASE_API_KEY=your_key_here
...


Start the development server:

npm run dev

🚀 Future Enhancements (Planned)

User ratings & reviews

Profile customization

Pagination & infinite scrolling

Multi-profile support

💡 Purpose & Value

RetroStream demonstrates:

Handling real-time external API data

Secure authentication workflows

Persistent state with cloud storage

Clean React architecture with reusable components

Responsive modern UI with Tailwind

Perfect for portfolio presentation, showcasing ability in real-world front-end app development.
