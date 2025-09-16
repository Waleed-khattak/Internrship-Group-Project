# Internship Group Project – IlmiMarkaz

This is the **Internship Group Project** Clone *IlmiMarkaz*.  

The project has two main parts:  
- **Server** → Backend (Node.js + Express + MongoDB)  
- **Client** → Frontend (React)

---

## Project Structure
Internship-Group-Project/
├── client/ # React frontend
├── server/ # Node.js backend
└── README.md

---

## Prerequisites
- Node.js (LTS recommended)  
- npm or yarn  
- Git  
- MongoDB

---

## Setup & Installation

### Server
cd server  
npm install express mongoose cors dotenv bcrypt jsonwebtoken nodemon  

Create a `.env` file inside `server/` with values like:  
PORT=5000  
DB_URI=your_database_url  
JWT_SECRET=your_secret_key  

Start server:  
npm run dev   (for development with nodemon)  
npm start     (for production)  

Server runs at: http://localhost:5000  

---

### Client
cd client  
npm install react react-dom react-router-dom axios  

Create a `.env` file inside `client/` with values like:  
REACT_APP_API_URL=http://localhost:5000  

Start client:  
npm start  

Client runs at: http://localhost:3000  

---

## Features / Modules
- **Server Modules**: express, mongoose, cors, dotenv, bcrypt, jsonwebtoken, nodemon  
- **Client Modules**: react, react-dom, react-router-dom, axios  
- Authentication (signup, login, JWT)  
- User management (profiles, roles)  
- Content / Dashboard modules  
- REST API routes for backend  
- Responsive React frontend  

---

## Contributing
1. Fork the repo  
2. Create new branch: git checkout -b feature/YourFeature  
3. Commit changes: git commit -m "Added feature"  
4. Push: git push origin feature/YourFeature  
5. Open a Pull Request  

---

## License
This project is develop under InternShip Pakistan.
