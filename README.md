Note App - Full Stack Application
Overview
A modern note-taking application built with React and Node.js that allows users to create, manage and organize their notes with secure authentication.

Tech Stack
Frontend: React, Tailwind CSS, Vite
Backend: Node.js, Express
Database: MongoDB
Authentication: JWT, OTP verification
Prerequisites
Node.js (v14 or higher)
MongoDB
npm or yarn
Git
Project Structure
Local Development Setup
1. Backend Setup
Create .env file in server directory:

Start the server:

2. Frontend Setup
Create .env file in client directory:

Start the development server:

Available Scripts
Backend
Frontend
API Endpoints
Authentication
POST /api/auth/signup - Register new user
POST /api/auth/login - User login
POST /api/auth/verify-otp - Verify OTP
POST /api/auth/refresh-token - Get new access token
Notes
GET /api/notes - Get all notes
POST /api/notes - Create new note
PUT /api/notes/:id - Update note
DELETE /api/notes/:id - Delete note
Deployment
Backend Deployment (Example using Render)
Create new Web Service on Render
Connect your GitHub repository
Configure environment variables
Deploy
Frontend Deployment (Example using Vercel)
Install Vercel CLI:
Deploy:
Environment Variables
Backend (.env)
Frontend (.env)
Features
User Authentication with JWT
Email verification with OTP
CRUD operations for notes
Responsive design
Protected routes
Refresh token mechanism
Security Features
Password hashing
JWT authentication
Protected routes
HTTP-only cookies
OTP verification
Rate limiting
Contributing
Fork the repository
Create your feature branch: git checkout -b feature/YourFeature
Commit changes: git commit -m 'Add YourFeature'
Push to branch: git push origin feature/YourFeature
Submit a pull request
