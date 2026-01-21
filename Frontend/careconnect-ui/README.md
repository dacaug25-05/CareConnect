🖥 CareConnect Frontend (careconnect-ui)

📌 Overview

This is the frontend UI for the CareConnect platform, built using React + Vite.
It provides a scalable, feature-based architecture aligned with backend microservices.

🛠 Tech Stack

React (Vite)

Redux Toolkit — State Management

React Router — Routing

Tailwind CSS — Utility-first styling

Bootstrap — UI components

Axios — API communication

📂 Project Structure
src/
├── app/         # Store & global config
├── features/    # Domain modules (auth, users, blood, etc.)
├── components/  # Reusable UI components
├── routes/      # Protected & public routes
├── services/    # API helpers
├── styles/      # Global styles
└── utils/       # Helpers & constants

⚡ Setup & Run
npm install
npm run dev


App runs on:

http://localhost:5173

🔐 Architecture Note

Each frontend feature maps to a backend microservice (e.g. auth, blood, users) for scalability and team-based development.