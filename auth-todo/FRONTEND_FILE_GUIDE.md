# Complete Frontend File Guide

## 📁 Folder Structure & File Descriptions

### Root Level Files

#### `package.json`
Defines project dependencies and scripts
```json
{
  "name": "auth-todo-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",           // Start dev server
    "build": "vite build",   // Build for production
    "preview": "vite preview" // Preview build
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2"
  }
}
```

#### `vite.config.js`
Vite build configuration
- Enables React plugin
- Configures dev server
- Sets up HMR (Hot Module Replacement)

#### `tailwind.config.js`
Tailwind CSS configuration
- Scans src files for class names
- Configures theme extensions
- Sets up plugins

#### `postcss.config.js`
PostCSS configuration for CSS processing
- Loads Tailwind CSS
- Loads Autoprefixer for browser compatibility

#### `index.html`
Main HTML entry point
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Auth & Todo App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### `.env`
Environment variables for development
```
VITE_API_URL=http://localhost:4000
```

#### `.env.example`
Template for environment variables (checkin to git)

#### `.gitignore`
Git ignore rules
- node_modules/
- dist/ (production build)
- .env (sensitive data)

#### `README.md`
Project documentation with features, setup, and usage

---

## 📂 src/ Directory

### `main.jsx`
React application entry point
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```
**Purpose**: Mounts React app to DOM element with id="root"

---

### `App.jsx`
Main app component with routing
```javascript
<Router>
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </AuthProvider>
</Router>
```
**Purpose**: Sets up routing and authentication provider

---

### `index.css`
Global styles
- Tailwind directives (@tailwind)
- Custom reset styles
- Font family configuration
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 📂 src/context/

### `AuthContext.jsx`
Global authentication state management
```javascript
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Purpose**:
- Manages global auth state
- Stores/retrieves JWT token
- Provides useAuth hook
- Persists auth across page reloads

---

## 📂 src/services/

### `api.js`
Axios instance with API endpoints
```javascript
const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' }
});

// Auto-add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data)
};

export const todoAPI = {
  getAll: () => api.get('/todos'),
  getById: (id) => api.get(`/todos/${id}`),
  create: (data) => api.post('/todos', data),
  update: (id, data) => api.put(`/todos/${id}`, data),
  delete: (id) => api.delete(`/todos/${id}`)
};
```

**Purpose**:
- Centralizes API calls
- Auto-adds JWT token to requests
- Provides methods for auth and todo endpoints

---

## 📂 src/components/

### `Navbar.jsx`
Navigation bar component
```javascript
export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return null;
  
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📝 TodoApp</h1>
        <div className="flex items-center gap-4">
          <span>{user?.name}!</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};
```

**Purpose**:
- Display app title
- Show logged-in user name
- Provide logout button
- Only visible when authenticated

---

### `Alert.jsx`
Alert/Notification component
```javascript
export const Alert = ({ type, message, onClose }) => {
  if (!message) return null;
  
  const colors = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  
  return (
    <div className={`${colors} px-4 py-3 rounded-lg flex justify-between`}>
      <span>{message}</span>
      <button onClick={onClose}>✕</button>
    </div>
  );
};
```

**Purpose**:
- Display success/error messages
- Auto-close or manual close
- Different styling for success/error

---

### `TodoForm.jsx`
Form to add new todos
```javascript
export const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAdd({ title, description });
    setTitle('');
    setDescription('');
    setLoading(false);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <button disabled={loading}>{loading ? 'Adding...' : '+ Add Todo'}</button>
    </form>
  );
};
```

**Purpose**:
- Form to create new todos
- Validates title (required)
- Handles description (optional)
- Shows loading state

---

### `TodoItem.jsx`
Individual todo component with edit/delete
```javascript
export const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleToggleComplete = async () => {
    await onUpdate(todo._id, { ...todo, completed: !todo.completed });
  };
  
  const handleDelete = async () => {
    if (confirm('Delete this todo?')) {
      await onDelete(todo._id);
    }
  };
  
  if (isEditing) {
    return <EditMode />;
  }
  
  return (
    <div className="bg-white p-4 rounded-lg">
      <input type="checkbox" checked={todo.completed} onChange={handleToggleComplete} />
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
```

**Purpose**:
- Display individual todo
- Toggle completion status
- Edit functionality
- Delete with confirmation
- Show title and description

---

### `ProtectedRoute.jsx`
Route guard component
```javascript
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
```

**Purpose**:
- Prevent unauthorized access to dashboard
- Redirect to login if not authenticated
- Wrap protected routes

---

## 📂 src/pages/

### `LoginPage.jsx`
User login page
**Features**:
- Email and password inputs
- Form submission with validation
- Error/success alerts
- Link to register page
- Demo credentials info
- Gradient background styling

**Key Functions**:
```javascript
const handleSubmit = async (e) => {
  // Submit login form
  // Call authAPI.login()
  // Store token and user data
  // Redirect to dashboard
};
```

---

### `RegisterPage.jsx`
User registration page
**Features**:
- Name, email, password inputs
- Password confirmation
- Form validation (password length, matching)
- Error/success alerts
- Link to login page
- Responsive design

**Key Functions**:
```javascript
const validateForm = () => {
  // Check name not empty
  // Check email not empty
  // Check password >= 6 chars
  // Check passwords match
};

const handleSubmit = async (e) => {
  // Validate form
  // Call authAPI.register()
  // Show success alert
  // Redirect to login
};
```

