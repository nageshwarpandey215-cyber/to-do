# Auth & Todo Frontend

Modern, responsive React frontend for the Authentication and Todo backend API.

## Features

✅ **User Authentication**
- Register new accounts
- Login with email and password
- JWT token storage
- Protected routes

✅ **Todo Management**
- Add new todos with title and description
- Edit existing todos
- Mark todos as complete/incomplete
- Delete todos
- Filter by status (All, Pending, Completed)

✅ **Modern UI**
- Built with React 18 + Vite
- Styled with Tailwind CSS
- Responsive design
- Success/Error alerts
- Loading states
- Smooth animations

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Alert.jsx           # Alert notifications
│   │   ├── TodoForm.jsx        # Add todo form
│   │   ├── TodoItem.jsx        # Todo list item with edit/delete
│   │   └── ProtectedRoute.jsx  # Route protection
│   ├── pages/
│   │   ├── LoginPage.jsx       # Login page
│   │   ├── RegisterPage.jsx    # Registration page
│   │   └── DashboardPage.jsx   # Todo dashboard
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind + custom styles
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Dependencies
├── .env                        # Environment variables
└── .env.example                # Environment template
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Backend API

Make sure your backend is running on `http://localhost:4000`:

```bash
cd ../back/authentication-and-todo
npm run dev
```

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## Environment Variables

```env
VITE_API_URL=http://localhost:4000
```

## API Integration

The frontend connects to your Node.js backend with the following endpoints:

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token

### Todos
- `GET /todos` - Get all user's todos
- `POST /todos` - Create new todo
- `GET /todos/:id` - Get specific todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

## How to Use

1. **Register**: Click "Register here" and create a new account
2. **Login**: Enter your credentials to login
3. **Add Todo**: Fill the form and click "+ Add Todo"
4. **Manage Todos**:
   - ✓ Check to mark complete
   - ✏️ Edit to modify
   - 🗑️ Delete to remove
5. **Filter**: Use filter buttons to view specific todos
6. **Logout**: Click "Logout" button in navbar

## Testing Credentials

After registering, you can create test accounts or use:
- Email: demo@example.com
- Password: password123

## Technologies Used

- **React 18** - UI library
- **React Router 6** - Routing
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **JavaScript ES6+** - Language

## Features Breakdown

### Authentication Flow
1. User registers with name, email, password
2. Password validation (min 6 characters)
3. User logs in with email and password
4. JWT token stored in localStorage
5. Token automatically added to API requests
6. Protected routes prevent unauthorized access

### Todo Management
- Real-time UI updates after API calls
- Optimistic UI updates
- Loading states for all operations
- Error handling with user-friendly messages
- Confirmation before deletion

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly buttons
- Readable text sizes
- Proper spacing and layout

## Troubleshooting

**API Connection Error?**
- Ensure backend is running on http://localhost:4000
- Check VITE_API_URL in .env

**Login/Register not working?**
- Check browser console for error messages
- Verify backend is responding
- Check email format and password length

**Todos not loading?**
- Check localStorage for token
- Verify you're logged in
- Check Network tab in DevTools

**Styling issues?**
- Clear browser cache
- Rebuild with `npm run build`
- Check Tailwind configuration

## Future Enhancements

- Dark mode toggle
- Todo categories/tags
- Pagination for todos
- Search functionality
- Drag and drop reordering
- Notifications
- PWA support
- Offline mode

## License

MIT
