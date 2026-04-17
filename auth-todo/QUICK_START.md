# 🚀 Complete Project - Quick Start

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

---

## Step-by-Step Setup

### Step 1: Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas:** 
- Create account at https://www.mongodb.com/cloud/atlas
- Create cluster
- Get connection string
- Update backend `.env` with MONGODB_URI

### Step 2: Start Backend

```bash
cd back/authentication-and-todo
npm install
npm run dev
```

✅ Backend running on `http://localhost:4000`

### Step 3: Start Frontend

**In a new terminal:**

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on `http://localhost:5173`

---

## Testing the Full Stack

### 1. Open Frontend
```
http://localhost:5173
```

### 2. Register New Account
- Click "Register here"
- Fill name, email, password
- Click "Register"

### 3. Login
- Use registered credentials
- Click "Login"

### 4. Create Todo
- Enter title: "Buy groceries"
- Enter description: "Milk, eggs, bread"
- Click "+ Add Todo"

### 5. Manage Todo
- ✓ Check box to complete
- ✏️ Click Edit to modify
- 🗑️ Click Delete to remove

---

## Quick Terminal Commands

### Backend
```bash
# Install dependencies
npm install

# Start development
npm run dev

# Start production
npm start
```

### Frontend
```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build production
npm build

# Preview build
npm preview
```

---

## Project Architecture

```
Frontend (React + Tailwind)
        ↓
   API Calls (Axios)
        ↓
Backend (Express + MongoDB)
        ↓
   MongoDB Database
```

---

## API Endpoints Summary

### Auth Routes
| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/auth/register` | name, email, password | message, userId |
| POST | `/auth/login` | email, password | token, user |

### Todo Routes
| Method | Endpoint | Auth | Body | Purpose |
|--------|----------|------|------|---------|
| GET | `/todos` | ✅ | - | Get all todos |
| POST | `/todos` | ✅ | title, description | Create todo |
| GET | `/todos/:id` | ✅ | - | Get specific todo |
| PUT | `/todos/:id` | ✅ | title, description, completed | Update todo |
| DELETE | `/todos/:id` | ✅ | - | Delete todo |

---

## Directory Structure

```
backened project/
├── back/
│   └── authentication-and-todo/
│       ├── config/db.js
│       ├── models/
│       │   ├── User.js
│       │   └── Todo.js
│       ├── routes/
│       │   ├── auth.js
│       │   └── todos.js
│       ├── middleware/auth.js
│       ├── app.js
│       ├── package.json
│       ├── .env
│       └── MONGODB_SETUP.md
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Alert.jsx
    │   │   ├── TodoForm.jsx
    │   │   ├── TodoItem.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   └── DashboardPage.jsx
    │   ├── context/AuthContext.jsx
    │   ├── services/api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── index.html
```

---

## Environment Files

### Backend - `.env`
```
PORT=4000
JWT_SECRET=your-secret-key-change-in-production
MONGODB_URI=mongodb://localhost:27017/auth-todo-db
```

### Frontend - `.env`
```
VITE_API_URL=http://localhost:4000
```

---

## Features Checklist

### Backend ✅
- [x] MongoDB integration with Mongoose
- [x] User model with password hashing
- [x] Todo model with user reference
- [x] JWT authentication
- [x] CRUD operations for todos
- [x] Error handling
- [x] Input validation

### Frontend ✅
- [x] React + Vite setup
- [x] Tailwind CSS styling
- [x] Login page with validation
- [x] Register page with validation
- [x] Protected dashboard
- [x] Add/Edit/Delete todos
- [x] Mark todos complete
- [x] Filter todos by status
- [x] Success/Error alerts
- [x] Responsive design
- [x] JWT token management

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Cannot connect to API" | Check if backend is running on port 4000 |
| "MongoDB connection failed" | Ensure MongoDB is running or Atlas credentials are correct |
| "Port 5173 already in use" | Kill the process or use different port |
| "Port 4000 already in use" | Kill the process or change PORT in .env |
| "Token invalid" | Logout and login again |
| "Styles not showing" | Clear cache and rebuild frontend |
| "CORS error" | Ensure VITE_API_URL matches backend URL |

---

## Performance Tips

1. **Frontend**: Vite provides fast HMR (Hot Module Replacement)
2. **Backend**: Mongoose automatically manages indexes
3. **Database**: MongoDB Atlas auto-scales
4. **Caching**: JWT tokens stored locally
5. **Pagination**: Can be added to todos endpoint

---

## Security Checklist

- [x] Passwords hashed with bcryptjs
- [x] JWT token expiration (8 hours)
- [x] Protected routes on frontend
- [x] Authorization header on API calls
- [x] Input validation on both sides
- [x] Error messages don't expose sensitive data

---

## Deployment

### Frontend Deployment (Vercel, Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend Deployment (Heroku, Railway, Render)
```bash
npm start
# Set environment variables in platform
```

### Database (MongoDB Atlas)
- Already cloud-hosted
- Just update connection string

---

## Support & Documentation

- Backend: See `back/authentication-and-todo/MONGODB_SETUP.md`
- Frontend: See `frontend/README.md`
- Overall: See `FRONTEND_SETUP.md`

---

## Next Features to Add

1. Todo categories/tags
2. Due dates
3. Dark mode
4. Search functionality
5. Pagination
6. Email verification
7. Password reset
8. User profile page
9. Notifications
10. Social login

---

## Stack Summary

**Frontend Stack:**
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- Context API

**Backend Stack:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcryptjs

**Database:**
- MongoDB (local or Atlas)

---

Happy Coding! 🎉
