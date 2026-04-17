# MongoDB Integration Guide

## Overview

This project has been updated to use **MongoDB** with **Mongoose** for data persistence. The User and Todo models are now fully managed by MongoDB with built-in validation and error handling.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

All dependencies including `mongoose` are now installed.

### 2. MongoDB Setup

#### Option A: Local MongoDB (Development)

```bash
# Windows (Using MongoDB Community Edition)
# Download from: https://www.mongodb.com/try/download/community

# macOS (Using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux (Ubuntu)
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud - Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/auth-todo-db
   ```

### 3. Environment Configuration

Create a `.env` file in the project root (or copy from `.env.example`):

```env
PORT=4000
JWT_SECRET=your-secret-key-change-in-production
MONGODB_URI=mongodb://localhost:27017/auth-todo-db
```

For production, use a strong JWT_SECRET and MongoDB Atlas connection string.

### 4. Start the Server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

The server will connect to MongoDB automatically on startup.

---

## Database Models

### User Model

**Schema:**
```javascript
{
  name: String (required, trimmed),
  email: String (required, unique, lowercase, validated),
  password: String (required, min 6 chars, hashed),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Features:**
- Password is automatically hashed before saving using bcrypt
- Email is validated and converted to lowercase
- Includes `comparePassword()` method for authentication
- Timestamps automatically managed

### Todo Model

**Schema:**
```javascript
{
  userId: ObjectId (references User, required),
  title: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  completed: Boolean (default: false),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Features:**
- Links todos to users via userId reference
- Validates title and description length
- Timestamps automatically managed
- Sorted by creation date in queries

---

## API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Todo Endpoints

**All todo endpoints require a Bearer token in the Authorization header:**
```
Authorization: Bearer <your_jwt_token>
```

#### Get All Todos
```http
GET /todos
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Create Todo
```http
POST /todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### Get Todo by ID
```http
GET /todos/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### Update Todo
```http
PUT /todos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries and cook",
  "description": "Milk, eggs, bread, pasta",
  "completed": true
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "title": "Buy groceries and cook",
  "description": "Milk, eggs, bread, pasta",
  "completed": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:35:00.000Z"
}
```

#### Delete Todo
```http
DELETE /todos/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Todo deleted successfully"
}
```

---

## Project Structure

```
authentication-and-todo/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── models/
│   ├── User.js               # User schema and model
│   └── Todo.js               # Todo schema and model
├── middleware/
│   └── auth.js               # JWT authentication middleware
├── routes/
│   ├── auth.js               # Authentication routes (register, login)
│   └── todos.js              # Todo CRUD routes
├── data/
│   └── store.js              # Legacy (can be removed)
├── app.js                    # Express app setup
├── package.json              # Dependencies
├── .env                      # Environment variables
├── .env.example              # Environment template
└── README.md                 # Original documentation
```

---

## Key Features & CRUD Operations

### User CRUD
- **Create (Register):** POST `/auth/register`
- **Read (Login):** POST `/auth/login` (verifies user exists and password matches)
- **Update:** Not implemented (can be added)
- **Delete:** Not implemented (can be added)

### Todo CRUD
- **Create:** POST `/todos`
- **Read:** GET `/todos` (all), GET `/todos/:id` (specific)
- **Update:** PUT `/todos/:id`
- **Delete:** DELETE `/todos/:id`

---

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request:** Missing required fields or validation errors
- **401 Unauthorized:** Invalid credentials or missing token
- **404 Not Found:** Resource doesn't exist
- **409 Conflict:** Email already registered
- **500 Internal Server Error:** Database or server errors

---

## Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'

# Create Todo (replace TOKEN with your JWT)
curl -X POST http://localhost:4000/todos \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk","description":"At supermarket"}'

# Get Todos
curl -X GET http://localhost:4000/todos \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman

1. Import the API endpoints
2. Register a new user
3. Copy the token from login response
4. Add token to Authorization header for todo routes
5. Test CRUD operations

---

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or Atlas connection string is correct
- Check `MONGODB_URI` in `.env`

### JWT Token Invalid
- Ensure JWT_SECRET is consistent
- Token might have expired (8 hour expiration)
- Include "Bearer " prefix in Authorization header

### Validation Errors
- Email must be valid format
- Password must be at least 6 characters
- Title is required for todos
- Check response message for specific validation errors

---

## Production Deployment

1. Set strong `JWT_SECRET`
2. Use MongoDB Atlas for production
3. Enable HTTPS
4. Add rate limiting
5. Add CORS configuration if frontend is separate
6. Use environment variables for all sensitive data
7. Consider adding input sanitization
8. Add logging for debugging

---

## Next Steps

Possible enhancements:
- Add user profile update endpoint
- Add password reset functionality
- Add todo categories/tags
- Add pagination for todos
- Add soft delete for todos
- Add email verification
- Add refresh tokens
- Add rate limiting
- Add CORS configuration
