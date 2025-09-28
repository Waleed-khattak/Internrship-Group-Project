# Internship Group Project – IlmiMarkaz

This is the **Internship Group Project** Clone *IlmiMarkaz* Under Internship Pakistan.  

The project has two main parts:  
- **Server** → Backend (Node.js + Express + MongoDB)  
- **Client** → Frontend (React)

---

## Project Structure

```bash
Internship-Group-Project/
├── client/             # React frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components (StatsCard, DataTable, etc.)
│   │   ├── pages/      # Admin, Teacher, Student Dashboards
│   │   ├── App.js
│   │   └── index.js
├── server/             # Node.js backend
│   ├── controllers/    # API logic (adminController.js, teacherController.js, studentController.js)
│   ├── models/         # MongoDB models (User.js)
│   ├── routes/         # API routes (adminRoutes.js, authRoutes.js, signupRoutes.js, verifyRoutes.js)
│   ├── middleware/     # JWT auth, role checks
│   ├── server.js
│   └── .env            # environment variables
└── README.md
```

## Prerequisites
- Node.js (LTS recommended)  
- npm or yarn  
- Git  
- MongoDB

---

## Setup & Installation

### Server
- cd server  
- npm install express mongoose cors dotenv bcrypt jsonwebtoken nodemon  

Create a `.env` file inside `server/` with values like:  
- PORT=5000  
- DB_URI=your_database_url  
- JWT_SECRET=your_secret_key  

Start server:  
- npm run dev   (for development with nodemon)  
- npm start     (for production)  

Server runs at: http://localhost:5000  

---

### Client
- cd client  
- npm install react react-dom react-router-dom axios  

- Create a `.env` file inside `client/` with values like:  
- REACT_APP_API_URL=http://localhost:5000  

Start client:  
- npm start  

Client runs at: http://localhost:3000  

---

## Features / Modules

## Authentication

- Signup / Login
- JWT-based authentication
- Email verification
- Password reset

## Dashboards
1. Admin Dashboard

- Manage Students (Add, Edit, Delete, Assign Class)
- Manage Teachers (Add, Edit, Delete, Assign Subjects)
- Create Classes, Sections, and Subjects
- Assign Teachers to Classes & Timetables
- Monitor Attendance (Daily/Monthly Reports)
- Approve Exam Marks & Generate Report Cards
- Manage Fee Records (Paid/Unpaid)
- Post Announcements (Global or Class-specific)
- Analytics Dashboard (Total Students, Teachers, Attendance %, Exam Summaries)
- All data fetched from MongoDB (no localStorage)

2. Teacher Dashboard

- View Assigned Classes & Timetable
- Mark Attendance (Present/Absent/Late)
- Upload Assignments (Text/File link)
- Enter Exam/Test Marks → Submit for Admin approval
- Post Announcements for Classes
- View Attendance/Results summary for their class
- Data stored & retrieved from MongoDB

3. Student Dashboard

- Login & View Personal Profile
- See Class Timetable
- View Attendance & Attendance Percentage
- Download/View Assignments
- View Exam Results & Download Report Card (PDF)
- View Fee Records (Paid/Unpaid)
- Receive Announcements (Global/Class-based)
- Data stored & retrieved from MongoDB

## Server Modules

- express, mongoose, cors, dotenv, bcrypt, jsonwebtoken, nodemon
- REST API routes for all dashboards
- MongoDB collections for Admins, Teachers, Students
- Client Modules
= react, react-dom, react-router-dom, axios
= Responsive React frontend
= Reusable components: StatsCard, DataTable, QuickActions, ActivityFeed, AttendanceChart

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
