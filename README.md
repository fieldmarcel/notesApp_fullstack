#  Note Taking App

A full-stack note-taking application with secure authentication (Email OTP + Google Login), JWT-based authorization, and CRUD functionality for personal notes. The app is mobile-friendly and designed to closely replicate the provided design assets.

---

##  Features

- Signup/Login with **Email & OTP**
- Input validation + error messages for invalid inputs/OTP/API errors
- Welcome page with user info after login
- Create & delete personal notes
- JWT-based authentication for secure APIs
- Responsive UI (mobile-friendly)

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Backend**: Node.js (Express )
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT
- **Email Service**: SMTP (e.g., Gmail)
- **Deployment**:  
  - Frontend → Vercel  
  - Backend → Render  

---

##  Project Structure

```
noteApp/
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── ...
├── server/                # Express backend
│   ├── config/            # DB config
│   ├── middleware/        # Auth middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Helpers
│   ├── .env
│   ├── server.js
│   └── package.json
```


---

## Tech Stack

- **Frontend:** React, TailwindCSS, Vite, Axios, React Router DOM  
- **Backend:** Node.js, Express, MongoDB, Mongoose, Nodemailer  
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## Local Development

### Clone the repo

```bash
git clone https://github.com/yourusername/noteapp.git
cd noteApp
Backend Setup
bash
Copy code
cd server
npm install
Create .env:

ini
Copy code
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
EMAIL_HOST=<your_smtp_host>
EMAIL_PORT=<your_smtp_port>
EMAIL_USER=<your_email_address>
EMAIL_PASS=<your_email_password>
JWT_SECRET=<your_jwt_secret>
Start backend:

bash
Copy code
npm run dev
Frontend Setup
bash
Copy code
cd ../client
npm install
Create .env:

ini
Copy code
VITE_API_URL=http://localhost:5000
Start frontend:

bash
Copy code
npm run dev
Open http://localhost:5173 in browser.

Deployment
Backend (Render)
Push server folder to GitHub.

Create a Web Service on Render.

Connect GitHub repo.

Set Build Command: npm install

Set Start Command: node server.js

Add Environment Variables on Render.

Deploy.

Frontend (Vercel)
Push client folder to GitHub.

Import project on Vercel.

Set Environment Variable:

ini
Copy code
VITE_API_URL=<your_deployed_backend_url>
Add vercel.json in client root:

json
Copy code
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
Deploy.

This ensures React Router works on Vercel (no 404 on /signup or /dashboard).

API Routes
Auth
POST /auth/signup – Send OTP

POST /auth/login – Verify OTP & login

POST /auth/resend-otp – Resend OTP

Notes
GET /api/notes – Get user notes (requires JWT)

POST /api/notes – Create a note (requires JWT)

DELETE /api/notes/:id – Delete note (requires JWT)
## Environment Variables

| Variable       | Description                                |
|----------------|--------------------------------------------|
| PORT           | Server port (default: 5000)                |
| MONGO_URI      | MongoDB connection string                  |
| EMAIL_HOST     | SMTP host for sending emails               |
| EMAIL_PORT     | SMTP port                                  |
| EMAIL_USER     | Email address to send OTPs                 |
| EMAIL_PASS     | Email password                             |
| JWT_SECRET     | Secret key for JWT authentication         |
| VITE_API_URL   | URL of deployed backend (frontend)         |


Notes
Ensure backend URL is publicly accessible for the frontend.

For production OTP sending, configure a valid SMTP service (Gmail, SendGrid, etc.).

Keep localStorage login for persistence; use sessionStorage for session-only login.



