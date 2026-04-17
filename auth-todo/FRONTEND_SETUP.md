# Frontend Setup & Installation Guide

## Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start the Frontend

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

### 3. Make Sure Backend is Running

```bash
cd back/authentication-and-todo
npm run dev
```

Backend should be running on **http://localhost:4000**

---

## Complete Project Structure

```
📦 backened project/
 ├── 📂 back/
 │   └── 📂 authentication-and-todo/    [Your MongoDB Backend]
 │       ├── 📂 config/
 │       │   └── db.js
 │       ├── 📂 models/
 │       │   ├── User.js
 │       │   └── Todo.js
 │       ├── 📂 routes/
 │       │   ├── auth.js
 │       │   └── todos.js
 │       ├── 📂 middleware/
 │       │   └── auth.js
 │       ├── app.js
 │       ├── package.json
 │       └── .env
 │
 └── 📂 frontend/                        [NEW React Frontend]
     ├── 📂 src/
     │   ├── 📂 components/
     │   │   ├── Navbar.jsx
     │   │   ├── Alert.jsx
     │   │   ├── TodoForm.jsx
     │   │   ├── TodoItem.jsx
     │   │   └── ProtectedRoute.jsx
     │   ├── 📂 pages/
     │   │   ├── LoginPage.jsx
     │   │   ├── RegisterPage.jsx
     │   │   └── DashboardPage.jsx
     │   ├── 📂 context/
     │   │   └── AuthContext.jsx
     │   ├── 📂 services/
     │   │   └── api.js
     │   ├── App.jsx
     │   ├── main.jsx
     │   └── index.css
     ├── index.html
     ├── vite.config.js
     ├── tailwind.config.js
     ├── postcss.config.js
     ├── package.json
     ├── .env
     └── README.md
```

---

## Frontend Features

### 🔐 Authentication
- Register with email, password, and name
- Login with email and password
- JWT token stored in localStorage
- Protected routes (can't access dashboard without login)
- Auto logout

### ✅ Todo Management
- **Create**: Add todos with title and optional description
- **Read**: View all your todos with filters
- **Update**: Edit title, description, and mark complete
- **Delete**: Remove todos with confirmation
- **Filter**: View All, Pending, or Completed todos

### 🎨 UI/UX
- **Responsive Design**: Works on mobile, tablet, desktop
- **Modern Styling**: Tailwind CSS with blue/green color scheme
- **Real-time Updates**: Instant UI feedback
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls
- **Statistics**: Dashboard shows todo counts

---

## Page Breakdown

### 📌 Login Page (`/login`)
- Email and password input
- Submit button
- Link to register
- Demo credentials info
- Gradient background

### 📝 Register Page (`/register`)
- Name, email, password input
- Password confirmation
- Form validation
- Link to login
- Responsive layout

### 📋 Dashboard (`/dashboard`)
- Navigation bar with user name and logout
- Statistics: Total, Pending, Completed todos
- Add new todo form
- Todo list with filtering
- Edit/Delete buttons for each todo
- Checkbox to mark complete
- Empty state message

---

## Component Details

### `Navbar.jsx`
- Shows user name
- Logout button
- Only visible when authenticated

### `TodoForm.jsx`
- Title input (required)
- Description textarea (optional)
- Submit button with loading state

### `TodoItem.jsx`
- Checkbox to toggle complete status
- Edit mode to modify todo
- Delete button with confirmation
- Visual feedback (strikethrough when completed)
- Status badge

### `Alert.jsx`
- Success/Error notifications
- Auto close or manual close button
- Different colors for success/error

### `ProtectedRoute.jsx`
- Redirects unauthenticated users to login
- Wraps dashboard page

---

## API Integration

### Authentication Endpoints
```javascript
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

POST /auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Todo Endpoints
```javascript
GET /todos
Authorization: Bearer <token>

POST /todos
Authorization: Bearer <token>
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}

PUT /todos/:id
Authorization: Bearer <token>
{
  "title": "Buy milk",
  "description": "From supermarket",
  "completed": true
}

DELETE /todos/:id
Authorization: Bearer <token>
```

---

## Environment Configuration

### Frontend `.env`
```
VITE_API_URL=http://localhost:4000
```

### Backend `.env` (already set up)
```
PORT=4000
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb://localhost:27017/auth-todo-db
```

---

## How to Test

### 1. Register a New Account
- Go to http://localhost:5173/register
- Enter name, email, password
- Click "Register"
- You'll be redirected to login

### 2. Login
- Enter your email and password
- Click "Login"
- You'll be taken to the dashboard

### 3. Add a Todo
- Enter title (required)
- Enter description (optional)
- Click "+ Add Todo"

### 4. Manage Todos
- Check checkbox to mark complete
- Click "Edit" to modify
- Click "Delete" to remove
- Use filter buttons to view specific todos

### 5. Logout
- Click "Logout" in navbar
- You'll be redirected to login

---

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm preview
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Troubleshooting

### "Cannot connect to API"
- Ensure backend is running on http://localhost:4000
- Check VITE_API_URL in .env
- Check MongoDB is running

### "JWT token invalid/expired"
- Token expires after 8 hours
- Logout and login again
- Clear localStorage if needed

### "Styles not loading"
- Rebuild with `npm run build`
- Clear browser cache (Ctrl+Shift+Delete)
- Check Tailwind configuration

### "Cannot GET /login after register"
- Make sure React Router is properly set up
- Check browser console for errors
- Try refreshing the page

### "Todos not showing"
- Make sure you're logged in
- Check backend is running
- Check Network tab in DevTools for API calls

---

## Performance Tips

- Todos are sorted by creation date (newest first)
- Filters are applied client-side for speed
- Loading states prevent double-clicking
- Debouncing on form submission

---

## Security Features

- JWT tokens stored in localStorage
- Tokens sent with every API request
- Protected routes prevent unauthorized access
- Password validation on registration
- Error messages don't expose sensitive data
- Confirmation before deletion

---

## Next Steps

After setup, consider adding:
- Todo categories/tags
- Due dates for todos
- Recurring todos
- Dark mode
- Search functionality
- Pagination
- Notifications
- PWA support

---

## File by File Description

| File | Purpose |
|------|---------|
| App.jsx | Main routing configuration |
| main.jsx | React entry point |
| AuthContext.jsx | Global auth state management |
| api.js | Axios instance with interceptors |
| ProtectedRoute.jsx | Route guard component |
| LoginPage.jsx | Login UI and logic |
| RegisterPage.jsx | Registration UI and logic |
| DashboardPage.jsx | Main todo page |
| Navbar.jsx | Top navigation |
| TodoForm.jsx | Add todo form |
| TodoItem.jsx | Individual todo component |
| Alert.jsx | Notification component |
| index.css | Global styles + Tailwind |

---

## Support

For issues:
1. Check console for error messages
2. Check Network tab in DevTools
3. Verify backend is running
4. Check environment variables
5. Try clearing cache and restarting

---

Happy coding! 🚀
