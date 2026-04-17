# Quick Start Guide

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start MongoDB Locally
```bash
# Windows
mongod

# macOS (if installed with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud option).

### 3. Run the Server
```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:4000`

---

## Quick Test

### 1. Register a User
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Copy the `token` from response.

### 3. Create a Todo
```bash
curl -X POST http://localhost:4000/todos \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread"
  }'
```

### 4. Get All Todos
```bash
curl -X GET http://localhost:4000/todos \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Project Structure

```
📦 authentication-and-todo
 ┣ 📂 config
 ┃ ┗ 📜 db.js                 # MongoDB connection
 ┣ 📂 models
 ┃ ┣ 📜 User.js               # User schema
 ┃ ┗ 📜 Todo.js               # Todo schema
 ┣ 📂 middleware
 ┃ ┗ 📜 auth.js               # JWT middleware
 ┣ 📂 routes
 ┃ ┣ 📜 auth.js               # Auth endpoints
 ┃ ┗ 📜 todos.js              # Todo endpoints
 ┣ 📜 app.js                  # Express app
 ┣ 📜 package.json            # Dependencies
 ┣ 📜 .env                    # Configuration
 ┗ 📜 MONGODB_SETUP.md        # Full documentation
```

---

## Available Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | ❌ | Register new user |
| POST | `/auth/login` | ❌ | Login & get token |
| GET | `/todos` | ✅ | Get all todos |
| POST | `/todos` | ✅ | Create todo |
| GET | `/todos/:id` | ✅ | Get todo by ID |
| PUT | `/todos/:id` | ✅ | Update todo |
| DELETE | `/todos/:id` | ✅ | Delete todo |

---

## Environment Variables

```env
PORT=4000                                    # Server port
JWT_SECRET=your-secret-key                  # JWT secret
MONGODB_URI=mongodb://localhost:27017/auth-todo-db  # MongoDB connection
```

---

## Features

✅ **User Authentication** - Register & Login with JWT  
✅ **Password Hashing** - Bcryptjs for secure password storage  
✅ **Todo CRUD** - Full Create, Read, Update, Delete operations  
✅ **MongoDB Integration** - Mongoose models with validation  
✅ **Error Handling** - Comprehensive error responses  
✅ **Timestamps** - Auto-generated createdAt & updatedAt  

---

## Common Issues

**MongoDB connection error?**
- Ensure MongoDB is running: `mongod` or check MongoDB Atlas credentials

**Invalid token?**
- Make sure to include `Authorization: Bearer <token>` header
- Token expires after 8 hours

**Port already in use?**
- Change PORT in `.env` or kill process on port 4000

---

For detailed documentation, see [MONGODB_SETUP.md](./MONGODB_SETUP.md)