---

### `DashboardPage.jsx`
Main todo management page
**Features**:
- Navigation bar
- Stats cards (total, pending, completed)
- Add todo form
- Todo list with filtering
- Empty state message
- Loading states

**Key Functions**:
```javascript
const fetchTodos = async () => {
  // Get all user todos from API
  // Update todos state
};

const handleAddTodo = async (data) => {
  // Send to API
  // Update UI
  // Show success alert
};

const handleUpdateTodo = async (id, data) => {
  // Send update to API
  // Update todo in UI
  // Show success alert
};

const handleDeleteTodo = async (id) => {
  // Send delete to API
  // Remove from UI
  // Show success alert
};
```

**Filtering**:
- All todos
- Pending (not completed)
- Completed todos

---

## Data Flow Diagram

```
1. User registers
   RegisterPage.jsx
        ↓
   authAPI.register()
        ↓
   Backend /auth/register
        ↓
   MongoDB (save user)

2. User logs in
   LoginPage.jsx
        ↓
   authAPI.login()
        ↓
   Backend /auth/login
        ↓
   MongoDB (find user, verify password)
        ↓
   Get JWT token
        ↓
   AuthContext.login() (save token)
        ↓
   Navigate to /dashboard

3. User adds todo
   TodoForm.jsx
        ↓
   handleAddTodo()
        ↓
   todoAPI.create()
        ↓
   Backend POST /todos (with token)
        ↓
   MongoDB (save todo)
        ↓
   Update UI with new todo

4. User updates todo
   TodoItem.jsx (Edit mode)
        ↓
   handleSaveEdit()
        ↓
   todoAPI.update()
        ↓
   Backend PUT /todos/:id
        ↓
   MongoDB (update todo)
        ↓
   Update UI with new data

5. User deletes todo
   TodoItem.jsx (Delete button)
        ↓
   handleDelete() (with confirmation)
        ↓
   todoAPI.delete()
        ↓
   Backend DELETE /todos/:id
        ↓
   MongoDB (remove todo)
        ↓
   Remove from UI
```

---

## Component Relationship

```
App.jsx (Router + AuthProvider)
├── LoginPage.jsx
│   └── Alert.jsx
├── RegisterPage.jsx
│   └── Alert.jsx
└── ProtectedRoute
    └── DashboardPage.jsx
        ├── Navbar.jsx
        ├── Alert.jsx
        ├── TodoForm.jsx
        │   └── Alert.jsx (for form submission)
        └── TodoItem.jsx (mapped over todos)
            └── Alert.jsx (for todo operations)
```

---

## State Management

### Global State (AuthContext)
- `user` - Current logged-in user
- `token` - JWT token
- `isAuthenticated` - Boolean flag
- `login()` - Save user and token
- `logout()` - Clear user and token

### Component State
- Each component manages its own state (todos, forms, etc.)
- Page-level state passed to child components

### LocalStorage
- JWT token persisted
- User info persisted
- Used for auto-login on page reload

---

## Styling Approach

### Tailwind CSS Classes
```
Spacing: px-4, py-2, mb-4, gap-4
Colors: bg-blue-600, text-white, text-gray-700
Typography: font-bold, text-lg, text-sm
Flexbox: flex, items-center, justify-between
Grid: grid, grid-cols-3
Responsive: md:, lg:, sm:
```

### Color Scheme
- **Primary**: Blue (login, buttons)
- **Secondary**: Green (register, success)
- **Danger**: Red (delete, error)
- **Warning**: Yellow (edit, pending)
- **Neutral**: Gray (text, borders)

---

## File Size & Performance

| File | Size | Purpose |
|------|------|---------|
| App.jsx | ~1 KB | Routing |
| AuthContext.jsx | ~2 KB | State management |
| api.js | ~1 KB | API calls |
| Navbar.jsx | ~1 KB | Navigation |
| TodoForm.jsx | ~1.5 KB | Form |
| TodoItem.jsx | ~3 KB | Todo display |
| Pages (3 files) | ~10 KB | Page components |
| Total | ~20 KB | Minified ~5 KB |

---

## Browser DevTools Tips

### React DevTools
1. Install React DevTools extension
2. Inspect components
3. View props and state
4. Check component tree

### Network Tab
1. Monitor API calls
2. Check request/response
3. Verify JWT token
4. Debug API issues

### Console Tab
1. Check for errors
2. View console logs
3. Test JavaScript

### Application Tab
1. View localStorage
2. Check JWT token
3. Debug storage issues

---

## Common Patterns Used

1. **Custom Hooks**: `useAuth()` hook
2. **Context API**: Global auth state
3. **Conditional Rendering**: `{condition && <Component />}`
4. **Event Handlers**: `onClick`, `onChange`, `onSubmit`
5. **Error Boundaries**: Try-catch in async functions
6. **Loading States**: Disable buttons during API calls
7. **Form Validation**: Client-side before submission
8. **Optimistic Updates**: Update UI before API confirmation

---

## Security Considerations

1. **JWT Storage**: Stored in localStorage (accessible to XSS)
   - Consider httpOnly cookies for production
2. **Password**: Never stored on frontend
3. **Sensitive Data**: API errors don't expose details
4. **Token Expiration**: 8 hours (backend configured)
5. **HTTPS**: Required in production
6. **CORS**: Backend configured to allow requests

---

Complete frontend documentation! You now have a production-ready React + Tailwind CSS todo app with full authentication. 🎉
